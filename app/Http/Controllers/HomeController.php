<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use App\Models\Product;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Slider;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $locale = app()->getLocale();

        $sliders = Slider::active()->ordered()->get()->map(function ($slider) {
            if ($slider->image && !str_starts_with($slider->image, 'http')) {
                $slider->image = Storage::disk('public')->url($slider->image);
            }
            return $slider;
        });

        $categories = $this->topLevelCategoriesWithCounts()->take(6)->values();

        $featuredProducts = Product::active()
            ->featured()
            ->with('category')
            ->ordered()
            ->take(8)
            ->get();

        $partners = Partner::active()->ordered()->get(['id', 'name', 'translations', 'logo', 'website', 'order']);

        $recentProjects = Project::where('is_active', true)->latest()->take(3)->get();

        // Hakkımızda görseli — relative URL (aynı siteden yüklensin); yoksa placeholder
        $imagePath = Setting::getValue('home_about_image', null);
        if (is_array($imagePath)) {
            $imagePath = $imagePath[0] ?? null;
        }
        $aboutImage = null;
        if ($imagePath && is_string($imagePath)) {
            $aboutImage = str_starts_with($imagePath, 'http')
                ? $imagePath
                : Storage::disk('public')->url(ltrim($imagePath, '/'));
        }
        if (empty($aboutImage)) {
            $aboutImage = '/images/katalog-kapak.png';
        }

        $pageContent = [
            /* Hakkımızda */
            'about_label'   => Setting::getValue('home_about_label',  'Hakkımızda',   $locale),
            'about_title'   => Setting::getValue('home_about_title',  '',             $locale),
            'about_text1'   => Setting::getValue('home_about_text1',  '',             $locale),
            'about_text2'   => Setting::getValue('home_about_text2',  '',             $locale),
            'about_image'   => $aboutImage,
            'about_bullet1' => Setting::getValue('home_about_bullet1', '',            $locale),
            'about_bullet2' => Setting::getValue('home_about_bullet2', '',            $locale),
            'about_bullet3' => Setting::getValue('home_about_bullet3', '',            $locale),
            'about_bullet4' => Setting::getValue('home_about_bullet4', '',            $locale),
            'about_btn'     => Setting::getValue('home_about_btn',    '',             $locale),

            /* Kategoriler */
            'cats_label'    => Setting::getValue('home_cats_label',   '',             $locale),
            'cats_title'    => Setting::getValue('home_cats_title',   '',             $locale),
            'cats_sub'      => Setting::getValue('home_cats_sub',     '',             $locale),
            'cats_btn'      => Setting::getValue('home_cats_btn',     '',             $locale),

            /* Son Projeler */
            'projects_label' => Setting::getValue('home_projects_label', '',          $locale),
            'projects_title' => Setting::getValue('home_projects_title', '',          $locale),
            'projects_btn'   => Setting::getValue('home_projects_btn',   '',          $locale),

            /* Markalar */
            'partners_label' => Setting::getValue('home_partners_label', '',          $locale),
            'partners_title' => Setting::getValue('home_partners_title', '',          $locale),
            'partners_btn'   => Setting::getValue('home_partners_btn',   '',          $locale),

            /* CTA */
            'cta_label'     => Setting::getValue('home_cta_label',    '',             $locale),
            'cta_title'     => Setting::getValue('home_cta_title',    '',             $locale),
        ];

        return Inertia::render('Home', [
            'sliders'          => $sliders,
            'categories'       => $categories,
            'featuredProducts' => $featuredProducts,
            'recentProjects'   => $recentProjects,
            'partners'         => $partners,
            'pageContent'      => $pageContent,
            'seo'              => $this->pageSeo(
                'home',
                '4B Grup | Endüstriyel Mutfak Ekipmanları Üreticisi - Sivas',
                '4B Grup; pişirme grupları, bulaşıkhane ekipmanları, soğuk muhafaza üniteleri ve paslanmaz çelik mutfak ekipmanları üretir. Otel, restoran ve kurumsal mutfaklara anahtar teslim çözümler.',
                'endüstriyel mutfak ekipmanları, paslanmaz çelik mutfak ekipmanları, otel mutfak ekipmanları, 4b grup, sivas'
            ),
        ]);
    }
}
