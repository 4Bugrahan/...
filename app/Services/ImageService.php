<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageService
{
    /**
     * Her klasör (varlık tipi) için hedef en uzun kenar (px) ve JPEG kalitesi.
     * Kaynak görsel bundan küçükse büyütülmez, sadece yeniden kodlanır.
     * Sınırlar gerçek görüntülenme boyutlarına göre (retina/gelecek payıyla)
     * belirlendi — bkz. Products/Show.vue, Projects/Show.vue, Home.vue vb.
     */
    private const PROFILES = [
        'categories' => ['max' => 800,  'quality' => 82],
        'products'   => ['max' => 1200, 'quality' => 82],
        'projects'   => ['max' => 1200, 'quality' => 82],
        'partners'   => ['max' => 600,  'quality' => 85],
        'about'      => ['max' => 1600, 'quality' => 82],
    ];

    public static function store(UploadedFile $file, string $folder = 'uploads'): string
    {
        $extension = strtolower($file->getClientOriginalExtension()) ?: 'jpg';
        $contents = file_get_contents($file->getRealPath());

        [$optimized, $finalExtension] = self::optimize($contents, $extension, trim($folder, '/'));

        $path = trim($folder, '/').'/'.Str::uuid()->toString().'.'.$finalExtension;
        Storage::disk('public')->put($path, $optimized);

        return $path;
    }

    /**
     * Ham görsel içeriğini ilgili klasörün hedef ölçüsüne göre küçültüp
     * yeniden kodlar. SVG ve GD'nin çözemediği içerikler hiç işlenmeden
     * olduğu gibi döner. `images:optimize` Artisan komutu, sistemde zaten
     * duran görselleri yeniden işlemek için de bu metodu kullanır.
     *
     * @return array{0: string, 1: string} [binary içerik, dosya uzantısı]
     */
    public static function optimize(string $contents, string $extension, string $folder): array
    {
        $extension = strtolower($extension);

        if ($extension === 'svg' || ! function_exists('imagecreatefromstring')) {
            return [$contents, $extension];
        }

        try {
            $source = @imagecreatefromstring($contents);
            if (! $source) {
                return [$contents, $extension];
            }

            $source = self::fixOrientation($source, $contents);

            $width = imagesx($source);
            $height = imagesy($source);
            $hasAlpha = self::hasTransparency($source, $width, $height);

            $profile = self::PROFILES[$folder] ?? ['max' => 1200, 'quality' => 82];
            $longestEdge = max($width, $height);

            if ($longestEdge > $profile['max']) {
                $ratio = $profile['max'] / $longestEdge;
                $newWidth = max(1, (int) round($width * $ratio));
                $newHeight = max(1, (int) round($height * $ratio));
            } else {
                $newWidth = $width;
                $newHeight = $height;
            }

            $resized = imagecreatetruecolor($newWidth, $newHeight);

            if ($hasAlpha) {
                imagealphablending($resized, false);
                imagesavealpha($resized, true);
                $transparent = imagecolorallocatealpha($resized, 0, 0, 0, 127);
                imagefilledrectangle($resized, 0, 0, $newWidth, $newHeight, $transparent);
            } else {
                $white = imagecolorallocate($resized, 255, 255, 255);
                imagefilledrectangle($resized, 0, 0, $newWidth, $newHeight, $white);
            }

            imagecopyresampled($resized, $source, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
            imagedestroy($source);

            ob_start();
            if ($hasAlpha) {
                imagepng($resized, null, 9);
                $finalExtension = 'png';
            } else {
                imageinterlace($resized, true);
                imagejpeg($resized, null, $profile['quality']);
                $finalExtension = 'jpg';
            }
            $optimized = ob_get_clean();
            imagedestroy($resized);

            // Bazı basit/az renkli PNG'lerde yeniden örnekleme (resample)
            // kenarlara yumuşatma katıp deflate sıkıştırmasını kötüleştirebiliyor
            // — sonuç orijinalden büyük çıkarsa optimize etmeden önceki hâline dön.
            if (strlen($optimized) >= strlen($contents)) {
                return [$contents, $extension];
            }

            return [$optimized, $finalExtension];
        } catch (\Throwable $e) {
            // Bozuk/desteklenmeyen bir görsel yüzünden admin işlemi tamamen
            // patlamasın diye — optimize edilemezse olduğu gibi kaydedilir.
            return [$contents, $extension];
        }
    }

    /**
     * JPEG EXIF orientation etiketine göre görseli doğru yöne çevirir
     * (telefonla çekilen fotoğrafların yan/ters kaydedilmesini önler).
     */
    private static function fixOrientation($image, string $contents)
    {
        if (! function_exists('exif_read_data')) {
            return $image;
        }

        $exif = @exif_read_data('data://image/jpeg;base64,'.base64_encode($contents), null, true);
        $orientation = $exif['IFD0']['Orientation'] ?? null;

        if (! $orientation || $orientation === 1) {
            return $image;
        }

        $rotated = match ($orientation) {
            3 => imagerotate($image, 180, 0),
            6 => imagerotate($image, -90, 0),
            8 => imagerotate($image, 90, 0),
            default => null,
        };

        if ($rotated) {
            imagedestroy($image);
            return $rotated;
        }

        return $image;
    }

    /**
     * Bir görselde gerçek şeffaflık olup olmadığını yaklaşık olarak (15x15'lik
     * bir ızgarada örnekleyerek) tespit eder — tüm pikselleri taramak yerine
     * performans/doğruluk dengesi gözetilmiş bir sezgisel yöntem.
     */
    private static function hasTransparency($image, int $width, int $height): bool
    {
        if (! imageistruecolor($image)) {
            return imagecolortransparent($image) >= 0;
        }

        $steps = 15;
        for ($i = 0; $i < $steps; $i++) {
            for ($j = 0; $j < $steps; $j++) {
                $x = (int) min($width - 1, round($i / ($steps - 1) * ($width - 1)));
                $y = (int) min($height - 1, round($j / ($steps - 1) * ($height - 1)));
                $rgba = imagecolorat($image, $x, $y);
                $alpha = ($rgba >> 24) & 0x7F;
                if ($alpha > 0) {
                    return true;
                }
            }
        }

        return false;
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
