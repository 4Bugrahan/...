<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    private const KEYS = [
        'about_profile_title',
        'about_profile_text1',
        'about_profile_text2',
        'about_profile_text3',
        'about_profile_btn',
        'about_profile_image',
    ];

    public function edit(): Response
    {
        $values = collect(self::KEYS)
            ->mapWithKeys(fn ($k) => [$k => Setting::getValue($k, '', 'tr')])
            ->toArray();

        $imagePath = $values['about_profile_image'] ?? null;
        $values['about_profile_image_url'] = $imagePath
            ? (str_starts_with($imagePath, 'http') ? $imagePath : Storage::disk('public')->url(ltrim($imagePath, '/')))
            : null;

        return Inertia::render('Admin/About/Edit', [
            'values' => $values,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'about_profile_title' => ['nullable', 'string', 'max:255'],
            'about_profile_text1' => ['nullable', 'string', 'max:2000'],
            'about_profile_text2' => ['nullable', 'string', 'max:2000'],
            'about_profile_text3' => ['nullable', 'string', 'max:2000'],
            'about_profile_btn'   => ['nullable', 'string', 'max:100'],
            'image'               => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'remove_image'        => ['nullable', 'boolean'],
        ]);

        foreach (['about_profile_title', 'about_profile_text1', 'about_profile_text2', 'about_profile_text3', 'about_profile_btn'] as $key) {
            Setting::setValue($key, $data[$key] ?? '');
        }

        $currentImage = Setting::getValue('about_profile_image', null, 'tr');

        if ($request->hasFile('image')) {
            ImageService::delete($currentImage);
            $path = ImageService::store($request->file('image'), 'about');
            Setting::setValue('about_profile_image', $path);
        } elseif ($request->boolean('remove_image')) {
            ImageService::delete($currentImage);
            Setting::setValue('about_profile_image', '');
        }

        return redirect()->route('admin.about.edit')->with('success', 'Hakkımızda içeriği güncellendi.');
    }
}
