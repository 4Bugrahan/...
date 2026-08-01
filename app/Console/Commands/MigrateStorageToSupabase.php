<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

/**
 * ONE-OFF MIGRATION UTILITY — uploads every file under storage/app/public
 * to the Supabase S3-compatible bucket (the 's3' disk), preserving the
 * exact relative path so no DB values need rewriting. Safe to delete
 * once verified in production; never auto-invoked.
 */
class MigrateStorageToSupabase extends Command
{
    protected $signature = 'storage:migrate-to-supabase {--dry-run}';

    protected $description = 'Upload storage/app/public files to the Supabase Storage bucket';

    public function handle(): int
    {
        $dryRun = (bool) $this->option('dry-run');

        $local = Storage::build([
            'driver' => 'local',
            'root' => storage_path('app/public'),
        ]);
        $remote = Storage::disk('s3');

        $files = $local->allFiles();
        $this->info(count($files).' file(s) found locally.');

        $uploaded = 0;
        $skipped = 0;
        $failed = [];
        $bar = $this->output->createProgressBar(count($files));
        $bar->start();

        foreach ($files as $path) {
            if (! $dryRun) {
                try {
                    if ($remote->exists($path) && $remote->size($path) === $local->size($path)) {
                        $skipped++;
                    } else {
                        $remote->put($path, $local->get($path));
                        $uploaded++;
                    }
                } catch (\Throwable $e) {
                    $failed[] = $path;
                }
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();

        if ($dryRun) {
            $this->info('Dry run — nothing uploaded.');
        } else {
            $this->info("Uploaded: {$uploaded}, already present (skipped): {$skipped}, failed: ".count($failed));
            foreach ($failed as $path) {
                $this->warn("  FAILED: {$path}");
            }
        }

        return self::SUCCESS;
    }
}
