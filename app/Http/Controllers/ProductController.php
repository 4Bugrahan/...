<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Canlı ürün arama — header/ürünler sayfasındaki arama çubuğu için.
     * En az 2 karakterden itibaren tetiklenir, isim (TR + çeviriler) üzerinden arar.
     */
    public function search(Request $request): JsonResponse
    {
        $q = trim((string) $request->get('q', ''));
        $locale = app()->getLocale();

        if (mb_strlen($q) < 2) {
            return response()->json([]);
        }

        $products = Product::query()
            ->active()
            ->with('category:id,slug')
            ->where(function ($query) use ($q, $locale) {
                $query->where('name', 'ilike', "%{$q}%");
                if ($locale !== 'tr') {
                    $query->orWhereRaw("translations->'name'->>? ilike ?", [$locale, "%{$q}%"]);
                }
            })
            ->orderBy('name')
            ->limit(8)
            ->get(['id', 'name', 'slug', 'category_id', 'images', 'translations']);

        return response()->json($products->map(fn (Product $p) => [
            'id'            => $p->id,
            'name'          => $p->getTranslated('name', $locale),
            'slug'          => $p->slug,
            'category_slug' => $p->category?->slug,
            'image'         => $p->image_urls[0] ?? null,
        ])->values());
    }

    /**
     * Ürünler sayfası: masaüstünde klasik 9 kategori kartı görünümü,
     * mobilde ise doğrudan tüm aktif ürünlerin (sayfalanmış) listesi +
     * arama çubuğu + "Kategoriler" filtresi (bkz. Products/Index.vue).
     */
    public function index(): Response
    {
        $locale = app()->getLocale();

        $pageContent = [
            'prod_page_title'  => Setting::getValue('prod_page_title',  'ÜRÜNLER', $locale),
            'prod_subtitle'    => Setting::getValue('prod_subtitle',    'Endüstriyel mutfak ekipmanlarını kategorilere göre inceleyin.', $locale),
            'prod_browse_link' => Setting::getValue('prod_browse_link', 'Ürünleri İncele', $locale),
        ];

        return Inertia::render('Products/Index', [
            'categories'   => $this->topLevelCategoriesWithCounts(),
            'products'     => $this->paginatedProducts(),
            'categoryTree' => $this->categoryTree(),
            'pageContent'  => $pageContent,
            'seo'          => $this->pageSeo(
                'products',
                'Ürünler | Endüstriyel Mutfak Ekipmanları - 4B Grup',
                '4B Grup\'un pişirme grupları, bulaşıkhane ekipmanları, soğuk muhafaza üniteleri ve nötr ekipmanlardan oluşan geniş endüstriyel mutfak ekipmanları kataloğunu inceleyin.',
                'endüstriyel mutfak ekipmanları, pişirme grubu, bulaşık makinesi, paslanmaz çelik tezgah, soğuk hava deposu'
            ),
        ]);
    }

    /**
     * Sidebar/mobil "Kategoriler" filtresinde kullanılan iç içe kategori
     * ağacı (ana kategori + altındaki alt kategoriler). 1 saatliğine
     * önbelleğe alınıyor (bkz. topLevelCategoriesWithCounts).
     */
    private function categoryTree()
    {
        return Cache::remember('products_category_tree', 3600, function () {
            $all = Category::active()->ordered()->get(['id', 'name', 'slug', 'parent_id', 'translations']);

            return $all->whereNull('parent_id')->map(function ($parent) use ($all) {
                return [
                    'id'           => $parent->id,
                    'name'         => $parent->name,
                    'slug'         => $parent->slug,
                    'translations' => ['name' => $parent->translations['name'] ?? []],
                    'children'     => $all->where('parent_id', $parent->id)->map(fn ($c) => [
                        'id'           => $c->id,
                        'name'         => $c->name,
                        'slug'         => $c->slug,
                        'translations' => ['name' => $c->translations['name'] ?? []],
                    ])->values(),
                ];
            })->values();
        });
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
        $allCategories = $this->sidebarCategories(null);

        // Sidebar için aktif ana kategorinin alt kategorilerini bul
        $activeParentId = $category->parent_id ?? $category->id;
        $sidebarChildren = $this->sidebarCategories($activeParentId);

        // Sidebar/ilgili sayfalarda sadece id/slug/parent_id kullanılıyor —
        // isim ve açıklama çevirileriyle birlikte tüm kolonları göndermeye gerek yok.
        $categoryPayload = [
            'id'        => $category->id,
            'slug'      => $category->slug,
            'parent_id' => $category->parent_id,
        ];

        // Ana kategori ve alt kategorileri varsa: ilk alt kategoriye otomatik
        // yönlendirmek yerine, kullanıcının hangi alt kategoriyi istediğini
        // seçebileceği bir kart görünümü göster.
        if ($category->parent_id === null) {
            if ($sidebarChildren->isEmpty()) {
                return Inertia::render('Products/Category', [
                    'category'        => $categoryPayload,
                    'products'        => $this->paginatedProducts($category->id),
                    'subcategories'   => [],
                    'sidebarChildren' => [],
                    'categories'      => $allCategories,
                    'seo'             => $this->categorySeo($category),
                ]);
            }

            return Inertia::render('Products/Category', [
                'category'        => $categoryPayload,
                'products'        => ['data' => [], 'links' => [], 'total' => 0],
                'subcategories'   => $this->subcategoriesWithCounts($category->id),
                'sidebarChildren' => [],
                'categories'      => $allCategories,
                'seo'             => $this->categorySeo($category),
            ]);
        }

        // Alt kategori ise ürünleri göster
        return Inertia::render('Products/Category', [
            'category'        => $categoryPayload,
            'products'        => $this->paginatedProducts($category->id),
            'subcategories'   => [],
            'sidebarChildren' => $sidebarChildren,
            'categories'      => $allCategories,
            'seo'             => $this->categorySeo($category),
        ]);
    }

    /**
     * Ana kategori seçim kartlarında (alt kategorisi olan bir kategoriye
     * girildiğinde) gösterilen alt kategori listesi — isim/açıklama
     * çevirileri ve ürün sayılarıyla birlikte.
     */
    private function subcategoriesWithCounts(int $parentId)
    {
        return Category::active()
            ->where('parent_id', $parentId)
            ->ordered()
            ->withCount(['products' => fn ($q) => $q->active()])
            ->get(['id', 'name', 'slug', 'description', 'translations'])
            ->map(function ($cat) {
                $cat->translations = [
                    'name'        => $cat->translations['name'] ?? [],
                    'description' => $cat->translations['description'] ?? [],
                ];
                return $cat;
            });
    }

    /**
     * Sidebar/alt kategori listeleri için sadece isim çevirisiyle sınırlı,
     * hafif kategori koleksiyonu (açıklama hiçbir yerde gösterilmiyor).
     */
    private function sidebarCategories(?int $parentId)
    {
        $query = Category::active()->ordered();
        $query = $parentId === null ? $query->whereNull('parent_id') : $query->where('parent_id', $parentId);

        return $query->get(['id', 'name', 'slug', 'parent_id', 'translations'])
            ->map(function ($cat) {
                $cat->translations = ['name' => $cat->translations['name'] ?? []];
                return $cat;
            });
    }

    /**
     * Ürün listesi — sayfalanmış, sadece kart görünümünde kullanılan
     * kolonlarla ve çeviri verisi isimle sınırlandırılmış. $categoryId
     * verilmezse (Ürünler ana sayfası) tüm aktif ürünler döner; her ürünün
     * kendi kategori slug'ı da eklenir (kart linki bunu kullanıyor).
     */
    private function paginatedProducts(?int $categoryId = null)
    {
        return Product::active()
            ->when($categoryId, fn ($q) => $q->where('category_id', $categoryId))
            ->with('category:id,slug')
            ->ordered()
            ->select(['id', 'name', 'slug', 'images', 'featured', 'translations', 'category_id'])
            ->paginate(24)
            ->withQueryString()
            ->through(function ($product) {
                $product->translations = ['name' => $product->translations['name'] ?? []];
                $product->category_slug = $product->category?->slug;
                return $product;
            });
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
            ->ordered()
            ->select(['id', 'name', 'slug', 'images', 'translations'])
            ->take(4)->get()
            ->map(function ($p) {
                $p->translations = ['name' => $p->translations['name'] ?? []];
                return $p;
            });

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
