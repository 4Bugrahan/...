<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class ImportScrapedProducts extends Command
{
    protected $signature   = 'products:import-scraped {--fresh : Mevcut ürünleri temizle} {--file= : JSON dosya adı (storage/app/ altında)}';
    protected $description = 'Scraped ürünleri veritabanına aktar (oztiryakiler veya vitalmutfak)';

    public function handle(): int
    {
        $fileName = $this->option('file') ?: 'scraped_vitalmutfak_v2.json';
        $jsonPath = storage_path("app/{$fileName}");

        if (! file_exists($jsonPath)) {
            $this->error("{$jsonPath} bulunamadı. Önce ilgili scraper scriptini çalıştırın.");
            return self::FAILURE;
        }

        $products = json_decode(file_get_contents($jsonPath), true);
        $this->info('Toplam okunacak ürün: ' . count($products));

        if ($this->option('fresh')) {
            Product::truncate();
            $this->warn('Mevcut ürünler temizlendi.');
        }

        $categoryCache = Category::all()->keyBy('slug');
        $imported      = 0;
        $skipped       = 0;

        $bar = $this->output->createProgressBar(count($products));
        $bar->start();

        foreach ($products as $idx => $data) {
            $catSlug = $data['category'] ?? null;
            $category = $categoryCache->get($catSlug);

            if (! $category) {
                $this->newLine();
                $this->warn("Kategori bulunamadı: {$catSlug} — atlandı.");
                $skipped++;
                $bar->advance();
                continue;
            }

            $slug = Str::slug($data['name']);
            // Çakışma varsa sona sayı ekle
            $baseSlug = $slug;
            $i = 1;
            while (Product::where('slug', $slug)->exists()) {
                $slug = "{$baseSlug}-{$i}";
                $i++;
            }

            // Her iki format desteklenir: images[] veya image_url
            if (! empty($data['images'])) {
                $images = array_values((array) $data['images']);
            } elseif (! empty($data['image_url'])) {
                $images = [$data['image_url']];
            } else {
                $images = [];
            }

            // HTML entity decode
            $name        = html_entity_decode($data['name'], ENT_QUOTES | ENT_HTML5, 'UTF-8');
            $description = html_entity_decode($data['description'], ENT_QUOTES | ENT_HTML5, 'UTF-8');

            Product::create([
                'name'        => $name,
                'slug'        => $slug,
                'description' => $description,
                'category_id' => $category->id,
                'images'      => $images,
                'featured'    => false,
                'is_active'   => true,
                'order'       => $idx + 1,
            ]);

            $imported++;
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info("✅ {$imported} ürün import edildi, {$skipped} ürün atlandı.");

        return self::SUCCESS;
    }
}
