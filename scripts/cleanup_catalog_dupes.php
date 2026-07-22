<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Product;

// Aynı SKU/görselin ikinci kez import edilmesinden oluşan gerçek mükerrer kayıtlar — silinecek
$drops = [
    // Diğer Hazırlık Ekipmanları (VBS-20 grubu: UV Bıçak Sterilizatörü/UV Knife Sterilizer, VBS-20'nin
    // yanlış/İngilizce isimli tekrarları; 240 "Bıçak Steril Dolabı – 20 Bıçak" doğru Türkçe kayıt olarak kalıyor)
    236, 263, 268,
    267, // Bıçak Steril Dolabı - 10 Bıçak (239 ile birebir aynı, "–" yerine "-" kullanılmış tekrar)
    264, // Sebze Yıkama Makinesi (237 ile birebir aynı SKU)
    265, 266, // Sebze Yıkama Makinesi / Devrilir Sebze Yıkama Makinesi 300 Lt (238 ile aynı SKU)
    269, // Çamaşır Kaynatma Tenceresi (241 ile birebir aynı)
    // Diğer kategoriler
    271, // Giyotin Tip Bulaşık Yıkama Makinesi (207 ile birebir aynı SKU)
    84,  // Gazlı Ocak 6 Brülörlü Pro (88 ile aynı SKU, 88'in açıklaması daha eksiksiz)
    179, // Konveksiyonlu Fırın Elektrikli 20 GN 1/1 (178 ile aynı SKU, 178'in açıklaması eksiksiz Maestro spec'i)
    191, // Kombi Buharlı Fırın Elektrikli Patisserie (194 ile aynı SKU, 194'ün açıklaması daha eksiksiz)
];

// Gerçekten farklı ürünler ama yanlış/eksik isimlendirilmiş — düzeltilecek
$renames = [
    66  => 'Gazlı Ocak 6 Brülörlü (Çift Alev Sistemi)', // GKF9030: "çift alev sistemi" ile GKO9030'dan (id 71) ayrışıyor
    194 => 'Patisserie Konveksiyonlu Fırın Elektrikli 40×60 6 Tepsili', // "Patısserıe" yazım hatası düzeltildi
    227 => 'Set Altı Dört Çekmeceli Dondurucu', // Çalışma aralığı -18/-22°C — bu bir dondurucu, "Buzdolabı" değil (221 ile karışıklığı önlemek için)
];

$deleted = 0;
foreach ($drops as $id) {
    $p = Product::find($id);
    if ($p) {
        $p->delete();
        $deleted++;
    }
}

$renamed = 0;
foreach ($renames as $id => $name) {
    $p = Product::find($id);
    if ($p) {
        $p->update(['name' => $name]);
        $renamed++;
    }
}

echo "Silinen mükerrer ürün: {$deleted}\n";
echo "Yeniden adlandırılan ürün: {$renamed}\n";
echo "Toplam ürün (sonrası): " . Product::count() . "\n";
