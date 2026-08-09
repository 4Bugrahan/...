<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

abstract class Controller
{
    /**
     * Ana sayfa ve ürünler sayfasındaki kategori kutucukları için kullanılan
     * üst düzey kategori listesi + toplam ürün sayıları. Alt kategorilerin
     * ürün sayısını toplamak her kategori için ekstra sorgu gerektirdiğinden
     * (9 kategori x fazladan sorgu, her istekte) sonucu 1 saatliğine
     * önbelleğe alıyoruz — aynı `nav_categories_*`/`site_settings_*` önbellek
     * yaklaşımıyla tutarlı (admin panelinden yapılan değişiklikler en geç
     * 1 saat içinde yansır, elle önbellek temizlemeye gerek kalmadan).
     */
    protected function topLevelCategoriesWithCounts()
    {
        return Cache::remember('home_categories_with_counts', 3600, function () {
            return Category::active()
                ->whereNull('parent_id')
                ->ordered()
                ->withCount('products')
                ->get(['id', 'name', 'slug', 'translations'])
                ->map(function ($cat) {
                    $childIds = Category::where('parent_id', $cat->id)->pluck('id');
                    $cat->total_products_count = $childIds->isEmpty()
                        ? $cat->products_count
                        : Product::active()->whereIn('category_id', $childIds)->count();
                    // Sadece isim çevirisi kullanılıyor (bkz. Home.vue / Products/Index.vue) —
                    // açıklama çevirisini göndermeye gerek yok.
                    $cat->translations = ['name' => $cat->translations['name'] ?? []];
                    return $cat;
                });
        });
    }

    /**
     * AppLayout'taki <Head> bileşenine gönderilecek seo prop'unu hazırlar.
     */
    protected function seoData(array $data): array
    {
        $ogPath  = Setting::getValue('seo_og_image', '');
        $ogImage = $ogPath
            ? (str_starts_with($ogPath, 'http') ? $ogPath : Storage::disk('public')->url($ogPath))
            : '';

        return array_merge([
            'title'    => '',
            'desc'     => '',
            'keywords' => '',
            'og_image' => $ogImage,
        ], $data);
    }

    /**
     * Admin > SEO panelinden yönetilen statik sayfa meta etiketleri (seo_{prefix}_title/desc/keywords).
     */
    protected function pageSeo(string $prefix, string $defTitle, string $defDesc, string $defKeywords = ''): array
    {
        $locale = app()->getLocale();

        return $this->seoData([
            'title'    => Setting::getValue("seo_{$prefix}_title",    $defTitle,    $locale) ?: $defTitle,
            'desc'     => Setting::getValue("seo_{$prefix}_desc",     $defDesc,     $locale) ?: $defDesc,
            'keywords' => Setting::getValue("seo_{$prefix}_keywords", $defKeywords, $locale) ?: $defKeywords,
        ]);
    }

    /**
     * Açıklama metnini meta description için kısaltır (madde işaretleri/satır sonları temizlenir).
     */
    protected function metaDescFrom(?string $text, string $fallback): string
    {
        $text = trim(preg_replace('/\s+/', ' ', str_replace(['•', "\n", "\r"], ' ', (string) $text)));
        if ($text === '') {
            return $fallback;
        }
        return mb_strlen($text) > 160 ? mb_substr($text, 0, 157) . '...' : $text;
    }

    /**
     * Admin CRUD controller'larında ortak slug üretimi — verilen model sınıfının
     * `slug` kolonunda çakışma varsa `-2`, `-3` ... ekleyerek benzersizleştirir.
     */
    protected function uniqueSlug(string $modelClass, string $value, ?int $ignoreId = null): string
    {
        $base = Str::slug($value);
        $slug = $base;
        $i = 1;

        while ($modelClass::where('slug', $slug)->when($ignoreId, fn ($q, $id) => $q->where('id', '!=', $id))->exists()) {
            $slug = $base.'-'.(++$i);
        }

        return $slug;
    }

    /**
     * Admin CRUD controller'larında ortak çoklu dil (translations JSON) payload'ı —
     * `$allowedFields` içindeki alanlar için dolu gelen çevirileri mevcut kayıtla birleştirir.
     */
    protected function translationsPayload(Request $request, array $allowedFields, ?array $existingTranslations = null): ?array
    {
        $translations = $existingTranslations ?? [];
        foreach ((array) $request->input('translations', []) as $locale => $fields) {
            foreach ((array) $fields as $field => $value) {
                if (in_array($field, $allowedFields, true) && filled($value)) {
                    $translations[$field][$locale] = $value;
                }
            }
        }

        return empty($translations) ? null : $translations;
    }
}
