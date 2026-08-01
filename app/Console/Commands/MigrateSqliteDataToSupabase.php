<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * ONE-OFF MIGRATION UTILITY — copies existing rows from the local
 * database/database.sqlite file into the active `pgsql` connection
 * (Supabase). Safe to delete once the Supabase migration is verified
 * in production; never auto-invoked.
 */
class MigrateSqliteDataToSupabase extends Command
{
    protected $signature = 'db:migrate-to-supabase {--dry-run}';

    protected $description = 'Copy rows from database/database.sqlite into the Supabase pgsql connection';

    /** @var array<string, array{base: string[], en: array<string,string>}> */
    private array $tables = [
        'settings' => [
            'base' => ['id', 'key', 'value', 'created_at', 'updated_at'],
            'en' => ['value' => 'value_en'],
        ],
        'partners' => [
            'base' => ['id', 'name', 'logo', 'website', 'order', 'is_active', 'created_at', 'updated_at'],
            'en' => ['name' => 'name_en'],
        ],
        'projects' => [
            'base' => ['id', 'title', 'slug', 'description', 'images', 'location', 'is_active', 'created_at', 'updated_at'],
            'en' => ['title' => 'title_en', 'description' => 'description_en', 'location' => 'location_en'],
        ],
        'sliders' => [
            'base' => ['id', 'subtitle', 'title', 'description', 'image', 'btn1_text', 'btn1_url', 'btn2_text', 'btn2_url', 'order', 'is_active', 'created_at', 'updated_at'],
            'en' => ['subtitle' => 'subtitle_en', 'title' => 'title_en', 'description' => 'description_en', 'btn1_text' => 'btn1_text_en', 'btn2_text' => 'btn2_text_en'],
        ],
        'categories' => [
            'base' => ['id', 'name', 'slug', 'parent_id', 'image', 'description', 'order', 'is_active', 'created_at', 'updated_at'],
            'en' => ['name' => 'name_en', 'description' => 'description_en'],
        ],
        'products' => [
            'base' => ['id', 'name', 'slug', 'description', 'category_id', 'images', 'featured', 'is_active', 'order', 'created_at', 'updated_at'],
            'en' => ['name' => 'name_en', 'description' => 'description_en'],
        ],
        'contacts' => [
            'base' => ['id', 'name', 'email', 'phone', 'message', 'read_at', 'created_at', 'updated_at'],
            'en' => [],
        ],
        'users' => [
            'base' => ['id', 'name', 'email', 'email_verified_at', 'password', 'remember_token', 'created_at', 'updated_at'],
            'en' => [],
        ],
    ];

    private const BOOL_COLUMNS = ['is_active', 'featured'];

    public function handle(): int
    {
        $dryRun = (bool) $this->option('dry-run');

        foreach ($this->tables as $table => $config) {
            $rows = DB::connection('sqlite')->table($table)->get();
            $this->info("{$table}: {$rows->count()} row(s)".($dryRun ? ' (dry-run, not writing)' : ''));

            if ($dryRun || $rows->isEmpty()) {
                continue;
            }

            $insertRows = [];
            foreach ($rows as $row) {
                $insertRows[] = $this->buildRow($row, $config['base'], $config['en']);
            }

            // categories has a self-referencing parent_id FK — insert with
            // parent_id nulled first, then backfill in a second pass.
            if ($table === 'categories') {
                $parentMap = [];
                foreach ($insertRows as &$r) {
                    $parentMap[$r['id']] = $r['parent_id'];
                    $r['parent_id'] = null;
                }
                unset($r);

                DB::connection('pgsql')->table($table)->insert($insertRows);

                foreach ($parentMap as $id => $parentId) {
                    if ($parentId !== null) {
                        DB::connection('pgsql')->table($table)->where('id', $id)->update(['parent_id' => $parentId]);
                    }
                }
            } else {
                DB::connection('pgsql')->table($table)->insert($insertRows);
            }

            DB::connection('pgsql')->statement(
                "SELECT setval(pg_get_serial_sequence('{$table}', 'id'), (SELECT COALESCE(MAX(id), 1) FROM {$table}))"
            );

            $this->info("  -> inserted into pgsql, sequence reset");
        }

        $this->info($dryRun ? 'Dry run complete.' : 'Migration complete.');

        return self::SUCCESS;
    }

    private function buildRow(object $row, array $baseColumns, array $enMap): array
    {
        $row = (array) $row;
        $out = [];

        foreach ($baseColumns as $col) {
            $value = $row[$col] ?? null;
            if (in_array($col, self::BOOL_COLUMNS, true)) {
                $value = (bool) $value;
            }
            $out[$col] = $value;
        }

        if (! empty($enMap)) {
            $translations = [];
            foreach ($enMap as $baseField => $enColumn) {
                if (! empty($row[$enColumn])) {
                    $translations[$baseField] = ['en' => $row[$enColumn]];
                }
            }
            $out['translations'] = empty($translations) ? null : json_encode($translations);
        }

        return $out;
    }
}
