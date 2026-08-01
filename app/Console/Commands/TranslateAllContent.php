<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Partner;
use App\Models\Product;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Slider;
use App\Services\DeepLService;
use Illuminate\Console\Command;

/**
 * ONE-OFF UTILITY — bulk-translates every translatable DB row (Products,
 * Categories, Projects, Sliders, Partners, Settings) that's missing en/fr/de/nl
 * content, via DeepL. Safe to re-run: already-translated fields are skipped.
 */
class TranslateAllContent extends Command
{
    protected $signature = 'content:translate-all {--locales=en,fr,de,nl} {--dry-run}';

    protected $description = 'Bulk-translate all site content (products, categories, projects, sliders, partners, settings) to the given locales via DeepL';

    private const SETTING_EXCLUDE = [
        'site_name', 'phone1', 'phone2', 'email', 'whatsapp', 'address',
        'facebook', 'instagram', 'linkedin', 'home_about_image',
    ];

    public function handle(DeepLService $deepl): int
    {
        $locales = array_map('trim', explode(',', $this->option('locales')));
        $dryRun = (bool) $this->option('dry-run');

        $jobs = [
            [Category::class, ['name', 'description']],
            [Product::class, ['name', 'description']],
            [Project::class, ['title', 'description', 'location']],
            [Slider::class, ['subtitle', 'title', 'description', 'btn1_text', 'btn2_text']],
            [Partner::class, ['name']],
        ];

        foreach ($jobs as [$modelClass, $fields]) {
            $this->translateModel($modelClass, $fields, $locales, $deepl, $dryRun);
        }

        $this->translateSettings($locales, $deepl, $dryRun);

        $this->info('Done.');

        return self::SUCCESS;
    }

    private function translateModel(string $modelClass, array $fields, array $locales, DeepLService $deepl, bool $dryRun): void
    {
        $rows = $modelClass::all();
        $this->info(class_basename($modelClass).": {$rows->count()} row(s)");

        foreach ($locales as $locale) {
            // Gather missing (rowId, field) -> text for this locale across all rows.
            $toTranslate = [];
            foreach ($rows as $row) {
                foreach ($fields as $field) {
                    $source = $row->getAttributes()[$field] ?? null;
                    if (! filled($source)) {
                        continue;
                    }
                    if (blank($row->translations[$field][$locale] ?? null)) {
                        $toTranslate["{$row->id}:{$field}"] = $source;
                    }
                }
            }

            if (empty($toTranslate)) {
                continue;
            }

            $this->line("  -> {$locale}: ".count($toTranslate).' field(s) to translate');

            if ($dryRun) {
                continue;
            }

            $translatedMap = [];
            foreach (array_chunk($toTranslate, 50, true) as $chunk) {
                $keys = array_keys($chunk);
                $translated = $deepl->translate(array_values($chunk), $locale, 'tr');
                $translatedMap += array_combine($keys, $translated);
            }

            $byRow = [];
            foreach ($translatedMap as $key => $value) {
                [$rowId, $field] = explode(':', $key, 2);
                $byRow[$rowId][$field] = $value;
            }

            foreach ($byRow as $rowId => $fieldValues) {
                $row = $rows->firstWhere('id', (int) $rowId);
                foreach ($fieldValues as $field => $value) {
                    $row->setTranslation($field, $locale, $value);
                }
                $row->saveQuietly();
            }
        }
    }

    private function translateSettings(array $locales, DeepLService $deepl, bool $dryRun): void
    {
        $rows = Setting::query()->whereNotIn('key', self::SETTING_EXCLUDE)->get();
        $this->info("Setting: {$rows->count()} row(s)");

        foreach ($locales as $locale) {
            $toTranslate = [];
            foreach ($rows as $row) {
                $source = $row->getAttributes()['value'] ?? null;
                if (! filled($source)) {
                    continue;
                }
                if (blank($row->translations['value'][$locale] ?? null)) {
                    $toTranslate[(string) $row->id] = $source;
                }
            }

            if (empty($toTranslate)) {
                continue;
            }

            $this->line("  -> {$locale}: ".count($toTranslate).' setting(s) to translate');

            if ($dryRun) {
                continue;
            }

            $translatedMap = [];
            foreach (array_chunk($toTranslate, 50, true) as $chunk) {
                $keys = array_keys($chunk);
                $translated = $deepl->translate(array_values($chunk), $locale, 'tr');
                $translatedMap += array_combine($keys, $translated);
            }

            foreach ($translatedMap as $rowId => $value) {
                $row = $rows->firstWhere('id', (int) $rowId);
                $row->setTranslation('value', $locale, $value);
                $row->saveQuietly();
            }
        }

        Setting::clearCache();
    }
}
