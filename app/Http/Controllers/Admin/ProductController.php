<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::with('category.parent')
            ->ordered()
            ->when($request->search, fn ($q, $s) => $q->where('name', 'ilike', "%{$s}%"))
            ->when($request->category_id, fn ($q, $c) => $q->where('category_id', $c))
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => Category::ordered()->get(['id', 'name', 'parent_id']),
            'filters' => $request->only(['search', 'category_id']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Form', [
            'categories' => Category::ordered()->get(['id', 'name', 'parent_id']),
            'product' => null,
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $data = $this->validated($request);

        $data['slug'] = $this->uniqueSlug(Product::class, $data['name']);
        $data['images'] = $this->uploadImages($request);
        $data['translations'] = $this->translationsPayload($request, ['name', 'description']);

        Product::create($data);

        $this->clearHomeCache();

        return redirect()->route('admin.products.index')->with('success', 'Ürün eklendi.');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Products/Form', [
            'categories' => Category::ordered()->get(['id', 'name', 'parent_id']),
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product): \Illuminate\Http\RedirectResponse
    {
        $data = $this->validated($request, $product->id);

        if ($data['name'] !== $product->name) {
            $data['slug'] = $this->uniqueSlug(Product::class, $data['name'], $product->id);
        }

        $existingImages = $request->input('existing_images', []);
        $newImages = $this->uploadImages($request);
        $finalImages = array_merge($existingImages, $newImages);

        foreach (array_diff($product->images ?? [], $finalImages) as $removed) {
            ImageService::delete($removed);
        }

        $data['images'] = $finalImages;
        $data['translations'] = $this->translationsPayload($request, ['name', 'description'], $product->translations);

        $product->update($data);

        $this->clearHomeCache();

        return redirect()->route('admin.products.index')->with('success', 'Ürün güncellendi.');
    }

    public function destroy(Product $product): \Illuminate\Http\RedirectResponse
    {
        foreach ($product->images ?? [] as $image) {
            ImageService::delete($image);
        }

        $product->delete();

        $this->clearHomeCache();

        return redirect()->route('admin.products.index')->with('success', 'Ürün silindi.');
    }

    private function validated(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
            'featured' => ['boolean'],
            'is_active' => ['boolean'],
            'order' => ['integer'],
            'images.*' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'existing_images.*' => ['nullable', 'string'],
            'translations.*.*' => ['nullable', 'string'],
        ]);
    }

    private function uploadImages(Request $request): array
    {
        $paths = [];
        foreach ($request->file('images', []) as $file) {
            if ($file) {
                $paths[] = ImageService::store($file, 'products');
            }
        }

        return $paths;
    }

    private function clearHomeCache(): void
    {
        Cache::forget('home_categories_with_counts');
    }
}
