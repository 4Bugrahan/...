<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

        // Not: script-src ve style-src 'unsafe-inline' içeriyor çünkü sayfa
        // Ziggy route verisini inline <script> ile, bazı elementleri de inline
        // style attribute'üyle yüklüyor (nonce/hash tabanlı sıkılaştırma için
        // ayrı bir refaktör gerekir). Yine de object-src, base-uri ve
        // frame-ancestors kısıtlamaları gerçek koruma sağlıyor.
        $response->headers->set('Content-Security-Policy', implode('; ', [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https://oaruhqbjuqgcnocxiopt.supabase.co https://www.googletagmanager.com",
            "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
            "frame-src https://www.google.com",
            "object-src 'none'",
            "base-uri 'self'",
            "frame-ancestors 'self'",
        ]));

        return $response;
    }
}
