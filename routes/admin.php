<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\TranslateController;
use Illuminate\Support\Facades\Route;

// ── Admin — Auth ────────────────────────────────────────────────────────────

Route::get('/admin/login', [AuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AuthController::class, 'login'])->middleware('throttle:5,1')->name('admin.login.store');

// ── Admin — Protected ────────────────────────────────────────────────────────

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/', fn () => redirect()->route('admin.products.index'))->name('dashboard');

    Route::resource('products', ProductController::class)->except('show');
    Route::resource('categories', CategoryController::class)->except('show');
    Route::resource('projects', ProjectController::class)->except('show');
    Route::resource('partners', PartnerController::class)->except('show');

    Route::post('/translate', [TranslateController::class, 'translate'])->name('translate');
    Route::post('/translate-batch', [TranslateController::class, 'translateBatch'])->name('translate.batch');
});
