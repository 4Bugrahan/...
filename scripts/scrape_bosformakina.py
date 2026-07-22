#!/usr/bin/env python3
"""
bosformakina.com.tr scraper — WooCommerce Store API kullanır.
Küçük kategoriler (1-2 ürünlü) daha büyük ilgili kategorilere gömülür.
Çıktı: storage/app/scraped_bosformakina.json
Çalıştır: python3 scripts/scrape_bosformakina.py
"""

import json, re, time, socket, urllib.request
from pathlib import Path
from collections import Counter
import html as hl

socket.setdefaulttimeout(15)

BASE     = "https://bosformakina.com.tr"
API      = f"{BASE}/wp-json/wc/store/v1/products"
STORE    = Path("storage/app/public/products")
JSON_OUT = "storage/app/scraped_bosformakina.json"
CONTACT  = "\n\nFarklı boyut ve modeller için lütfen bizimle iletişime geçin."

HEADERS = {
    "User-Agent":      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept-Language": "tr-TR,tr;q=0.9",
}

# (kaynak kategori slug, hedef kategori slug — 4bgrup DB'sinde)
CATEGORIES = [
    ("et-kiyma-makineleri",                "et-kiyma-makineleri"),
    ("et-kemik-testeresi",                 "et-kemik-testereleri"),
    ("tavuk-kesme-makinesi",                "et-kemik-testereleri"),        # birleştirildi
    ("hamur-yogurma-makineleri",           "hamur-yogurma-makineleri"),
    ("spiral-hamur-yogurma-makineleri",    "spiral-hamur-yogurma-makineleri"),
    ("planet-mikser",                      "planet-mikserler"),
    ("hamur-acma-makineleri",              "hamur-acma-makineleri"),
    ("lokma-dokme-makineleri",             "hamur-acma-makineleri"),        # birleştirildi
    ("ekmek-dilimleme-makineleri",         "hamur-acma-makineleri"),        # birleştirildi
    ("sogan-dograma-makinesi",             "et-sebze-parcalama-humus-makineleri"),  # birleştirildi
    ("et-sebze-parcalama-humus-makineleri","et-sebze-parcalama-humus-makineleri"),
    ("patates-soyma-makineleri",           "patates-soyma-makineleri"),
    ("sebze-dograma-makineleri",           "et-sebze-parcalama-humus-makineleri"),  # birleştirildi
    ("el-blender",                         "el-blender"),
]

EXCLUDE_IMAGE_KEYWORDS = ["uygunluk", "sertifika", "declaration", "conformity", "ce-belge"]


# ─── HTTP ────────────────────────────────────────────────────────────────────

def fetch_json(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return json.loads(r.read().decode("utf-8-sig"))
    except Exception as e:
        print(f"  [ERR] {url}: {e}")
        return None


def download_image(url, dest):
    if dest.exists():
        return True
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()
        if len(data) < 3000:
            return False
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        return True
    except Exception:
        return False


# ─── Parsing ─────────────────────────────────────────────────────────────────

def clean_name(name):
    name = hl.unescape(name).strip()
    # Baştaki ürün kodunu kaldır (örn "UKM-130PTS " ya da "UBL-190-C ")
    name = re.sub(r'^[A-ZÇĞİÖŞÜ0-9]{2,8}(-[A-ZÇĞİÖŞÜ0-9]+){0,3}\s+', '', name)
    return name.strip()


def format_description(raw_html):
    if not raw_html:
        return ""
    content = hl.unescape(raw_html)

    table_match = re.search(r'<table[^>]*class="features-table".*?</table>', content, re.S)
    table_html = table_match.group(0) if table_match else ""
    body_html = content.replace(table_html, "") if table_html else content

    # Başlık paragrafını (ilk <p><strong>...) at
    body_html = re.sub(r'^\s*<p>\s*<strong>.*?</strong>\s*</p>', "", body_html, count=1, flags=re.S)
    body_html = body_html.replace("<br />", "\n").replace("<br/>", "\n").replace("<br>", "\n")
    body_html = re.sub(r'<li[^>]*>', "\n", body_html)
    body_text = re.sub(r'<[^>]+>', "", body_html)
    body_lines = [l.strip() for l in body_text.split("\n") if l.strip()]

    row_lines = []
    if table_html:
        rows = re.findall(r'<tr>\s*<td[^>]*>(.*?)</td>\s*<td[^>]*>(.*?)</td>\s*</tr>', table_html, re.S)
        for label, value in rows:
            label = re.sub(r'<[^>]+>', "", label).strip()
            value = re.sub(r'<[^>]+>', "", value).strip()
            if label and value:
                row_lines.append(f"{label}: {value}")

    all_lines = body_lines + row_lines
    return "\n".join(f"• {l}" for l in all_lines)


def slugify(text):
    tr = str.maketrans("çğışöüÇĞİŞÖÜ", "cgisoucgisou")
    text = text.lower().translate(tr)
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def get_images(product, sku):
    images = product.get("images") or []
    sku_safe = re.sub(r"[^a-zA-Z0-9_\-]", "_", sku or slugify(product.get("name", "urun")))
    local = []
    for img in images:
        src = img.get("src", "")
        if not src:
            continue
        low = src.lower()
        if any(k in low for k in EXCLUDE_IMAGE_KEYWORDS):
            continue
        fn = src.split("/")[-1].split("?")[0]
        dest = STORE / sku_safe / fn
        if download_image(src, dest):
            local.append(f"products/{sku_safe}/{fn}")
        if len(local) >= 3:
            break
    return local


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    STORE.mkdir(parents=True, exist_ok=True)
    results, seen_slugs = [], set()

    print("bosformakina.com.tr — WooCommerce Store API scraping\n")

    for src_cat, target_cat in CATEGORIES:
        print(f"[{src_cat} -> {target_cat}]")
        url = f"{API}?category={src_cat}&per_page=100"
        products = fetch_json(url) or []
        print(f"  {len(products)} ürün bulundu")

        for i, p in enumerate(products, 1):
            sku  = p.get("sku", "") or ""
            name = clean_name(p.get("name", ""))
            if not name:
                continue

            desc = format_description(p.get("description", "")) + CONTACT
            imgs = get_images(p, sku)
            time.sleep(0.2)

            base_slug = slugify(name)
            slug, c = base_slug, 1
            while slug in seen_slugs:
                slug = f"{base_slug}-{c}"
                c += 1
            seen_slugs.add(slug)

            results.append({
                "name":        name,
                "slug":        slug,
                "description": desc,
                "category":    target_cat,
                "sku":         sku,
                "images":      imgs,
                "source_url":  p.get("permalink", ""),
            })
            print(f"  [{i}/{len(products)}] ✓ {name[:60]} [{sku}] ({len(imgs)} görsel)")

        time.sleep(0.3)
        print()

    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    cats = Counter(p["category"] for p in results)
    print(f"✅ Toplam {len(results)} ürün → {JSON_OUT}")
    print("\nHedef kategori dağılımı:")
    for k, v in sorted(cats.items()):
        print(f"  {k}: {v}")


if __name__ == "__main__":
    main()
