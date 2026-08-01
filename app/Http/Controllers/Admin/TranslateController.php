<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DeepLService;
use Illuminate\Http\Request;

class TranslateController extends Controller
{
    private const TARGET_LOCALES = ['en', 'fr', 'de', 'nl'];

    public function translate(Request $request, DeepLService $deepl): array
    {
        $data = $request->validate([
            'text' => ['required', 'string'],
        ]);

        $result = [];
        foreach (self::TARGET_LOCALES as $locale) {
            $translated = $deepl->translate([$data['text']], $locale, 'tr');
            $result[$locale] = $translated[0] ?? '';
        }

        return $result;
    }

    public function translateBatch(Request $request, DeepLService $deepl): array
    {
        $data = $request->validate([
            'fields' => ['required', 'array'],
            'fields.*' => ['nullable', 'string'],
        ]);

        $fields = array_filter($data['fields'], fn ($v) => filled($v));
        if (empty($fields)) {
            return [];
        }

        $keys = array_keys($fields);
        $texts = array_values($fields);

        $result = [];
        foreach (self::TARGET_LOCALES as $locale) {
            $translated = $deepl->translate($texts, $locale, 'tr');
            $result[$locale] = array_combine($keys, $translated);
        }

        return $result;
    }
}
