<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TranslationService
{
    private string $apiKey;
    private string $model = 'claude-sonnet-4-20250514';

    public function __construct()
    {
        $this->apiKey = config('services.anthropic.key', '');
    }

    /**
     * Tek bir metni Türkçe'den İngilizce'ye çevir.
     */
    public function translate(string $text): ?string
    {
        if (empty($text) || empty($this->apiKey)) {
            return null;
        }

        try {
            $response = Http::withHeaders([
                'x-api-key'         => $this->apiKey,
                'anthropic-version' => '2023-06-01',
                'content-type'      => 'application/json',
            ])->timeout(30)->post('https://api.anthropic.com/v1/messages', [
                'model'      => $this->model,
                'max_tokens' => 2048,
                'system'     => 'You are a professional translator. Translate the given Turkish text to English. '
                    . 'Context: Industrial kitchen equipment and commercial catering industry. '
                    . 'Keep the same tone and formatting. If the text contains HTML tags, preserve them. '
                    . 'Return ONLY the English translation, nothing else.',
                'messages'   => [
                    ['role' => 'user', 'content' => $text],
                ],
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['content'][0]['text'] ?? null;
            }

            Log::error('Anthropic API error', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);

            return null;
        } catch (\Throwable $e) {
            Log::error('Translation failed', ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Birden fazla metni toplu çevir (tek API çağrısı).
     *
     * @param  array<string, string>  $texts  ['key' => 'Turkish text', ...]
     * @return array<string, string>          ['key' => 'English text', ...]
     */
    public function translateBatch(array $texts): array
    {
        if (empty($texts) || empty($this->apiKey)) {
            return [];
        }

        // Boş olanları filtrele
        $texts = array_filter($texts, fn($t) => !empty(trim($t)));
        if (empty($texts)) {
            return [];
        }

        // JSON formatında gönder, parse et
        $prompt = "Translate each of the following Turkish texts to English. Return a JSON object with the same keys.\n\n";
        $prompt .= json_encode($texts, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        try {
            $response = Http::withHeaders([
                'x-api-key'         => $this->apiKey,
                'anthropic-version' => '2023-06-01',
                'content-type'      => 'application/json',
            ])->timeout(60)->post('https://api.anthropic.com/v1/messages', [
                'model'      => $this->model,
                'max_tokens' => 4096,
                'system'     => 'You are a professional translator. Translate Turkish texts to English. '
                    . 'Context: Industrial kitchen equipment and commercial catering industry. '
                    . 'Keep the same tone and formatting. Preserve HTML tags if present. '
                    . 'Return ONLY a valid JSON object with the same keys, values translated to English.',
                'messages'   => [
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $content = $data['content'][0]['text'] ?? '';

                // JSON bloğunu ayıkla (```json ... ``` veya düz JSON)
                if (preg_match('/```(?:json)?\s*([\s\S]*?)```/', $content, $m)) {
                    $content = $m[1];
                }

                $result = json_decode(trim($content), true);
                return is_array($result) ? $result : [];
            }

            Log::error('Anthropic API batch error', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);

            return [];
        } catch (\Throwable $e) {
            Log::error('Batch translation failed', ['error' => $e->getMessage()]);
            return [];
        }
    }

    /**
     * API anahtarının geçerli olup olmadığını kontrol et.
     */
    public function isConfigured(): bool
    {
        return !empty($this->apiKey);
    }
}
