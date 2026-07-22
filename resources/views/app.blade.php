<?php
use App\Models\Setting;
$locale  = app()->getLocale();
$altLocale = $locale === 'tr' ? 'en' : 'tr';
$defDesc = '4B Grup Endüstriyel Ticaret - Endüstriyel Mutfak Ekipmanları, Proje Danışmanlığı ve Satış Sonrası Destek';

// İlgili sayfanın controller'ından gelen 'seo' Inertia prop'u varsa onu kullan,
// yoksa anasayfa için tanımlı genel seo_* ayarlarına düş.
$pageSeo  = $page['props']['seo'] ?? [];
$seoDesc  = ($pageSeo['desc'] ?? null)     ?: (Setting::getValue('seo_home_desc',  $defDesc, $locale) ?: $defDesc);
$seoTitle = ($pageSeo['title'] ?? null)    ?: (Setting::getValue('seo_home_title', '4B Grup Endüstriyel Ticaret', $locale) ?: '4B Grup Endüstriyel Ticaret');
$seoKeywords = $pageSeo['keywords'] ?? '';
$ogPath   = Setting::getValue('seo_og_image', '');
$ogUrl    = ($pageSeo['og_image'] ?? null) ?: ($ogPath ? (str_starts_with($ogPath, 'http') ? $ogPath : \Illuminate\Support\Facades\Storage::disk('public')->url($ogPath)) : '');

$ga4Id          = Setting::getValue('ga4_id', '');
$gtmId          = Setting::getValue('gtm_id', '');
$gscVerification = Setting::getValue('gsc_verification', '');
$fbPixelId      = Setting::getValue('fb_pixel_id', '');
$canonicalUrl   = url()->current();
$siteUrl        = config('app.url');
?>
<!DOCTYPE html>
<html lang="{{ $locale }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="{{ $seoDesc }}" />
    @if($seoKeywords)<meta name="keywords" content="{{ $seoKeywords }}" />@endif
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#1B3163" />

    {{-- Favicon --}}
    @php $faviconPath = Setting::getValue('favicon', ''); @endphp
    @if($faviconPath)
        @php $faviconUrl = str_starts_with($faviconPath, 'http') ? $faviconPath : \Illuminate\Support\Facades\Storage::disk('public')->url($faviconPath); @endphp
        <link rel="icon" type="image/png" href="{{ $faviconUrl }}" />
        <link rel="apple-touch-icon" href="{{ $faviconUrl }}" />
    @else
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16.png?v=5" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32.png?v=5" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon/favicon-192.png?v=5" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=5" />
        <link rel="apple-touch-icon" href="/images/favicon/apple-touch-icon.png?v=5" />
    @endif

    {{-- Canonical & Hreflang --}}
    <link rel="canonical" href="{{ $canonicalUrl }}" />
    <link rel="alternate" hreflang="{{ $locale }}" href="{{ $canonicalUrl }}" />
    <link rel="alternate" hreflang="{{ $altLocale }}" href="{{ $canonicalUrl }}" />
    <link rel="alternate" hreflang="x-default" href="{{ $canonicalUrl }}" />

    {{-- Open Graph --}}
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="{{ $locale === 'tr' ? 'tr_TR' : 'en_US' }}" />
    <meta property="og:site_name" content="4B Grup Endüstriyel Ticaret" />
    <meta property="og:title" content="{{ $seoTitle }}" />
    <meta property="og:description" content="{{ $seoDesc }}" />
    <meta property="og:url" content="{{ $canonicalUrl }}" />
    @if($ogUrl)<meta property="og:image" content="{{ $ogUrl }}" />@endif

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ $seoTitle }}" />
    <meta name="twitter:description" content="{{ $seoDesc }}" />
    @if($ogUrl)<meta name="twitter:image" content="{{ $ogUrl }}" />@endif

    @if($gscVerification)<meta name="google-site-verification" content="{{ e($gscVerification) }}" />@endif
    <title>{{ $seoTitle }}</title>

    @if($ga4Id)
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ e($ga4Id) }}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '{{ e($ga4Id) }}');
    </script>
    @endif

    @if($gtmId)
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','{{ e($gtmId) }}');</script>
    @endif

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    {{-- JSON-LD Structured Data --}}
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@@type": "LocalBusiness",
      "@@id": "{{ $siteUrl }}/#organization",
      "name": "4B Grup Endüstriyel Ticaret",
      "description": "{{ e($seoDesc) }}",
      "url": "{{ $siteUrl }}",
      "logo": "{{ $siteUrl }}/images/logo.png",
      "image": "{{ $siteUrl }}/images/logo.png",
      "telephone": "{{ Setting::getValue('phone1', '+90 346 218 00 00') }}",
      "email": "{{ Setting::getValue('email', 'info@@4bgrup.com') }}",
      "address": {
        "@@type": "PostalAddress",
        "addressLocality": "Sivas",
        "addressCountry": "TR"
      },
      "geo": {
        "@@type": "GeoCoordinates",
        "latitude": 39.7477,
        "longitude": 37.0179
      },
      "openingHoursSpecification": {
        "@@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "08:30",
        "closes": "18:00"
      },
      "sameAs": [
        "{{ Setting::getValue('facebook', '') }}",
        "{{ Setting::getValue('instagram', '') }}",
        "{{ Setting::getValue('linkedin', '') }}"
      ],
      "priceRange": "$$"
    }
    </script>

    @routes
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @inertiaHead
</head>
<body class="antialiased">
    @if($gtmId)
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ e($gtmId) }}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    @endif

    @if($fbPixelId)
    <!-- Meta Pixel -->
    <script>
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '{{ e($fbPixelId) }}');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id={{ e($fbPixelId) }}&ev=PageView&noscript=1"/></noscript>
    @endif

    @inertia
</body>
</html>
