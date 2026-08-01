<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class ImageService
{
    private const MAX_PX = 2500;

    private const QUALITY = 82;

    public static function store(UploadedFile $file, string $folder = 'uploads'): string
    {
        $path = trim($folder, '/').'/'.Str::uuid()->toString().'.jpg';

        $image = Image::read($file->getRealPath());
        $image->scaleDown(width: self::MAX_PX, height: self::MAX_PX);

        Storage::disk('public')->put($path, (string) $image->toJpeg(self::QUALITY));

        return $path;
    }

    public static function delete(?string $path): void
    {
        if ($path && ! str_starts_with($path, 'http')) {
            Storage::disk('public')->delete(ltrim($path, '/'));
        }
    }
}
