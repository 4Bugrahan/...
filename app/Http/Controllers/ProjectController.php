<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use App\Models\Project;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $locale = app()->getLocale();

        $projects = Project::active()->latest()->get();
        $partners = Partner::active()->ordered()->get(['id', 'name', 'translations', 'logo', 'website', 'order']);

        $pageContent = [
            'proj_hero_badge'  => Setting::getValue('proj_hero_badge',  'Referans Projeler', $locale),
            'proj_hero_title'  => Setting::getValue('proj_hero_title',  'Anahtar Teslim Endüstriyel Mutfak Projeleri', $locale),
            'proj_hero_desc'   => Setting::getValue('proj_hero_desc',   '', $locale),
            'proj_grid_label'  => Setting::getValue('proj_grid_label',  'Referans Projeler', $locale),
            'proj_grid_title'  => Setting::getValue('proj_grid_title',  'Proje Referanslarımız', $locale),
            'proj_grid_desc'   => Setting::getValue('proj_grid_desc',   '', $locale),
            'proj_cta_label'   => Setting::getValue('proj_cta_label',   'Proje Hizmetleri', $locale),
            'proj_cta_title'   => Setting::getValue('proj_cta_title',   'Projeniz İçin Profesyonel Keşif ve Teknik Danışmanlık', $locale),
            'proj_cta_desc'    => Setting::getValue('proj_cta_desc',    '', $locale),
        ];

        return Inertia::render('Projects/Index', [
            'projects'    => $projects,
            'partners'    => $partners,
            'pageContent' => $pageContent,
            'seo'         => $this->pageSeo(
                'projects',
                'Referans Projeler | 4B Grup Endüstriyel Mutfak Çözümleri',
                'Otel, restoran, hastane ve kurumsal mutfaklarda hayata geçirdiğimiz anahtar teslim endüstriyel mutfak projelerimizi keşfedin.',
                'endüstriyel mutfak projeleri, anahtar teslim mutfak, otel mutfak projesi, kurumsal mutfak çözümleri'
            ),
        ]);
    }
}
