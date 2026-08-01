<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DeepLService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TranslateController extends Controller
{
    private const TARGET_LOCALES = ['en', 'fr', 'de', 'nl'];

    public function translate(Request $request, DeepLService $deepl): array
    {
        $data = $request->validate([
            'text' => ['required', 'string'],
        ]);

        $result = [];
        $failed = [];
        foreach (self::TARGET_LOCALES as $locale) {
            try {
                $translated = $deepl->translate([$data['text']], $locale, 'tr');
                $result[$locale] = $translated[0] ?? '';
            } catch (\Throwable $e) {
                Log::warning("DeepL translate failed for locale {$locale}", ['error' => $e->getMessage()]);
                $failed[] = $locale;
            }
        }

        return ['translations' => $result, 'failed' => $failed];
    }

    public function translateBatch(Request $request, DeepLService $deepl): array
    {
        $data = $request->validate([
            'fields' => ['required', 'array'],
            'fields.*' => ['nullable', 'string'],
        ]);

        $fields = array_filter($data['fields'], fn ($v) => filled($v));
        if (empty($fields)) {
            return ['translations' => [], 'failed' => []];
        }

        $keys = array_keys($fields);
        $texts = array_values($fields);

        $result = [];
        $failed = [];
        foreach (self::TARGET_LOCALES as $locale) {
            try {
                $translated = $deepl->translate($texts, $locale, 'tr');
                if (count($translated) !== count($keys)) {
                    throw new \RuntimeException('DeepL returned '.count($translated)." item(s), expected ".count($keys));
                }
                $result[$locale] = array_combine($keys, $translated);
            } catch (\Throwable $e) {
                Log::warning("DeepL translate-batch failed for locale {$locale}", ['error' => $e->getMessage()]);
                $failed[] = $locale;
            }
        }

        return ['translations' => $result, 'failed' => $failed];
    }
}
