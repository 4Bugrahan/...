<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ── Site Routes ──────────────────────────────────────────────────────────────

Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/urunler', [ProductController::class, 'index'])->name('products.index');
Route::get('/urunler/{category:slug}', [ProductController::class, 'category'])->name('products.category');
Route::get('/urunler/{category:slug}/{product:slug}', [ProductController::class, 'show'])->name('products.show');

Route::get('/projeler', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projeler/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');

Route::get('/uretim', [PageController::class, 'production'])->name('production');

Route::get('/iletisim', [ContactController::class, 'index'])->name('contact.index');
Route::post('/iletisim', [ContactController::class, 'store'])->middleware('throttle:5,10')->name('contact.store');

Route::get('/kurumsal', [PageController::class, 'about'])->name('about');
Route::get('/referanslar', [PageController::class, 'references'])->name('references');
Route::get('/kvkk', [PageController::class, 'kvkk'])->name('kvkk');

Route::post('/set-locale', function (Request $request) {
    $locale = $request->input('locale', 'tr');

    if (! in_array($locale, ['tr', 'en', 'fr', 'de', 'nl'])) {
        $locale = 'tr';
    }

    return back()->withCookie(
        cookie()->forever('locale', $locale, '/', null, false, false)
    );
})->name('set.locale');

require __DIR__.'/admin.php';

// Routes it entirely outside the 'web' group (no matching pattern at all)
// still get one so SetLocale/HandleInertiaRequests run before the 404 fires,
// keeping the Error page's language correct instead of falling back to Turkish.
Route::fallback(fn () => abort(404));
