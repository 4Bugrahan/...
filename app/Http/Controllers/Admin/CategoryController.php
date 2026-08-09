<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Kategoriler az sayıda (~40) olduğu için sayfalamak yerine hepsini
     * çekip ana kategori + altındaki alt kategoriler şeklinde bir ağaç
     * olarak gösteriyoruz — düz/karışık liste yerine gerçek hiyerarşiyi
     * yansıtsın diye. Arama yapılırken hiyerarşi anlamlı olmadığından
     * düz sonuç listesine dönülüyor.
     */
    public function index(Request $request): Response
    {
        $search = $request->search;

        $all = Category::withCount('products')
            ->with('parent:id,name')
            ->ordered()
            ->when($search, fn ($q, $s) => $q->where('name', 'ilike', "%{$s}%"))
            ->get();

        if ($search) {
            return Inertia::render('Admin/Categories/Index', [
                'tree' => null,
                'flat' => $all->values(),
                'filters' => $request->only(['search']),
            ]);
        }

        $tree = $all->whereNull('parent_id')->map(function ($parent) use ($all) {
            $parent->setRelation('children', $all->where('parent_id', $parent->id)->values());
            return $parent;
        })->values();

        return Inertia::render('Admin/Categories/Index', [
            'tree' => $tree,
            'flat' => null,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Categories/Form', [
            'parentCategories' => Category::whereNull('parent_id')->ordered()->get(['id', 'name']),
            'category' => null,
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $data = $this->validated($request);

        $data['slug'] = $this->uniqueSlug(Category::class, $data['name']);
        $data['translations'] = $this->translationsPayload($request, ['name', 'description']);

        if ($request->hasFile('image')) {
            $data['image'] = ImageService::store($request->file('image'), 'categories');
        }

        Category::create($data);

        $this->clearHomeCache();

        return redirect()->route('admin.categories.index')->with('success', 'Kategori eklendi.');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/Categories/Form', [
            'parentCategories' => Category::whereNull('parent_id')->where('id', '!=', $category->id)->ordered()->get(['id', 'name']),
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category): \Illuminate\Http\RedirectResponse
    {
        $data = $this->validated($request);

        if ($data['name'] !== $category->name) {
            $data['slug'] = $this->uniqueSlug(Category::class, $data['name'], $category->id);
        }

        $data['translations'] = $this->translationsPayload($request, ['name', 'description'], $category->translations);

        if ($request->hasFile('image')) {
            ImageService::delete($category->image);
            $data['image'] = ImageService::store($request->file('image'), 'categories');
        }

        $category->update($data);

        $this->clearHomeCache();

        return redirect()->route('admin.categories.index')->with('success', 'Kategori güncellendi.');
    }

    public function destroy(Category $category): \Illuminate\Http\RedirectResponse
    {
        if ($category->products()->exists() || $category->children()->exists()) {
            return back()->with('error', 'Bu kategoriye bağlı ürün veya alt kategori var, önce onları taşıyın/silin.');
        }

        ImageService::delete($category->image);
        $category->delete();

        $this->clearHomeCache();

        return redirect()->route('admin.categories.index')->with('success', 'Kategori silindi.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'parent_id' => ['nullable', 'exists:categories,id'],
            'is_active' => ['boolean'],
            'order' => ['integer'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'translations.*.*' => ['nullable', 'string'],
        ]);
    }

    private function clearHomeCache(): void
    {
        Cache::forget('home_categories_with_counts');
        Cache::forget('products_category_tree');
        foreach (['tr', 'en', 'fr', 'de', 'nl'] as $locale) {
            Cache::forget("nav_categories_{$locale}");
        }
    }
}
