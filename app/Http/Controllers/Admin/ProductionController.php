<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductionController extends Controller
{
    /**
     * Sadece video kabul eden alanlar (lazer kesim / büküm — görsel seçeneği yok,
     * video yoksa Production.vue placeholder ikon gösterir).
     */
    private const VIDEO_SLOTS = [
        'laser' => 'production_laser_video',
        'bend'  => 'production_bend_video',
    ];

    /**
     * Sadece görsel kabul eden alanlar: 3'lü kart (tasarım/imalat/son ürün) +
     * alttaki kayan galeri (7 görsel).
     */
    private const IMAGE_SLOTS = [
        'card1'    => 'production_card1_image',
        'card2'    => 'production_card2_image',
        'card3'    => 'production_card3_image',
        'gallery1' => 'production_gallery1_image',
        'gallery2' => 'production_gallery2_image',
        'gallery3' => 'production_gallery3_image',
        'gallery4' => 'production_gallery4_image',
        'gallery5' => 'production_gallery5_image',
        'gallery6' => 'production_gallery6_image',
        'gallery7' => 'production_gallery7_image',
    ];

    public function edit(): Response
    {
        $values = [];

        foreach (self::VIDEO_SLOTS as $slot => $settingKey) {
            $values["{$slot}_video_url"] = self::resolveUrl(Setting::getValue($settingKey, null, 'tr'));
        }

        foreach (self::IMAGE_SLOTS as $slot => $settingKey) {
            $values["{$slot}_image_url"] = self::resolveUrl(Setting::getValue($settingKey, null, 'tr'));
        }

        return Inertia::render('Admin/Production/Edit', [
            'values' => $values,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $rules = [];
        foreach (array_keys(self::VIDEO_SLOTS) as $slot) {
            $rules["{$slot}_video"] = ['nullable', 'file', 'mimes:mp4,webm,mov', 'max:51200'];
            $rules["{$slot}_remove_video"] = ['nullable', 'boolean'];
        }
        foreach (array_keys(self::IMAGE_SLOTS) as $slot) {
            $rules["{$slot}_image"] = ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'];
            $rules["{$slot}_remove_image"] = ['nullable', 'boolean'];
        }

        $request->validate($rules);

        foreach (self::VIDEO_SLOTS as $slot => $settingKey) {
            $this->saveVideo($request, $slot, $settingKey);
        }

        foreach (self::IMAGE_SLOTS as $slot => $settingKey) {
            $this->saveImage($request, $slot, $settingKey);
        }

        return redirect()->route('admin.production.edit')->with('success', 'Üretim sayfası medyası güncellendi.');
    }

    private function saveImage(Request $request, string $slot, string $settingKey): void
    {
        $field = "{$slot}_image";
        $current = Setting::getValue($settingKey, null, 'tr');

        if ($request->hasFile($field)) {
            $this->deleteStoredFile($current);
            Setting::setValue($settingKey, ImageService::store($request->file($field), 'production'));
        } elseif ($request->boolean("{$slot}_remove_image")) {
            $this->deleteStoredFile($current);
            Setting::setValue($settingKey, '');
        }
    }

    private function saveVideo(Request $request, string $slot, string $settingKey): void
    {
        $field = "{$slot}_video";
        $current = Setting::getValue($settingKey, null, 'tr');

        if ($request->hasFile($field)) {
            $this->deleteStoredFile($current);
            $file = $request->file($field);
            $path = 'production/'.Str::uuid().'.'.$file->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('production', $file, basename($path));
            Setting::setValue($settingKey, $path);
        } elseif ($request->boolean("{$slot}_remove_video")) {
            $this->deleteStoredFile($current);
            Setting::setValue($settingKey, '');
        }
    }

    /**
     * "/..." ile başlayan yollar public/ altındaki statik demo dosyalarıdır
     * (storage disk'inde değildir, silinmeye çalışılmamalı) — bkz. ImageService::delete
     * içindeki aynı kural.
     */
    private function deleteStoredFile(?string $path): void
    {
        if ($path && ! str_starts_with($path, 'http') && ! str_starts_with($path, '/')) {
            Storage::disk('public')->delete($path);
        }
    }

    public static function resolveUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http') || str_starts_with($path, '/')) {
            return $path;
        }

        return Storage::disk('public')->url(ltrim($path, '/'));
    }
}
