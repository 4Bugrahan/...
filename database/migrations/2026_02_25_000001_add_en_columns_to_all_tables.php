<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
            $table->text('description_en')->nullable()->after('description');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
            $table->text('description_en')->nullable()->after('description');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
            $table->text('description_en')->nullable()->after('description');
            $table->string('location_en')->nullable()->after('location');
        });

        Schema::table('sliders', function (Blueprint $table) {
            $table->string('subtitle_en')->nullable()->after('subtitle');
            $table->string('title_en')->nullable()->after('title');
            $table->text('description_en')->nullable()->after('description');
            $table->string('btn1_text_en')->nullable()->after('btn1_text');
            $table->string('btn2_text_en')->nullable()->after('btn2_text');
        });

        Schema::table('partners', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
        });

        Schema::table('settings', function (Blueprint $table) {
            $table->text('value_en')->nullable()->after('value');
        });
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'description_en']);
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'description_en']);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'description_en', 'location_en']);
        });

        Schema::table('sliders', function (Blueprint $table) {
            $table->dropColumn(['subtitle_en', 'title_en', 'description_en', 'btn1_text_en', 'btn2_text_en']);
        });

        Schema::table('partners', function (Blueprint $table) {
            $table->dropColumn(['name_en']);
        });

        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn(['value_en']);
        });
    }
};
