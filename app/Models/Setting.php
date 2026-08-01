<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;

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
            static::$requestCache = static::all()->keyBy('key');
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
