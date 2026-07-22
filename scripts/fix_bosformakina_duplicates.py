#!/usr/bin/env python3
"""
scraped_bosformakina.json içindeki isim çakışmalarını düzeltir:
  - Gerçekten farklı ürünleri (voltaj/kapasite/çap/ağırlık farkı olan) isimde ayırt edici
    bilgiyle günceller (kademeli: faz -> net ağırlık -> SKU model no)
  - Teknik özellikleri birebir aynı VE SKU'su "aynı kökün varyantı" olan (ör. UKM-32PT /
    UKM-32PT-1 / UKM-32PTY) gerçek mükerrer kayıtları tekilleştirir — ilkini tutar, diğerlerini
    "drop" listesine ekler. Farklı model numarası taşıyan (ör. UKT-01 / UKT-02) kayıtlar,
    spec tablosu aynı görünse bile SİLİNMEZ; SKU model numarasıyla ayırt edilir.
Çıktı: storage/app/bosformakina_name_fixes.json  { "renames": {slug: new_name}, "drops": [slug, ...] }
"""

import json, re
from collections import defaultdict

SRC = "storage/app/scraped_bosformakina.json"
OUT = "storage/app/bosformakina_name_fixes.json"

data = json.load(open(SRC, encoding="utf-8"))


def norm(s):
    return re.sub(r'\s+', ' ', s).strip() if s else s


def spec(desc, label):
    m = re.search(rf'{label}:\s*([^\n]+)', desc)
    return norm(m.group(1)) if m else None


def phase_label(volt):
    if not volt:
        return None
    has220 = "220V" in volt
    has380 = "380V" in volt
    if has220 and has380:
        return "Çift Voltaj"
    if has380:
        return "Trifaze"
    if has220:
        return "Monofaze"
    return None


def net_kg(net):
    if not net:
        return None
    m = re.search(r'/\s*([\d,\.]+)\s*kg', net, re.I)
    return f"{m.group(1)} kg" if m else None


def watt(volt_field):
    m = re.search(r'(\d+)\s*W', volt_field or "")
    return f"{m.group(1)} W" if m else None


def cap_num(cap):
    if not cap:
        return None
    m = re.search(r'([\d,\.]+)\s*(lt|L)\b', cap, re.I)
    return f"{m.group(1)} L" if m else None


def diameter_from_body(desc):
    m = re.search(r'(\d+)\s*cm çapında', desc)
    return f"{m.group(1)} cm" if m else None


def model_no(sku):
    m = re.search(r'-(\d{2})[A-Z]*(?:-\d+)?$', sku)
    return m.group(1) if m else None


def model_core(sku):
    """SKU'daki ana model/boyut numarasını çıkarır (ör. UKMS-32PTY -> 32, UKT-01T -> 01)."""
    m = re.match(r'^[A-Z]+-(\d+)', sku)
    return m.group(1) if m else sku


for p in data:
    p["_volt"]  = spec(p["description"], "Güç") or spec(p["description"], "Elektrik Bağlantısı")
    p["_kap"]   = spec(p["description"], "Kapasite")
    p["_motor"] = spec(p["description"], "Motor Gücü") or spec(p["description"], "Motor Güçü")
    p["_net"]   = spec(p["description"], "Net Ölçüler ve Ağırlık") or spec(p["description"], "Net Ağırlık")
    p["_diam"]  = diameter_from_body(p["description"])

groups = defaultdict(list)
for p in data:
    groups[(p["name"], p["category"])].append(p)

renames = {}
drops = []

for (name, cat), items in groups.items():
    if len(items) < 2:
        continue

    # 1) Güvenli mükerrer tespiti: fingerprint aynı VE SKU aynı kökün varyantı
    seen = []  # (fp, model_core)
    survivors = []
    for p in items:
        fp = (p["_volt"], p["_kap"], p["_motor"], p["_net"])
        mc = model_core(p["sku"])
        twin = next((s for s in seen if s[0] == fp and s[1] == mc), None)
        if twin:
            drops.append(p["slug"])
        else:
            seen.append((fp, mc))
            survivors.append(p)

    if len(survivors) == 1:
        continue

    # 2) Kategoriye özel taban isim (kapasite/çap/watt önek olarak eklenir)
    for p in survivors:
        base = name
        if cat == "el-blender":
            w = watt(p["_volt"])
            base = f"{w} {name}" if w else name
        elif cat == "planet-mikserler":
            c = cap_num(p["_kap"])
            base = f"{c} {name}" if c else name
        elif cat == "hamur-acma-makineleri":
            d = p["_diam"]
            base = f"{d} {name}" if d else name
        elif cat == "et-sebze-parcalama-humus-makineleri":
            c = cap_num(p["_kap"])
            base = f"{c} {name}" if c else name
        p["_base"] = base

    # 3) Kademeli ayırt edici token ekleme: faz -> net ağırlık -> SKU model no
    tokens = {p["slug"]: [] for p in survivors}

    def current_name(p):
        t = tokens[p["slug"]]
        return p["_base"] + (f" ({', '.join(t)})" if t else "")

    def has_collision():
        names = [current_name(p) for p in survivors]
        return len(set(names)) != len(names)

    stages = (
        lambda p: phase_label(p["_volt"]),
        lambda p: net_kg(p["_net"]),
        lambda p: f"Model {model_no(p['sku'])}" if model_no(p["sku"]) else None,
    )
    for extra_fn in stages:
        if not has_collision():
            break
        buckets = defaultdict(list)
        for p in survivors:
            buckets[current_name(p)].append(p)
        for nm, grp in buckets.items():
            if len(grp) <= 1:
                continue
            vals = {p["slug"]: extra_fn(p) for p in grp}
            # Sadece grup içinde gerçekten ayırt ediyorsa (birden fazla farklı değer varsa) ekle
            if len({v for v in vals.values() if v is not None}) > 1:
                for p in grp:
                    if vals[p["slug"]]:
                        tokens[p["slug"]].append(vals[p["slug"]])

    for p in survivors:
        renames[p["slug"]] = current_name(p)

json.dump({"renames": renames, "drops": drops}, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

# Doğrulama
final_names = defaultdict(list)
slug_to_name = {p["slug"]: renames.get(p["slug"], p["name"]) for p in data if p["slug"] not in drops}
slug_to_cat  = {p["slug"]: p["category"] for p in data}
for slug, nm in slug_to_name.items():
    final_names[(nm, slug_to_cat[slug])].append(slug)
remaining = {k: v for k, v in final_names.items() if len(v) > 1}

print(f"Yeniden adlandırılan: {len(renames)} | Silinecek mükerrer: {len(drops)} | Kalan çakışma: {len(remaining)}")
for k, v in remaining.items():
    print("  ÇÖZÜLEMEDİ:", k, v)
print(f"✅ {OUT}")
