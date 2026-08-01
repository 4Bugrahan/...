<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Non-Turkish translations (en, fr, de, nl) are stored as a single JSON
        // column per table: {"field": {"en": "...", "fr": "...", ...}}.
        // Turkish stays in the original columns since it's the site's base locale.
        foreach (['categories', 'products', 'projects', 'sliders', 'partners', 'settings'] as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->json('translations')->nullable();
            });
        }
    }

    public function down(): void
    {
        foreach (['categories', 'products', 'projects', 'sliders', 'partners', 'settings'] as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropColumn('translations');
            });
        }
    }
};
