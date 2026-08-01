<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->trustProxies(at: '*');
        $middleware->web(append: [
            \App\Http\Middleware\SecurityHeaders::class,
            \App\Http\Middleware\SetLocale::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
        $middleware->redirectGuestsTo('/admin/login');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (\Symfony\Component\HttpFoundation\Response $response, \Throwable $exception, \Illuminate\Http\Request $request) {
            $status = $response->getStatusCode();

            if (! app()->environment(['local', 'testing']) && in_array($status, [403, 404, 500, 503])) {
                // Exceptions thrown early (e.g. route-model-binding 404 from
                // SubstituteBindings, or no route matched at all) happen before
                // HandleInertiaRequests's middleware ever runs, so the usual
                // shared props (locale/translations) are missing. Backfill the
                // minimum needed to render the Error page in the right language.
                if (! \Inertia\Inertia::getShared('locale')) {
                    $locale = $request->cookie('locale');
                    if (! in_array($locale, ['tr', 'en', 'fr', 'de', 'nl'])) {
                        $locale = 'tr';
                    }
                    app()->setLocale($locale);
                    $translations = file_exists(resource_path("lang/{$locale}.php"))
                        ? require resource_path("lang/{$locale}.php")
                        : require resource_path('lang/tr.php');
                    \Inertia\Inertia::share(['locale' => $locale, 't' => $translations]);
                }

                return \Inertia\Inertia::render('Error', ['status' => $status])
                    ->toResponse($request)
                    ->setStatusCode($status);
            }

            if ($status === 419) {
                return back()->with('error', 'Oturum süresi doldu, lütfen tekrar deneyin.');
            }

            return $response;
        });
    })->create();

if (isset($_ENV['APP_STORAGE'])) {
    $app->useStoragePath($_ENV['APP_STORAGE']);
}

return $app;
