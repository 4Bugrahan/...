<?php

namespace App\Providers;

use App\Filesystem\SupabaseS3Adapter;
use Illuminate\Filesystem\FilesystemAdapter as LaravelFilesystemAdapter;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use League\Flysystem\Filesystem;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Storage::extend('supabase-s3', function ($app, $config) {
            $adapter = new SupabaseS3Adapter(
                $config['endpoint'],
                $config['bucket'],
                $config['key'],
                $config['secret'],
                $config['region'],
                $config['url'] ?? null,
            );

            return new LaravelFilesystemAdapter(new Filesystem($adapter), $adapter, $config);
        });
    }
}
