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
     * Her medya alanı için: görsel VEYA video (ikisi birden ayarlıysa Production.vue
     * video'yu önceliklendirir). Boş bırakılırsa placeholder ikon gösterilir.
     */
    private const SLOTS = [
        'laser' => ['image' => 'production_laser_image', 'video' => 'production_laser_video'],
        'bend'  => ['image' => 'production_bend_image',  'video' => 'production_bend_video'],
    ];

    public function edit(): Response
    {
        $values = [];
        foreach (self::SLOTS as $slot => $keys) {
            foreach ($keys as $type => $settingKey) {
                $path = Setting::getValue($settingKey, null, 'tr');
                $values["{$slot}_{$type}_url"] = $path
                    ? (str_starts_with($path, 'http') ? $path : Storage::disk('public')->url(ltrim($path, '/')))
                    : null;
            }
        }

        return Inertia::render('Admin/Production/Edit', [
            'values' => $values,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'laser_image'        => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'laser_video'        => ['nullable', 'file', 'mimes:mp4,webm,mov', 'max:51200'],
            'laser_remove_image' => ['nullable', 'boolean'],
            'laser_remove_video' => ['nullable', 'boolean'],
            'bend_image'         => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'bend_video'         => ['nullable', 'file', 'mimes:mp4,webm,mov', 'max:51200'],
            'bend_remove_image'  => ['nullable', 'boolean'],
            'bend_remove_video'  => ['nullable', 'boolean'],
        ]);

        foreach (self::SLOTS as $slot => $keys) {
            // Görsel
            $imageKey = $keys['image'];
            $currentImage = Setting::getValue($imageKey, null, 'tr');
            if ($request->hasFile("{$slot}_image")) {
                ImageService::delete($currentImage);
                Setting::setValue($imageKey, ImageService::store($request->file("{$slot}_image"), 'production'));
            } elseif ($request->boolean("{$slot}_remove_image")) {
                ImageService::delete($currentImage);
                Setting::setValue($imageKey, '');
            }

            // Video (ImageService optimize etmeye çalışmasın diye ayrı, ham depolama)
            $videoKey = $keys['video'];
            $currentVideo = Setting::getValue($videoKey, null, 'tr');
            if ($request->hasFile("{$slot}_video")) {
                $this->deleteStoredFile($currentVideo);
                $file = $request->file("{$slot}_video");
                $path = 'production/'.Str::uuid().'.'.$file->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('production', $file, basename($path));
                Setting::setValue($videoKey, $path);
            } elseif ($request->boolean("{$slot}_remove_video")) {
                $this->deleteStoredFile($currentVideo);
                Setting::setValue($videoKey, '');
            }
        }

        return redirect()->route('admin.production.edit')->with('success', 'Üretim sayfası medyası güncellendi.');
    }

    private function deleteStoredFile(?string $path): void
    {
        if ($path && ! str_starts_with($path, 'http') && ! str_starts_with($path, '/')) {
            Storage::disk('public')->delete($path);
        }
    }
}
