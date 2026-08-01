<?php

namespace App\Console\Commands;

use App\Services\DeepLService;
use Illuminate\Console\Command;

/**
 * One-off/rerunnable utility: translates resources/lang/{source}.php into
 * target locale files via DeepL, preserving the exact key structure
 * (including nested arrays like kvkk.s2_list).
 */
class TranslateLangFiles extends Command
{
    protected $signature = 'lang:translate {--source=en} {--targets=fr,de,nl}';

    protected $description = 'Translate resources/lang/{source}.php into target locale files via DeepL';

    public function handle(DeepLService $deepl): int
    {
        $source = $this->option('source');
        $targets = array_map('trim', explode(',', $this->option('targets')));

        $sourcePath = resource_path("lang/{$source}.php");
        if (! file_exists($sourcePath)) {
            $this->error("Source lang file not found: {$sourcePath}");

            return self::FAILURE;
        }

        $data = require $sourcePath;

        $flat = [];
        $this->flatten($data, '', $flat);

        foreach ($targets as $target) {
            $this->info("Translating {$source} -> {$target} (".count($flat)." strings)...");

            $translatedMap = [];
            foreach (array_chunk($flat, 50, true) as $chunk) {
                $chunkKeys = array_keys($chunk);
                $chunkTranslated = $deepl->translate(array_values($chunk), $target, $source);
                $translatedMap += array_combine($chunkKeys, $chunkTranslated);
            }

            $rebuilt = $this->unflatten($data, '', $translatedMap);
            $export = var_export($rebuilt, true);
            file_put_contents(resource_path("lang/{$target}.php"), "<?php\n\nreturn {$export};\n");

            $this->info("Wrote resources/lang/{$target}.php");
        }

        return self::SUCCESS;
    }

    private function flatten(array $data, string $prefix, array &$out): void
    {
        foreach ($data as $key => $value) {
            $path = $prefix === '' ? (string) $key : $prefix.'|'.$key;
            if (is_array($value)) {
                $this->flatten($value, $path, $out);
            } else {
                $out[$path] = (string) $value;
            }
        }
    }

    private function unflatten(array $data, string $prefix, array $translatedMap): array
    {
        $result = [];
        foreach ($data as $key => $value) {
            $path = $prefix === '' ? (string) $key : $prefix.'|'.$key;
            $result[$key] = is_array($value)
                ? $this->unflatten($value, $path, $translatedMap)
                : ($translatedMap[$path] ?? $value);
        }

        return $result;
    }
}
