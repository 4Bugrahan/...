<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    use HasTranslations;

    protected $fillable = [
        'key',
        'value',
        'translations',
    ];

    protected $casts = [
        'translations' => 'array',
    ];

    private static ?object $requestCache = null;

    public static function getValue(string $key, mixed $default = null, ?string $locale = null): mixed
    {
        $locale = $locale ?? app()->getLocale();

        if (static::$requestCache === null) {
            // İstek-içi statik önbellek + 1 saatlik paylaşımlı önbellek: aynı
            // istek boyunca tekrar tekrar okunsa da yalnızca bir sorgu çalışır,
            // ayrıca sonraki isteklerde de veritabanına gitmeye gerek kalmaz.
            static::$requestCache = Cache::remember('settings_all', 3600, fn () => static::all()->keyBy('key'));
        }

        $setting = static::$requestCache->get($key);

        if ($setting === null) {
            return $default;
        }

        if ($locale !== 'tr') {
            $translated = $setting->getTranslated('value', $locale);
            if (!empty($translated)) {
                return $translated;
            }
        }

        return $setting->value ?? $default;
    }

    public static function clearCache(): void
    {
        static::$requestCache = null;
        Cache::forget('settings_all');
    }

    public static function setValue(string $key, mixed $value): static
    {
        $result = static::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
        static::clearCache();
        return $result;
    }
}
