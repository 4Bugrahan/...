<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Support\Facades\Storage;

abstract class Controller
{
    /**
     * AppLayout'taki <Head> bileşenine gönderilecek seo prop'unu hazırlar.
     */
    protected function seoData(array $data): array
    {
        $ogPath  = Setting::getValue('seo_og_image', '');
        $ogImage = $ogPath
            ? (str_starts_with($ogPath, 'http') ? $ogPath : Storage::disk('public')->url($ogPath))
            : '';

        return array_merge([
            'title'    => '',
            'desc'     => '',
            'keywords' => '',
            'og_image' => $ogImage,
        ], $data);
    }

    /**
     * Admin > SEO panelinden yönetilen statik sayfa meta etiketleri (seo_{prefix}_title/desc/keywords).
     */
    protected function pageSeo(string $prefix, string $defTitle, string $defDesc, string $defKeywords = ''): array
    {
        $locale = app()->getLocale();

        return $this->seoData([
            'title'    => Setting::getValue("seo_{$prefix}_title",    $defTitle,    $locale) ?: $defTitle,
            'desc'     => Setting::getValue("seo_{$prefix}_desc",     $defDesc,     $locale) ?: $defDesc,
            'keywords' => Setting::getValue("seo_{$prefix}_keywords", $defKeywords, $locale) ?: $defKeywords,
        ]);
    }
}
