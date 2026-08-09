<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Partner;
use App\Models\Product;
use App\Models\Project;
use App\Models\Setting;
use App\Services\ImageService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

/**
 * Tek seferlik geriye dönük optimizasyon: sistemde zaten duran (upload
 * mekanizması eskiden hiç işlem yapmadan kaydettiği için olduğu gibi
 * kalmış) görselleri ImageService::optimize() ile yeniden işler.
 *
 * Üzerine yazmadan önce her dosyanın orijinalini storage/app/image-backup-*
 * altına yedekler. Uzantı değişirse (örn. PNG'den JPEG'e) yeni bir path'e
 * yükleyip ilgili modeldeki referansı günceller, eski dosyayı S3'ten siler.
 */
class OptimizeExistingImages extends Command
{
    protected $signature = 'images:optimize {--dry-run : Sadece ne yapılacağını göster, hiçbir şeyi değiştirme}';

    protected $description = 'Kategori/ürün/proje/marka/hakkımızda görsellerini mevcut ImageService profillerine göre yeniden optimize eder';

    private string $backupDir;

    private int $processed = 0;
    private int $skipped = 0;
    private int $bytesBefore = 0;
    private int $bytesAfter = 0;

    public function handle(): int
    {
        $dryRun = (bool) $this->option('dry-run');
        $this->backupDir = 'image-backup-'.now()->format('Y-m-d-His');

        $this->info($dryRun ? 'DRY RUN — hiçbir dosya değişmeyecek.' : "Yedekler storage/app/{$this->backupDir}/ altına alınacak.");

        $this->optimizeCategoryImages($dryRun);
        $this->optimizeProductImages($dryRun);
        $this->optimizeProjectImages($dryRun);
        $this->optimizePartnerLogos($dryRun);
        $this->optimizeAboutImage($dryRun);

        $savedMb = round(($this->bytesBefore - $this->bytesAfter) / 1048576, 2);
        $this->newLine();
        $this->info("Tamamlandı: {$this->processed} görsel işlendi, {$this->skipped} atlandı, {$savedMb}MB kazanıldı.");

        return self::SUCCESS;
    }

    private function optimizeCategoryImages(bool $dryRun): void
    {
        $categories = Category::whereNotNull('image')->where('image', '!=', '')->get();
        $this->line("Kategoriler: {$categories->count()} görsel bulundu.");

        foreach ($categories as $category) {
            $newPath = $this->processPath($category->image, 'categories', $dryRun);
            if ($newPath && $newPath !== $category->image && ! $dryRun) {
                $category->update(['image' => $newPath]);
            }
        }
    }

    private function optimizeProductImages(bool $dryRun): void
    {
        $products = Product::whereNotNull('images')->get();
        $this->line("Ürünler: {$products->count()} kayıt taranıyor.");

        foreach ($products as $product) {
            $images = $product->images ?? [];
            $changed = false;

            foreach ($images as $i => $path) {
                $newPath = $this->processPath($path, 'products', $dryRun);
                if ($newPath && $newPath !== $path) {
                    $images[$i] = $newPath;
                    $changed = true;
                }
            }

            if ($changed && ! $dryRun) {
                $product->update(['images' => $images]);
            }
        }
    }

    private function optimizeProjectImages(bool $dryRun): void
    {
        $projects = Project::whereNotNull('images')->get();
        $this->line("Projeler: {$projects->count()} kayıt taranıyor.");

        foreach ($projects as $project) {
            $images = $project->images ?? [];
            $changed = false;

            foreach ($images as $i => $path) {
                $newPath = $this->processPath($path, 'projects', $dryRun);
                if ($newPath && $newPath !== $path) {
                    $images[$i] = $newPath;
                    $changed = true;
                }
            }

            if ($changed && ! $dryRun) {
                $project->update(['images' => $images]);
            }
        }
    }

    private function optimizePartnerLogos(bool $dryRun): void
    {
        $partners = Partner::whereNotNull('logo')->where('logo', '!=', '')->get();
        $this->line("Marka/kurum logoları: {$partners->count()} görsel bulundu.");

        foreach ($partners as $partner) {
            $newPath = $this->processPath($partner->logo, 'partners', $dryRun);
            if ($newPath && $newPath !== $partner->logo && ! $dryRun) {
                $partner->update(['logo' => $newPath]);
            }
        }
    }

    private function optimizeAboutImage(bool $dryRun): void
    {
        $path = Setting::getValue('about_profile_image', null, 'tr');
        if (! $path) {
            $this->line('Hakkımızda görseli: yok, atlandı.');
            return;
        }

        $this->line('Hakkımızda görseli işleniyor...');
        $newPath = $this->processPath($path, 'about', $dryRun);
        if ($newPath && $newPath !== $path && ! $dryRun) {
            Setting::setValue('about_profile_image', $newPath);
        }
    }

    /**
     * Tek bir storage path'ini indirir, yedekler, optimize eder, üzerine
     * (ya da uzantı değiştiyse yeni bir path'e) yazar. Yeni path'i döner,
     * hiçbir şey yapılmadıysa null döner.
     */
    private function processPath(?string $path, string $folder, bool $dryRun): ?string
    {
        if (! $path || str_starts_with($path, 'http') || str_starts_with($path, '/')) {
            // Harici URL ya da public/ altındaki statik dosya — storage disk'inde yok, atla.
            $this->skipped++;
            return null;
        }

        if (! Storage::disk('public')->exists($path)) {
            $this->warn("  Bulunamadı, atlandı: {$path}");
            $this->skipped++;
            return null;
        }

        $contents = Storage::disk('public')->get($path);
        $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION) ?: 'jpg');
        $beforeSize = strlen($contents);

        [$optimized, $newExtension] = ImageService::optimize($contents, $extension, $folder);
        $afterSize = strlen($optimized);

        $this->processed++;
        $this->bytesBefore += $beforeSize;
        $this->bytesAfter += $afterSize;

        $savedPct = $beforeSize > 0 ? round((1 - $afterSize / $beforeSize) * 100) : 0;
        $this->line(sprintf(
            '  %s → %s (%s → %s, -%%%d)',
            $path,
            $newExtension === $extension ? '(aynı yol)' : "*.{$newExtension}",
            $this->formatBytes($beforeSize),
            $this->formatBytes($afterSize),
            $savedPct
        ));

        if ($dryRun) {
            return null;
        }

        // Üzerine yazmadan önce orijinali yedekle.
        Storage::disk('local')->put("{$this->backupDir}/{$path}", $contents);

        if ($newExtension === $extension) {
            Storage::disk('public')->put($path, $optimized, 'public');
            return $path;
        }

        $newPath = preg_replace('/\.'.preg_quote($extension, '/').'$/i', '.'.$newExtension, $path);
        Storage::disk('public')->put($newPath, $optimized, 'public');
        Storage::disk('public')->delete($path);

        return $newPath;
    }

    private function formatBytes(int $bytes): string
    {
        if ($bytes >= 1048576) {
            return round($bytes / 1048576, 2).'MB';
        }
        return round($bytes / 1024, 1).'KB';
    }
}
