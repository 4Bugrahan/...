<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\Contact;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $locale = app()->getLocale();

        $translations = file_exists(resource_path("lang/{$locale}.php"))
            ? require resource_path("lang/{$locale}.php")
            : require resource_path('lang/tr.php');

        $navCategories = Cache::remember("nav_categories_{$locale}", 3600, function () use ($locale) {
            return Category::active()
                ->whereNull('parent_id')
                ->ordered()
                ->get(['id', 'name', 'translations', 'slug'])
                ->map(fn ($cat) => [
                    'name' => $cat->getTranslated('name', $locale),
                    'slug' => $cat->slug,
                ]);
        });

        // SEO — mevcut rotaya göre doğru ayarları seç
        $routeName  = $request->route()?->getName() ?? '';
        $seoPageMap = [
            'home'              => 'home',
            'products.index'    => 'products',
            'products.category' => 'products',
            'products.show'     => 'products',
            'projects.index'    => 'projects',
            'about'             => 'about',
            'contact.index'     => 'contact',
            'kvkk'              => 'kvkk',
        ];
        $seoPage = $seoPageMap[$routeName] ?? 'home';

        $ogImagePath = Setting::getValue('seo_og_image', '');
        $ogImageUrl  = $ogImagePath
            ? (str_starts_with($ogImagePath, 'http') ? $ogImagePath : Storage::disk('public')->url($ogImagePath))
            : '';

        $seo = [
            'title'    => Setting::getValue("seo_{$seoPage}_title",    '', $locale),
            'desc'     => Setting::getValue("seo_{$seoPage}_desc",     '', $locale),
            'keywords' => Setting::getValue("seo_{$seoPage}_keywords", '', $locale),
            'og_image' => $ogImageUrl,
        ];

        $siteSettings = Cache::remember("site_settings_{$locale}", 3600, function () use ($locale) {
            return [
                'site_name'   => Setting::getValue('site_name',  '4B Grup Endüstriyel Ticaret'),
                'phone1'      => Setting::getValue('phone1',     '+90 346 225 00 00'),
                'phone2'      => Setting::getValue('phone2',     '+90 535 660 00 60'),
                'email'       => Setting::getValue('email',      'info@4bgrup.com'),
                'whatsapp'    => Setting::getValue('whatsapp',   '905356600060'),
                'address'     => Setting::getValue('address',    'Sivas, Türkiye', $locale),
                'footer_text' => Setting::getValue('footer_text', '', $locale),
                'facebook'    => Setting::getValue('facebook',  'https://www.facebook.com/4bgrup/?locale=tr_TR'),
                'instagram'   => Setting::getValue('instagram', ''),
                'linkedin'    => Setting::getValue('linkedin',  ''),
            ];
        });

        $unreadContacts = fn () => auth()->check() ? Contact::whereNull('read_at')->count() : 0;

        return [
            ...parent::share($request),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
            ],
            'locale'        => $locale,
            't'             => $translations,
            'navCategories' => $navCategories,
            'seo'            => $seo,
            'siteSettings'   => $siteSettings,
            'unreadContacts' => $unreadContacts,
            'auth'           => ['user' => $request->user()],
        ];
    }
}
