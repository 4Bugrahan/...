<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Product;

$fixes  = json_decode(file_get_contents(__DIR__ . '/../storage/app/bosformakina_name_fixes.json'), true);
$scraped = json_decode(file_get_contents(__DIR__ . '/../storage/app/scraped_bosformakina.json'), true);

// json_slug -> ilk görsel yolu (import komutu slug'ı isimden yeniden ürettiği için
// gerçek eşleştirme anahtarı olarak görselleri kullanıyoruz — SKU'ya özgü ve benzersizler)
$jsonSlugToImage = [];
foreach ($scraped as $item) {
    if (!empty($item['images'])) {
        $jsonSlugToImage[$item['slug']] = $item['images'][0];
    }
}

// ilk görsel -> hedef isim (rename) ya da 'DROP' işareti
$imageToAction = [];
foreach ($fixes['renames'] as $jsonSlug => $newName) {
    if (isset($jsonSlugToImage[$jsonSlug])) {
        $imageToAction[$jsonSlugToImage[$jsonSlug]] = ['type' => 'rename', 'name' => $newName];
    }
}
foreach ($fixes['drops'] as $jsonSlug) {
    if (isset($jsonSlugToImage[$jsonSlug])) {
        $imageToAction[$jsonSlugToImage[$jsonSlug]] = ['type' => 'drop'];
    }
}

$targetCategorySlugs = [
    'et-kiyma-makineleri', 'et-kemik-testereleri', 'hamur-yogurma-makineleri',
    'spiral-hamur-yogurma-makineleri', 'planet-mikserler', 'hamur-acma-makineleri',
    'et-sebze-parcalama-humus-makineleri', 'patates-soyma-makineleri', 'el-blender',
];

$products = Product::whereHas('category', fn ($q) => $q->whereIn('slug', $targetCategorySlugs))->get();

$renamed = 0;
$deleted = 0;
$notMatched = [];
$deletedImageDirs = [];

foreach ($products as $p) {
    $firstImage = is_array($p->images) && count($p->images) > 0 ? $p->images[0] : null;
    if (!$firstImage || !isset($imageToAction[$firstImage])) {
        continue; // bu ürün için değişiklik yok (zaten benzersizdi)
    }
    $action = $imageToAction[$firstImage];
    if ($action['type'] === 'rename') {
        if ($p->name !== $action['name']) {
            $p->update(['name' => $action['name']]);
            $renamed++;
        }
    } else {
        foreach ((array) $p->images as $img) {
            $dir = dirname($img);
            if ($dir && $dir !== '.') {
                $deletedImageDirs[$dir] = true;
            }
        }
        $p->delete();
        $deleted++;
    }
}

// eşleşmeyen (uygulanamayan) rename/drop var mı kontrol et
$appliedImages = [];
foreach ($products as $p) {
    $firstImage = is_array($p->images) && count($p->images) > 0 ? $p->images[0] : null;
    if ($firstImage) $appliedImages[$firstImage] = true;
}
foreach ($imageToAction as $img => $action) {
    // silinenler artık $products listesinde yok, bu normal; sadece hiç bulunamayanları raporla
}

echo "Yeniden adlandırılan: {$renamed}\n";
echo "Silinen mükerrer ürün: {$deleted}\n";
echo "Silinecek görsel klasörleri: " . count($deletedImageDirs) . "\n";
foreach (array_keys($deletedImageDirs) as $dir) {
    echo "  {$dir}\n";
}

file_put_contents(__DIR__ . '/../storage/app/dropped_image_dirs.json', json_encode(array_keys($deletedImageDirs)));
