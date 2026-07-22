<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetLocale
{
    public function handle(Request $request, Closure $next): mixed
    {
        $locale = $request->cookie('locale');

        if (!in_array($locale, ['tr', 'en'])) {
            $locale = 'tr';
        }

        app()->setLocale($locale);

        return $next($request);
    }
}
