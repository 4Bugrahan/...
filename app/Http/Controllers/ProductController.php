<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $locale = app()->getLocale();

        $categories = Category::active()
            ->whereNull('parent_id')
            ->ordered()
            ->withCount('products')
            ->get()
            ->map(function ($cat) {
                // Alt kategorilerdeki ürünleri de say
                $childIds   = Category::where('parent_id', $cat->id)->pluck('id');
                $totalCount = $childIds->isEmpty()
                    ? $cat->products_count
                    : Product::active()->whereIn('category_id', $childIds)->count();
                $cat->total_products_count = $totalCount;
                return $cat;
            });

        $pageContent = [
            'prod_page_title'  => Setting::getValue('prod_page_title',  'ÜRÜNLER', $locale),
            'prod_subtitle'    => Setting::getValue('prod_subtitle',    'Endüstriyel mutfak ekipmanlarını kategorilere göre inceleyin.', $locale),
            'prod_browse_link' => Setting::getValue('prod_browse_link', 'Ürünleri İncele', $locale),
        ];

        return Inertia::render('Products/Index', [
            'categories'  => $categories,
            'pageContent' => $pageContent,
            'seo'         => $this->pageSeo(
                'products',
                'Ürünler | Endüstriyel Mutfak Ekipmanları - 4B Grup',
                '4B Grup\'un pişirme grupları, bulaşıkhane ekipmanları, soğuk muhafaza üniteleri ve nötr ekipmanlardan oluşan geniş endüstriyel mutfak ekipmanları kataloğunu inceleyin.',
                'endüstriyel mutfak ekipmanları, pişirme grubu, bulaşık makinesi, paslanmaz çelik tezgah, soğuk hava deposu'
            ),
        ]);
    }

    /**
     * Açıklama metnini meta description için kısaltır (madde işaretleri/satır sonları temizlenir).
     */
    private function metaDescFrom(?string $text, string $fallback): string
    {
        $text = trim(preg_replace('/\s+/', ' ', str_replace(['•', "\n", "\r"], ' ', (string) $text)));
        if ($text === '') {
            return $fallback;
        }
        return mb_strlen($text) > 160 ? mb_substr($text, 0, 157) . '...' : $text;
    }

    public function category(Category $category): Response|\Illuminate\Http\RedirectResponse
    {
        $category->load('parent');
        $allCategories = Category::active()->whereNull('parent_id')->ordered()->get();

        // Sidebar için aktif ana kategorinin alt kategorilerini bul
        $activeParentId = $category->parent_id ?? $category->id;
        $sidebarChildren = Category::active()
            ->where('parent_id', $activeParentId)
            ->ordered()
            ->get();

        // Ana kategori ise alt kategorilerini göster
        if ($category->parent_id === null) {
            $children = $sidebarChildren;

            if ($children->isEmpty()) {
                $products = Product::active()
                    ->where('category_id', $category->id)
                    ->ordered()->get();

                return Inertia::render('Products/Category', [
                    'category'        => $category,
                    'products'        => $products,
                    'subcategories'   => [],
                    'sidebarChildren' => [],
                    'categories'      => $allCategories,
                    'seo'             => $this->categorySeo($category),
                ]);
            }

            // Ana kategoriye tıklanınca ilk alt kategoriye yönlendir
            return redirect('/urunler/' . $children->first()->slug);
        }

        // Alt kategori ise ürünleri göster
        $products = Product::active()
            ->where('category_id', $category->id)
            ->ordered()->get();

        return Inertia::render('Products/Category', [
            'category'        => $category,
            'products'        => $products,
            'subcategories'   => [],
            'sidebarChildren' => $sidebarChildren,
            'categories'      => $allCategories,
            'seo'             => $this->categorySeo($category),
        ]);
    }

    private function categorySeo(Category $category): array
    {
        $name = $category->getTranslated('name') ?: $category->name;
        $desc = $category->getTranslated('description') ?: $category->description;

        $isEn = app()->getLocale() === 'en';

        return $this->seoData([
            'title' => $isEn
                ? "{$name} | 4B Grup Industrial Kitchen Equipment"
                : "{$name} | 4B Grup Endüstriyel Mutfak Ekipmanları",
            'desc'  => $this->metaDescFrom($desc, $isEn
                ? "Browse 4B Grup's {$name} range: durable, high-quality industrial kitchen equipment for hotels, restaurants and institutional kitchens."
                : "4B Grup'un {$name} kategorisindeki ürünlerini inceleyin. Otel, restoran ve kurumsal mutfaklar için kaliteli, dayanıklı endüstriyel mutfak ekipmanları."),
            'keywords' => $isEn
                ? "{$name}, industrial kitchen equipment, 4b grup"
                : "{$name}, endüstriyel mutfak ekipmanları, 4b grup",
        ]);
    }

    public function show(Category $category, Product $product): Response
    {
        $product->load('category');

        // İlgili ürünler — aynı (alt) kategoriden
        $relatedProducts = Product::active()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->ordered()->take(4)->get();

        $name = $product->getTranslated('name') ?: $product->name;
        $desc = $product->getTranslated('description') ?: $product->description;
        $isEn = app()->getLocale() === 'en';

        return Inertia::render('Products/Show', [
            'product'         => $product,
            'category'        => $category,
            'relatedProducts' => $relatedProducts,
            'seo'             => $this->seoData([
                'title' => $isEn
                    ? "{$name} | 4B Grup"
                    : "{$name} | 4B Grup",
                'desc'  => $this->metaDescFrom($desc, $isEn
                    ? "{$name} - 4B Grup industrial kitchen equipment. Stainless steel construction, durable and built for heavy-duty use. Contact us for details."
                    : "{$name} - 4B Grup endüstriyel mutfak ekipmanı. Paslanmaz çelik gövde, dayanıklı ve uzun ömürlü. Detaylar için bizimle iletişime geçin."),
                'keywords' => $isEn
                    ? "{$name}, industrial kitchen equipment, 4b grup"
                    : "{$name}, endüstriyel mutfak ekipmanları, 4b grup",
            ]),
        ]);
    }
}
