<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use App\Models\Setting;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function about(): Response
    {
        $locale = app()->getLocale();

        $aboutKeys = [
            'about_hero_title', 'about_hero_desc',
            'about_profile_label', 'about_profile_title',
            'about_profile_text1', 'about_profile_text2', 'about_profile_text3',
            'about_profile_btn',
            'about_values_label', 'about_values_title',
            'about_val1_title', 'about_val1_desc',
            'about_val2_title', 'about_val2_desc',
            'about_val3_title', 'about_val3_desc',
            'about_val4_title', 'about_val4_desc',
            'about_cta_title', 'about_cta_desc',
        ];

        $pageContent = collect($aboutKeys)
            ->mapWithKeys(fn ($k) => [$k => Setting::getValue($k, '', $locale)])
            ->toArray();

        // Kurumsal profil görseli — relative path ise storage URL'ine çevir
        $imagePath = Setting::getValue('about_profile_image', null, 'tr');
        $pageContent['about_profile_image'] = $imagePath
            ? (str_starts_with($imagePath, 'http') ? $imagePath : Storage::disk('public')->url(ltrim($imagePath, '/')))
            : null;

        $seo = $this->pageSeo(
            'about',
            'Kurumsal | 4B Grup Endüstriyel Ticaret Hakkında',
            '4B Grup\'un hikayesi, değerleri ve endüstriyel mutfak ekipmanları sektöründeki tecrübesi hakkında bilgi alın.',
            '4b grup hakkında, endüstriyel mutfak firması, sivas mutfak ekipmanları üreticisi'
        );

        return Inertia::render('Pages/About', compact('pageContent', 'seo'));
    }

    public function kvkk(): Response
    {
        $locale = app()->getLocale();

        $pageContent = [
            'kvkk_hero_badge'  => Setting::getValue('kvkk_hero_badge',  'Yasal Bilgilendirme', $locale),
            'kvkk_hero_title'  => Setting::getValue('kvkk_hero_title',  'KVKK ve Gizlilik Politikası', $locale),
            'kvkk_hero_desc'   => Setting::getValue('kvkk_hero_desc',   '', $locale),
            'kvkk_updated_at'  => Setting::getValue('kvkk_updated_at',  'Son güncelleme: Ocak 2025', $locale),
        ];

        $seo = $this->pageSeo(
            'kvkk',
            'KVKK ve Gizlilik Politikası | 4B Grup',
            '4B Grup Endüstriyel Ticaret KVKK aydınlatma metni ve gizlilik politikası hakkında bilgi edinin.',
            'kvkk, gizlilik politikası, kişisel verilerin korunması'
        );

        return Inertia::render('Pages/Kvkk', compact('pageContent', 'seo'));
    }

    public function production(): Response
    {
        $seo = $this->pageSeo(
            'production',
            'Üretim Sürecimiz: Lazer Kesim ve İmalat | 4B Grup',
            '4B Grup üretim sürecimiz: lazer kesim, tasarım, imalat ve büküm aşamalarıyla kaliteli ve dayanıklı endüstriyel mutfak ekipmanları üretiyoruz.',
            '4b grup üretim, lazer kesim, büküm, imalat süreci, endüstriyel mutfak ekipmanı üretimi'
        );

        // Admin panelden (Üretim sayfası medyası) yüklenmişse onu, yoksa
        // varsayılan demo videoları kullan — bkz. Admin\ProductionController.
        $media = [];
        foreach (['laser' => 'production_laser_video', 'bend' => 'production_bend_video'] as $slot => $settingKey) {
            $media["{$slot}_video"] = \App\Http\Controllers\Admin\ProductionController::resolveUrl(Setting::getValue($settingKey, null, 'tr'));
        }

        $cards = [];
        foreach (['card1', 'card2', 'card3'] as $slot) {
            $cards[$slot] = \App\Http\Controllers\Admin\ProductionController::resolveUrl(Setting::getValue("production_{$slot}_image", null, 'tr'));
        }

        $gallery = [];
        foreach (range(1, 7) as $n) {
            $gallery[] = \App\Http\Controllers\Admin\ProductionController::resolveUrl(Setting::getValue("production_gallery{$n}_image", null, 'tr'));
        }

        return Inertia::render('Pages/Production', compact('seo', 'media', 'cards', 'gallery'));
    }

    public function references(): Response
    {
        $columns = ['id', 'name', 'translations', 'logo', 'website', 'order'];
        $partners = Partner::active()->type(Partner::TYPE_PARTNER)->ordered()->get($columns);
        $clients  = Partner::active()->type(Partner::TYPE_CLIENT)->ordered()->get($columns);

        $seo = $this->pageSeo(
            'references',
            'Referanslarımız | 4B Grup Endüstriyel Ticaret',
            '4B Grup olarak birlikte çalıştığımız iş ortakları ve referans müşterilerimiz.',
            '4b grup referanslar, iş ortakları, müşteri referansları'
        );

        return Inertia::render('Pages/References', ['partners' => $partners, 'clients' => $clients, 'seo' => $seo]);
    }
}
