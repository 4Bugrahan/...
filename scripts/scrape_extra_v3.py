#!/usr/bin/env python3
"""
vitalmutfak.com — ek ürünler (bulaşıkhane, nötr ekipmanlar, buzdolapları)
Belirli ürün URL'lerini çeker, görselleri indirir/optimize eder.
Çıktı: storage/app/scraped_extra_v3.json
Çalıştır: python3 scripts/scrape_extra_v3.py
"""

import json, re, time, socket, urllib.request, html as hl, subprocess
from pathlib import Path

socket.setdefaulttimeout(12)

BASE  = "https://vitalmutfak.com"
API   = f"{BASE}/wp-json/wp/v2"
STORE = Path("storage/app/public/products")
JSON_OUT = "storage/app/scraped_extra_v3.json"
CONTACT  = "\n\nFarklı boyut ve modeller için lütfen bizimle iletişime geçin."

HEADERS = {
    "User-Agent":      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept-Language": "tr-TR,tr;q=0.9",
}

# (url, category_slug)
ITEMS = [
    # Bulaşıkhane Ekipmanları — yeni tipler
    ("https://vitalmutfak.com/urun/istif-rafi-4-duz-tablali-2000x600x1600/", "bulasikhane-ekipmanlari"),
    ("https://vitalmutfak.com/urun/bulasik-yikama-makinesi-1000-tabak-sa-dijital/", "bulasikhane-ekipmanlari"),
    ("https://vitalmutfak.com/urun/bardak-yikama-makinesi-30-sepet-sa-deterjan-parlatici-pompali/", "bulasikhane-ekipmanlari"),
    ("https://vitalmutfak.com/urun/kazan-yikama-makinesi-130-litre-manuel/", "bulasikhane-ekipmanlari"),

    # Nötr Ekipmanlar — yeni tipler
    ("https://vitalmutfak.com/urun/calisma-tezgahi-cift-evyeli-1800x700x850/", "notr-ekipmanlar"),
    ("https://vitalmutfak.com/urun/calisma-tezgahi-1900x700x850/", "notr-ekipmanlar"),
    ("https://vitalmutfak.com/urun/calisma-tezgahi-taban-rafli-set-alti-800x700x550/", "notr-ekipmanlar"),
    ("https://vitalmutfak.com/urun/calisma-tezgahi-mermer-tablali-taban-rafli-1200x700x850/", "notr-ekipmanlar"),
    ("https://vitalmutfak.com/urun/calisma-tezgahi-uc-evyeli-1900x600x850/", "notr-ekipmanlar"),
    ("https://vitalmutfak.com/urun/et-sebze-suzme-tezgahi-1600x700x850/", "notr-ekipmanlar"),
    ("https://vitalmutfak.com/urun/kule-tip-teshir-unitesi-1800x700x850-1600/", "notr-ekipmanlar"),
    ("https://vitalmutfak.com/urun/isitmali-calisma-tezgahi-dolapli-ara-rafli-207/", "notr-ekipmanlar"),
    ("https://vitalmutfak.com/urun/calisma-tezgahi-evyeli-600x700x850/", "notr-ekipmanlar"),
    ("https://vitalmutfak.com/urun/hijyen-evyesi-dizden-basmali-400x420x270/", "notr-ekipmanlar"),
    ("https://vitalmutfak.com/urun/grup-cekmece-unitesi-610x600x850/", "notr-ekipmanlar"),
    ("https://vitalmutfak.com/urun/calisma-tezgahi-hareketli-taban-rafli-tek-cekmeceli-1900x700x850/", "notr-ekipmanlar"),

    # Buzdolapları — yeni tip
    ("https://vitalmutfak.com/urun/soguk-servis-buzdolabi-1200x700x850-1400/", "buzdolaplari"),
]


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

def get_detail(source_url):
    slug = source_url.rstrip("/").split("/urun/")[-1]
    data = fetch_json(f"{API}/urun?slug={slug}&_fields=content,title")
    if data:
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

    h = fetch(source_url)
    title_m = re.search(r'<meta property="og:title" content="([^"]+)"', h)
    desc_m  = re.search(r'<meta name="description" content="([^"]+)"', h)
    title = re.sub(r"\s*-\s*Vital.*$", "", title_m.group(1) if title_m else "").strip()
    desc  = desc_m.group(1) if desc_m else title
    return title, desc

def extract_sku(html):
    pat = re.compile(r'https://vital\.b-cdn\.net/([^/]+)/[^\s"\']+\.(?:png|jpg|JPG|jpeg)', re.S)
    m = pat.search(html)
    if m:
        return re.sub(r"^\d+", "", m.group(1))
    return None

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

def get_images(source_url):
    html = fetch(source_url)
    sku = extract_sku(html)
    if not sku:
        return [], None
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
        return [], sku

    sku_safe = re.sub(r"[^a-zA-Z0-9_\-]", "_", sku)
    local = []
    for folder, fn in [(f, fn) for f, fn in all_imgs if f == own][:3]:
        dest = STORE / sku_safe / fn
        cdn_url = f"https://vital.b-cdn.net/{folder}/{fn}"
        if download_image(cdn_url, dest):
            local.append(str(dest))
    return local, sku

def slugify(text):
    tr = str.maketrans("çğışöüÇĞİŞÖÜ", "cgisoucgisou")
    text = text.lower().translate(tr)
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def main():
    STORE.mkdir(parents=True, exist_ok=True)
    results = []

    for url, cat_slug in ITEMS:
        print(f"-> {url}")
        title, desc = get_detail(url)
        time.sleep(0.3)
        name = title or url.rstrip("/").split("/urun/")[-1].replace("-", " ")

        local_paths, sku = get_images(url)
        time.sleep(0.3)

        # Optimize: PNG/large -> JPEG 800px 82%
        rel_paths = []
        for p in local_paths:
            path = Path(p)
            if path.suffix.lower() != ".jpg" or True:
                jpg_path = path.with_suffix(".jpg")
                subprocess.run([
                    "sips", "-Z", "800", "-s", "format", "jpeg", "-s", "formatOptions", "82",
                    str(path), "--out", str(jpg_path)
                ], capture_output=True)
                if jpg_path != path and path.exists() and jpg_path.exists():
                    path.unlink()
            else:
                jpg_path = path
            rel_paths.append(str(jpg_path.relative_to("storage/app/public")))

        results.append({
            "name":        name,
            "slug":        slugify(name),
            "description": desc + CONTACT,
            "category":    cat_slug,
            "sku":         sku or "",
            "images":      rel_paths,
            "source_url":  url,
        })
        print(f"   ✓ {name[:60]} [{sku}] -> {len(rel_paths)} görsel")

    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\n✅ {len(results)} ürün -> {JSON_OUT}")


if __name__ == "__main__":
    main()
