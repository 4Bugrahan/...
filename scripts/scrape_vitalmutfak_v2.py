#!/usr/bin/env python3
"""
vitalmutfak.com tam scraper v2 — alt kategori yapısı, dedup yok.
Her alt kategorinin tüm sayfalarını çeker.
Çıktı: storage/app/scraped_vitalmutfak_v2.json
Çalıştır: /tmp/scrape_venv/bin/python3 scripts/scrape_vitalmutfak_v2.py
"""

import json, re, time, socket, urllib.request
from pathlib import Path
from collections import Counter

socket.setdefaulttimeout(12)

BASE    = "https://vitalmutfak.com"
API     = f"{BASE}/wp-json/wp/v2"
STORE   = Path("storage/app/public/products")
JSON_OUT = "storage/app/scraped_vitalmutfak_v2.json"
CONTACT  = "\n\nFarklı boyut ve modeller için lütfen bizimle iletişime geçin."

HEADERS = {
    "User-Agent":      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept-Language": "tr-TR,tr;q=0.9",
}

# (url_suffix, category_slug, label)
SUBCATEGORIES = [
    # Pişiriciler
    ("pisiriciler/600-seri-pisiriciler",      "600-seri-pisiriciler",     "600 Seri"),
    ("pisiriciler/700-seri-pisiriciler",      "700-seri-pisiriciler",     "700 Seri"),
    ("pisiriciler/700-pro-seri-pisiriciler",  "700-pro-seri-pisiriciler", "700 Pro"),
    ("pisiriciler/900-seri-pisiriciler",      "900-seri-pisiriciler",     "900 Seri"),
    ("pisiriciler/900-pro-seri-pisiriciler",  "900-pro-seri-pisiriciler", "900 Pro"),
    ("pisiriciler/drop-in-seri-pisiriciler",  "drop-in-seri-pisiriciler", "Drop-In"),
    ("pisiriciler/eko-seri-pisiriciler",      "eko-seri-pisiriciler",     "Eko Seri"),
    ("pisiriciler/diger-pisirme-ekipmanlari", "diger-pisiriciler",        "Diğer Pişiriciler"),
    # Fırınlar
    ("firinlar/prime-konveksiyonlu-firinlar",           "prime-konveksiyonlu-firinlar", "Prime Konveksiyonlu"),
    ("firinlar/maestro-kombi-firinlar",                 "maestro-kombi-firinlar",       "Maestro Kombi"),
    ("firinlar/nevo-konveksiyonlu-patisserie-firinlar", "patisserie-firinlari",         "Patisserie"),
    ("firinlar/foodie-tas-tabanli-firinlar",            "pizza-pasta-firinlari",        "Pizza/Taş"),
    ("firinlar/klasik-pasta-borek-firini",              "pizza-pasta-firinlari",        "Pasta/Börek"),
    # Diğerleri (alt kategorisiz)
    ("bulasikhane-ekipmanlari/bulasik-makineleri", "bulasikhane-ekipmanlari", "Bulaşıkhane"),
    ("buzdolaplari",                               "buzdolaplari",            "Buzdolapları"),
    ("hazirlik-ekipmanlari",                       "hazirlik-ekipmanlari",    "Hazırlık"),
    ("notr-ekipmanlar",                            "notr-ekipmanlar",         "Nötr Ekipmanlar"),
]


# ─── HTTP ────────────────────────────────────────────────────────────────────

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  [ERR] {url}: {e}")
        return ""

def fetch_json(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as r:
            return json.loads(r.read().decode())
    except:
        return None


# ─── Parsing ─────────────────────────────────────────────────────────────────

def extract_products(html, url_filter=None):
    pat = re.compile(
        r'href="(https://vitalmutfak\.com/urun/[^"]+)"[^>]*>\s*<img\s+src="(https://vital\.b-cdn\.net/([^/]+)/[^"]+\.(?:png|jpg|JPG|jpeg)[^"]*)"',
        re.S
    )
    seen, results = set(), []
    for m in pat.finditer(html):
        url = m.group(1)
        img = m.group(2).split("?")[0] + "?class=web750"
        sku = re.sub(r"^\d+", "", m.group(3))
        if url in seen:
            continue
        if url_filter and url_filter not in url:
            continue
        seen.add(url)
        results.append({"url": url, "image": img, "sku": sku})
    return results

def get_max_page(html):
    pages = re.findall(r"/page/(\d+)/", html)
    return max((int(p) for p in pages), default=1)

def scrape_category(suffix, url_filter=None):
    cat_url = f"{BASE}/urun-kategori/endustriyel-mutfak-ekipmanlari/{suffix}/"
    html = fetch(cat_url)
    time.sleep(0.5)
    if not html:
        return []

    max_page = get_max_page(html)
    products = extract_products(html, url_filter)

    for page in range(2, max_page + 1):
        ph = fetch(f"{cat_url}page/{page}/")
        time.sleep(0.5)
        if ph:
            products += extract_products(ph, url_filter)

    seen, unique = set(), []
    for p in products:
        if p["url"] not in seen:
            seen.add(p["url"])
            unique.append(p)
    return unique


# ─── Ürün detayı ─────────────────────────────────────────────────────────────

def get_detail(source_url):
    slug = source_url.rstrip("/").split("/urun/")[-1]
    data = fetch_json(f"{API}/urun?slug={slug}&_fields=content,title")
    if data:
        import html as hl
        raw   = hl.unescape(data[0].get("content", {}).get("rendered", ""))
        title = re.sub(r"\s*-\s*Vital.*$", "", data[0].get("title", {}).get("rendered", "")).strip()
        text  = re.sub(r"<li[^>]*>", "\n• ", raw)
        text  = re.sub(r"<[^>]+>", " ", text)
        text  = re.sub(r"[ \t]+", " ", text)
        text  = re.sub(r"(?<=[^\n])\s*•\s*", "\n• ", text)
        text  = text.strip()
        if text and not text.startswith("•"):
            text = "• " + text
        return title, text.strip()

    # Fallback: meta tags
    html = fetch(source_url)
    title_m = re.search(r'<meta property="og:title" content="([^"]+)"', html)
    desc_m  = re.search(r'<meta name="description" content="([^"]+)"', html)
    title = re.sub(r"\s*-\s*Vital.*$", "", title_m.group(1) if title_m else "").strip()
    desc  = desc_m.group(1) if desc_m else title
    return title, desc


def download_image(url, dest):
    if dest.exists():
        return True
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as r:
            data = r.read()
        if len(data) < 5000:
            return False
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        return True
    except:
        return False

def get_images(source_url, sku):
    if not sku:
        return []
    html = fetch(source_url)
    all_imgs = list(dict.fromkeys(re.findall(
        r"https://vital\.b-cdn\.net/([^/]+)/([^\s\"']+\.(?:png|jpg|JPG|jpeg))", html
    )))
    own = None
    for folder, fn in all_imgs:
        if re.sub(r"^\d+", "", folder).upper() == sku.upper():
            own = folder
            break
    if not own and all_imgs:
        own = all_imgs[0][0]
    if not own:
        return []

    sku_safe = re.sub(r"[^a-zA-Z0-9_\-]", "_", sku)
    local = []
    for folder, fn in [(f, fn) for f, fn in all_imgs if f == own][:3]:
        dest = STORE / sku_safe / fn
        if download_image(f"{BASE.replace('vitalmutfak', 'vital.b-cdn')}/{folder}/{fn}", dest):
            local.append(f"products/{sku_safe}/{fn}")
    return local

def slugify(text):
    tr = str.maketrans("çğışöüÇĞİŞÖÜ", "cgisoucgisou")
    text = text.lower().translate(tr)
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    STORE.mkdir(parents=True, exist_ok=True)
    results, seen_slugs = [], set()

    print("vitalmutfak.com v2 — alt kategori bazlı scraping\n")

    for suffix, cat_slug, label in SUBCATEGORIES:
        url_filter = "bulasik" if "bulasik" in suffix else None
        print(f"[{label}]")

        products = scrape_category(suffix, url_filter)
        print(f"  {len(products)} ürün bulundu")

        for i, prod in enumerate(products, 1):
            url, img, sku = prod["url"], prod["image"], prod["sku"]

            title, desc = get_detail(url)
            time.sleep(0.35)

            name = title or url.split("/urun/")[-1].replace("-", " ").strip("/")

            # Resimler
            imgs = get_images(url, sku)
            time.sleep(0.3)
            if not imgs and img:
                imgs = [img]

            base_slug = slugify(name)
            slug, c = base_slug, 1
            while slug in seen_slugs:
                slug = f"{base_slug}-{c}"; c += 1
            seen_slugs.add(slug)

            results.append({
                "name":        name,
                "slug":        slug,
                "description": desc + CONTACT,
                "category":    cat_slug,
                "sku":         sku,
                "images":      imgs[:3],
                "source_url":  url,
            })
            print(f"  [{i}/{len(products)}] ✓ {name[:60]} [{sku}]")

        print()

    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    cats = Counter(p["category"] for p in results)
    print(f"✅ Toplam {len(results)} ürün → {JSON_OUT}")
    print("\nKategori dağılımı:")
    for k, v in sorted(cats.items()):
        print(f"  {k}: {v}")


if __name__ == "__main__":
    main()
