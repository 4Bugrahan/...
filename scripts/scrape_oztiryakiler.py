#!/usr/bin/env python3
"""
Oztiryakiler.com.tr ürün scraper
Her alt kategoriden 1 temsilci ürün çeker (~110-120 ürün).
Çıktı: storage/app/scraped_products.json
"""

import json
import re
import time
import urllib.request

BASE_URL = "https://oztiryakiler.com.tr"
API_BASE = f"{BASE_URL}/wp-json/wp/v2"
HEADERS  = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}

# Oztiryakiler Türkçe kategori ID → yerel kategori slug
# SADECE hastane/sanitasyon ekipmanları dışında her şey dahil
CATEGORY_MAP = {
    63235: "pisirme-ekipmanlari",    # Ana Mutfak Ekipmanları
    65178: "pisirme-ekipmanlari",    # Fırınlar
    70123: "servis-ekipmanlari",     # Setüstü Mutfak Ekipmanları (tableware, sunum)
    59628: "sogutma-sistemleri",     # Soğuk Üniteler
    63431: "hazirlik-ekipmanlari",   # Hazırlık Makineleri
    63911: "servis-ekipmanlari",     # Açık Büfe ve Servis Üniteleri
    62580: "bulasik-makineleri",     # Bulaşıkhane Ekipmanları
    59238: "depolama-uniteleri",     # Nötr Üniteler
    59124: "depolama-uniteleri",     # Yardımcı Mutfak Ekipmanları
    62376: "bar-ekipmanlari",        # İçecek ve Bar Ekipmanları
    78055: "bar-ekipmanlari",        # Kahve Makineleri
    59375: "pisirme-ekipmanlari",    # Pastane Ekipmanları
    60347: "servis-ekipmanlari",     # Masaüstü ve Sunum Ekipmanları
    73455: "depolama-uniteleri",     # Modüler Mutfaklar
    # 59573 Hijyen ve Sanitasyon → ÇIKARILDI (hastane/tıbbi ekipman)
}

SKIP_SUBCAT_NAMES = {
    "Uncategorized", "Aksesuarlar", "Accessory", "Aksesuar",
    "Diğer Ürünler", "Diğer Ekipmanlar",
}


def api_get(path, params=""):
    url = f"{API_BASE}/{path}{'?' + params if params else ''}"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        print(f"  [HATA] {url}: {e}")
        return []


def extract_code_from_slug(slug):
    m = re.search(r'(\d+[-\.]\d+[-\.]\d+)$', slug)
    if m:
        return m.group(1).replace("-", ".")
    return None


def main():
    results  = []
    seen_key = set()   # (local_cat, subcat_id) — her alt kategoriden 1 kez

    print("Ürünler çekiliyor (alt kategori başına 1 ürün)...\n")

    for parent_id, local_cat in CATEGORY_MAP.items():
        subcats = api_get("product_cat", f"per_page=100&parent={parent_id}&_fields=id,name,count")
        valid   = [s for s in subcats if s.get("name") not in SKIP_SUBCAT_NAMES and s.get("count", 0) > 0]

        if not valid:
            continue

        print(f"[{local_cat}] {len(valid)} alt kategori")

        for subcat in valid:
            sid = subcat["id"]
            key = (local_cat, sid)
            if key in seen_key:
                continue
            seen_key.add(key)

            products = api_get(
                "product",
                f"per_page=1&product_cat={sid}&_fields=id,title,slug,excerpt&lang=tr"
            )
            if not products:
                continue

            p    = products[0]
            name = p["title"]["rendered"].strip()
            slug = p["slug"]

            excerpt_html = p.get("excerpt", {}).get("rendered", "")
            excerpt      = re.sub(r'<[^>]+>', '', excerpt_html).strip()
            excerpt      = re.sub(r'\*\s*', '• ', excerpt)
            description  = excerpt if excerpt else name
            description += "\n\nFarklı boyut ve çeşitler için lütfen bizimle iletişime geçin."

            code      = extract_code_from_slug(slug)
            image_url = f"{BASE_URL}/ax-images/images/{code}.jpg" if code else None

            results.append({
                "name":        name,
                "slug":        slug,
                "description": description,
                "category":    local_cat,
                "image_url":   image_url,
                "source_url":  f"{BASE_URL}/urun/{slug}/",
            })

            print(f"    ✓ [{subcat['name']}] {name[:65]}")
            time.sleep(0.25)

    output_path = "storage/app/scraped_products.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    from collections import Counter
    cats = Counter(p["category"] for p in results)
    print(f"\n✅ Toplam {len(results)} ürün → {output_path}")
    print("\nKategori dağılımı:")
    for cat, count in sorted(cats.items()):
        print(f"  {cat}: {count}")


if __name__ == "__main__":
    main()
