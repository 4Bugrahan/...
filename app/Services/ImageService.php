<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageService
{
    private const MAX_PX   = 2500;
    private const QUALITY  = 80;

    public static function store(UploadedFile $file, string $folder = 'uploads'): string
    {
        $filename = Str::uuid() . '.jpg';
        $path     = $folder . '/' . $filename;

        try {
            $contents = file_get_contents($file->getRealPath());
            if ($contents === false) {
                return $file->store($folder, 'public');
            }

            $src = @imagecreatefromstring($contents);
            if ($src === false) {
                return $file->store($folder, 'public');
            }

            $w = imagesx($src);
            $h = imagesy($src);

            if ($w > self::MAX_PX || $h > self::MAX_PX) {
                $ratio = min(self::MAX_PX / $w, self::MAX_PX / $h);
                $newW  = (int) round($w * $ratio);
                $newH  = (int) round($h * $ratio);

                $dst = imagecreatetruecolor($newW, $newH);
                imagefilledrectangle($dst, 0, 0, $newW, $newH, imagecolorallocate($dst, 255, 255, 255));
                imagecopyresampled($dst, $src, 0, 0, 0, 0, $newW, $newH, $w, $h);
                imagedestroy($src);
                $src = $dst;
            }

            $tmpPath = sys_get_temp_dir() . '/' . $filename;
            imagejpeg($src, $tmpPath, self::QUALITY);
            imagedestroy($src);

            Storage::disk('public')->put($path, file_get_contents($tmpPath));

            if (file_exists($tmpPath)) {
                @unlink($tmpPath);
            }

            return $path;
        } catch (\Throwable $e) {
            Log::warning('ImageService: Processing failed, storing original', [
                'error' => $e->getMessage(),
                'file'  => $file->getClientOriginalName(),
            ]);

            return $file->store($folder, 'public');
        }
    }

    public static function delete(?string $path): void
    {
        if ($path && !str_starts_with($path, 'http')) {
            Storage::disk('public')->delete(ltrim($path, '/'));
        }
    }
}
