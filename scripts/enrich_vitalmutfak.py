#!/usr/bin/env python3
"""
vitalmutfak.com ürünleri için:
  1. WP REST API'den tam Türkçe açıklama çeker
  2. CDN'den ürün resimlerini storage/app/public/products/{sku}/ dizinine indirir
  3. scraped_vitalmutfak.json dosyasını günceller

Çalıştır: /tmp/scrape_venv/bin/python3 scripts/enrich_vitalmutfak.py
"""

import json
import os
import re
import socket
import time
import urllib.request
from pathlib import Path

socket.setdefaulttimeout(12)

HEADERS = {
    "User-Agent":      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept-Language": "tr-TR,tr;q=0.9",
}

API_BASE     = "https://vitalmutfak.com/wp-json/wp/v2"
CDN_BASE     = "https://vital.b-cdn.net"
STORAGE_DIR  = Path("storage/app/public/products")
PUBLIC_PATH  = "products"   # /storage/products/... olarak erişilir
JSON_PATH    = "storage/app/scraped_vitalmutfak.json"
CONTACT_NOTE = "\n\nFarklı boyut ve modeller için lütfen bizimle iletişime geçin."


# ─── HTTP Helpers ─────────────────────────────────────────────────────────────

def fetch_json(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        return None


def download_image(url, dest_path):
    """URL'den resmi indir, True/False döndür."""
    if dest_path.exists():
        return True
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as r:
            data = r.read()
        if len(data) < 5000:   # çok küçük = 404 sayfası
            return False
        dest_path.parent.mkdir(parents=True, exist_ok=True)
        with open(dest_path, "wb") as f:
            f.write(data)
        return True
    except Exception:
        return False


# ─── Açıklama: WP REST API ────────────────────────────────────────────────────

def get_description(source_url):
    """source_url'den slug çıkar, WP REST API'den tam açıklama al."""
    slug = source_url.rstrip("/").split("/urun/")[-1]
    data = fetch_json(f"{API_BASE}/urun?slug={slug}&_fields=excerpt")
    if not data:
        return None
    excerpt_html = data[0].get("excerpt", {}).get("rendered", "")
    # HTML taglerini temizle
    text = re.sub(r"<li[^>]*>", "\n• ", excerpt_html)
    text = re.sub(r"</li>", "", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip() or None


# ─── Resimler: CDN'den indir ──────────────────────────────────────────────────

def get_product_images(source_url, sku):
    """
    Ürün sayfasından CDN resimlerini bul, sadece kendi SKU klasöründekileri indir.
    Döndürür: ["/storage/products/{sku}/img1.png", ...]
    """
    if not sku:
        return []

    req = urllib.request.Request(source_url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as r:
            html = r.read().decode("utf-8", errors="replace")
    except Exception:
        return []

    # Tüm CDN URL'lerini bul
    all_imgs = list(dict.fromkeys(re.findall(
        r"https://vital\.b-cdn\.net/([^/]+)/([^\s\"']+\.(?:png|jpg|JPG|jpeg))",
        html
    )))

    # Sadece bu ürünün SKU klasöründekileri filtrele
    # Klasör adı genellikle "01{SKU}" veya "{SKU}"
    own_folder = None
    for folder, filename in all_imgs:
        folder_sku = re.sub(r"^\d+", "", folder)   # başındaki rakamları sil
        if folder_sku.upper() == sku.upper():
            own_folder = folder
            break

    if not own_folder:
        # Fallback: ilk klasörü kullan
        if all_imgs:
            own_folder = all_imgs[0][0]
        else:
            return []

    # Bu klasördeki resimleri indir
    local_paths = []
    folder_imgs = [(f, fn) for f, fn in all_imgs if f == own_folder][:3]  # max 3

    sku_safe = re.sub(r"[^a-zA-Z0-9_\-]", "_", sku)
    dest_dir  = STORAGE_DIR / sku_safe

    for folder, filename in folder_imgs:
        cdn_url   = f"{CDN_BASE}/{folder}/{filename}"
        dest_file = dest_dir / filename
        if download_image(cdn_url, dest_file):
            local_paths.append(f"{PUBLIC_PATH}/{sku_safe}/{filename}")

    return local_paths


# ─── Ana döngü ────────────────────────────────────────────────────────────────

def main():
    with open(JSON_PATH, encoding="utf-8") as f:
        products = json.load(f)

    STORAGE_DIR.mkdir(parents=True, exist_ok=True)
    total = len(products)
    print(f"Toplam {total} ürün işlenecek...\n")

    updated = 0
    for i, product in enumerate(products, 1):
        name       = product["name"]
        source_url = product.get("source_url", "")
        sku        = product.get("sku", "")

        print(f"[{i:3}/{total}] {name[:60]}")

        # 1. Açıklama
        desc = get_description(source_url)
        time.sleep(0.3)

        if desc:
            product["description"] = desc + CONTACT_NOTE
        else:
            # Mevcut açıklamadan sadece notu temizle, yoksa olduğu gibi bırak
            existing = re.sub(r"\n+Farklı (boyut|model).*$", "", product.get("description", ""), flags=re.S).strip()
            product["description"] = existing + CONTACT_NOTE if existing else CONTACT_NOTE.strip()

        # 2. Resimler
        if source_url:
            local_imgs = get_product_images(source_url, sku)
            time.sleep(0.3)
            if local_imgs:
                product["images"] = local_imgs
                print(f"       ✓ {len(local_imgs)} resim indirildi")
            else:
                print(f"       ⚠ Resim indirilemedi, CDN URL korundu")
        else:
            print(f"       ⚠ source_url yok")

        updated += 1

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    print(f"\n✅ {updated} ürün güncellendi → {JSON_PATH}")
    print(f"Resimler: {STORAGE_DIR}")


if __name__ == "__main__":
    main()
