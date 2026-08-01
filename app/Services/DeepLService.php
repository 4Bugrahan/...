<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class DeepLService
{
    private string $endpoint;

    public function __construct()
    {
        $this->endpoint = config('services.deepl.free', true)
            ? 'https://api-free.deepl.com/v2/translate'
            : 'https://api.deepl.com/v2/translate';
    }

    /**
     * @param  string[]  $texts
     * @return string[] translated texts, same order as input
     */
    public function translate(array $texts, string $targetLang, string $sourceLang = 'EN'): array
    {
        if (empty($texts)) {
            return [];
        }

        $key = config('services.deepl.key');
        if (empty($key)) {
            throw new RuntimeException('DEEPL_API_KEY is not configured.');
        }

        $response = Http::withHeaders([
            'Authorization' => "DeepL-Auth-Key {$key}",
        ])->post($this->endpoint, [
            'text' => array_values($texts),
            'target_lang' => strtoupper($targetLang),
            'source_lang' => strtoupper($sourceLang),
        ]);

        if ($response->failed()) {
            throw new RuntimeException('DeepL API error: '.$response->status().' '.$response->body());
        }

        return collect($response->json('translations', []))
            ->pluck('text')
            ->all();
    }
}
