#!/usr/bin/env python3
"""
vitalmutfak.com endüstriyel mutfak ekipmanları tam scraper.
Tüm sayfaları gezerek her alt kategorideki tüm ürünleri çeker.
Çıktı: storage/app/scraped_vitalmutfak.json
Çalıştır: /tmp/scrape_venv/bin/python3 scripts/scrape_vitalmutfak.py
"""

import json
import re
import time
import urllib.request
from collections import Counter

BASE_URL  = "https://vitalmutfak.com"

HEADERS = {
    "User-Agent":      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept-Language": "tr-TR,tr;q=0.9",
}

CONTACT_NOTE = "\n\nFarklı model ve çeşitler için lütfen bizimle iletişime geçin."

# (url_suffix, local_cat_slug, label, url_must_contain)
SUBCATEGORIES = [
    ("pisiriciler/600-seri-pisiriciler",                "pisirme-ekipmanlari",  "600 Seri Pişiriciler",       None),
    ("pisiriciler/700-seri-pisiriciler",                "pisirme-ekipmanlari",  "700 Seri Pişiriciler",       None),
    ("pisiriciler/700-pro-seri-pisiriciler",            "pisirme-ekipmanlari",  "700 Pro Pişiriciler",        None),
    ("pisiriciler/900-seri-pisiriciler",                "pisirme-ekipmanlari",  "900 Seri Pişiriciler",       None),
    ("pisiriciler/900-pro-seri-pisiriciler",            "pisirme-ekipmanlari",  "900 Pro Pişiriciler",        None),
    ("pisiriciler/drop-in-seri-pisiriciler",            "pisirme-ekipmanlari",  "Drop-In Pişiriciler",        None),
    ("pisiriciler/eko-seri-pisiriciler",                "pisirme-ekipmanlari",  "Eko Seri Pişiriciler",       None),
    ("pisiriciler/diger-pisirme-ekipmanlari",           "pisirme-ekipmanlari",  "Diğer Pişiriciler",          None),
    ("firinlar/prime-konveksiyonlu-firinlar",           "pisirme-ekipmanlari",  "Prime Konveksiyonlu Fırın",  None),
    ("firinlar/maestro-kombi-firinlar",                 "pisirme-ekipmanlari",  "Maestro Kombi Fırın",        None),
    ("firinlar/nevo-konveksiyonlu-patisserie-firinlar", "pisirme-ekipmanlari",  "Nevo Patisserie Fırın",      None),
    ("firinlar/foodie-tas-tabanli-firinlar",            "pisirme-ekipmanlari",  "Foodie Taş Tabanlı Fırın",   None),
    ("firinlar/klasik-pasta-borek-firini",              "pisirme-ekipmanlari",  "Pasta/Börek Fırını",         None),
    ("bulasikhane-ekipmanlari/bulasik-makineleri",      "bulasik-makineleri",   "Bulaşık Makineleri",         "bulasik"),
    ("buzdolaplari",                                    "sogutma-sistemleri",   "Buzdolapları",               None),
    ("hazirlik-ekipmanlari",                            "hazirlik-ekipmanlari", "Hazırlık Ekipmanları",       None),
    ("notr-ekipmanlar",                                 "depolama-uniteleri",   "Nötr Ekipmanlar",            None),
]


# ─── HTTP ────────────────────────────────────────────────────────────────────

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  [HATA] {url}: {e}")
        return ""


# ─── Parsing ─────────────────────────────────────────────────────────────────

def extract_products_from_page(html, url_must_contain=None):
    """Elementor sayfasından ürün URL + CDN resmi çiftlerini çıkar."""
    pattern = re.compile(
        r'href="(https://vitalmutfak\.com/urun/[^"]+)"[^>]*>\s*<img\s+src="(https://vital\.b-cdn\.net/([^/]+)/[^"]+\.(?:png|jpg|JPG|jpeg)[^"]*)"',
        re.S
    )
    seen, results = set(), []
    for m in pattern.finditer(html):
        url     = m.group(1)
        image   = m.group(2).split("?")[0] + "?class=web750"
        cdn_dir = m.group(3)
        sku     = re.sub(r'^\d+', '', cdn_dir)
        if url in seen:
            continue
        if url_must_contain and url_must_contain not in url:
            continue
        seen.add(url)
        results.append({"url": url, "image": image, "sku": sku})
    return results


def get_max_page(html):
    pages = re.findall(r'/page/(\d+)/', html)
    return max((int(p) for p in pages), default=1)


def get_all_category_products(cat_base_url, url_must_contain=None):
    """Kategori URL'sindeki tüm sayfaları gezerek ürün listesi döndürür."""
    html = fetch(cat_base_url)
    time.sleep(0.5)
    if not html:
        return []

    max_page = get_max_page(html)
    products = extract_products_from_page(html, url_must_contain)

    for page in range(2, max_page + 1):
        page_url = f"{cat_base_url}page/{page}/"
        page_html = fetch(page_url)
        time.sleep(0.5)
        if page_html:
            products += extract_products_from_page(page_html, url_must_contain)

    # Tekrarları kaldır
    seen, unique = set(), []
    for p in products:
        if p["url"] not in seen:
            seen.add(p["url"])
            unique.append(p)
    return unique


def get_product_detail(url):
    """Ürün sayfasından başlık, açıklama ve resimler."""
    html = fetch(url)
    if not html:
        return {}

    title_m = re.search(r'<meta property="og:title" content="([^"]+)"', html)
    desc_m  = re.search(r'<meta name="description" content="([^"]+)"', html)

    title = title_m.group(1) if title_m else ""
    title = re.sub(r'\s*-\s*Vital.*$', '', title).strip()
    desc  = desc_m.group(1) if desc_m else title

    images = list(dict.fromkeys(re.findall(
        r'https://vital\.b-cdn\.net/[^\s"\']+\.(?:png|jpg|JPG|jpeg)', html
    )))
    images = [img + "?class=web750" for img in images]

    return {"title": title, "description": desc, "images": images[:3]}


def slugify(text):
    tr = str.maketrans("çğışöüÇĞİŞÖÜ", "cgisoucgisou")
    text = text.lower().translate(tr)
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-')


# ─── Ana scraper ─────────────────────────────────────────────────────────────

def main():
    results    = []
    seen_slugs = set()
    base       = f"{BASE_URL}/urun-kategori/endustriyel-mutfak-ekipmanlari"

    print("vitalmutfak.com — tüm endüstriyel mutfak ürünleri çekiliyor...\n")

    for suffix, local_cat, label, url_filter in SUBCATEGORIES:
        cat_url = f"{base}/{suffix}/"
        print(f"[{label}] → {cat_url}")

        products = get_all_category_products(cat_url, url_filter)

        if not products:
            print("  ⚠ Ürün bulunamadı, atlanıyor.\n")
            continue

        print(f"  {len(products)} ürün bulundu, detaylar çekiliyor...")

        for i, prod in enumerate(products, 1):
            url   = prod["url"]
            image = prod["image"]
            sku   = prod["sku"]

            detail = get_product_detail(url)
            time.sleep(0.4)

            name   = detail.get("title") or url.split("/urun/")[-1].replace("-", " ").strip("/")
            desc   = detail.get("description") or name
            images = list(detail.get("images") or [])

            if image and image not in images:
                images.insert(0, image)

            # Slug çakışması engelle
            base_slug = slugify(name)
            slug      = base_slug
            counter   = 1
            while slug in seen_slugs:
                slug = f"{base_slug}-{counter}"
                counter += 1
            seen_slugs.add(slug)

            results.append({
                "name":        name,
                "slug":        slug,
                "description": desc + CONTACT_NOTE,
                "category":    local_cat,
                "sku":         sku,
                "images":      images[:3],
                "source_url":  url,
            })
            print(f"  [{i}/{len(products)}] ✓ {name[:65]} [{sku}]")

        print()

    output_path = "storage/app/scraped_vitalmutfak.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    cats = Counter(p["category"] for p in results)
    print(f"✅ Toplam {len(results)} ürün → {output_path}")
    print("\nKategori dağılımı:")
    for cat, count in sorted(cats.items()):
        print(f"  {cat}: {count}")


if __name__ == "__main__":
    main()
