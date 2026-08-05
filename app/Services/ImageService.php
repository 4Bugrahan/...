<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageService
{
    /**
     * Stores the upload as-is (no resize/re-encode) — the vercel-php runtime
     * doesn't have the gd or imagick extension, so Intervention Image can't
     * run there. Client-side <input accept="image/*"> plus the max:5120 (KB)
     * validation rule keep uploads reasonably sized without server processing.
     */
    public static function store(UploadedFile $file, string $folder = 'uploads'): string
    {
        $extension = strtolower($file->getClientOriginalExtension()) ?: 'jpg';
        $path = trim($folder, '/').'/'.Str::uuid()->toString().'.'.$extension;

        Storage::disk('public')->put($path, file_get_contents($file->getRealPath()));

        return $path;
    }

    public static function delete(?string $path): void
    {
        // http(s) tam URL veya /images/... gibi public/ altındaki statik bir
        // dosyaysa (storage disk'inde hiç yok) silme denemesine gerek yok.
        if ($path && ! str_starts_with($path, 'http') && ! str_starts_with($path, '/')) {
            Storage::disk('public')->delete($path);
        }
    }
}
