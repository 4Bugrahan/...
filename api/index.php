<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

register_shutdown_function(function () {
    $err = error_get_last();
    if ($err && in_array($err['type'], [E_ERROR, E_CORE_ERROR, E_COMPILE_ERROR, E_PARSE])) {
        if (!headers_sent()) {
            header('Content-Type: text/plain; charset=utf-8', true, 500);
        }
        echo "FATAL: {$err['message']} in {$err['file']}:{$err['line']}\n";
    }
});

set_exception_handler(function ($e) {
    if (!headers_sent()) {
        header('Content-Type: text/plain; charset=utf-8', true, 500);
    }
    echo "EXCEPTION: " . get_class($e) . ": " . $e->getMessage() . "\n";
    echo "FILE: " . $e->getFile() . ":" . $e->getLine() . "\n\n";
    echo $e->getTraceAsString();
});

// Vercel bazen sıcak (warm) lambda ortamlarını farklı deploy'lar arasında yeniden
// kullanabiliyor; /tmp önceki deploy'dan kalma derlenmiş view/cache içerebilir.
// Deploy içeriğinin hash'ini bir işaret dosyasıyla takip edip eşleşmezse /tmp'i temizle.
$deployMarker = @md5_file(__DIR__ . '/index.php') . @md5_file(__DIR__ . '/../resources/views/app.blade.php');
$markerFile   = '/tmp/.deploy_marker';
if (!file_exists($markerFile) || file_get_contents($markerFile) !== $deployMarker) {
    $rm = function ($path) use (&$rm) {
        if (!file_exists($path)) return;
        if (is_dir($path) && !is_link($path)) {
            foreach (scandir($path) as $item) {
                if ($item === '.' || $item === '..') continue;
                $rm($path . '/' . $item);
            }
            @rmdir($path);
        } else {
            @unlink($path);
        }
    };
    $rm('/tmp/database.sqlite');
    $rm('/tmp/storage');
    $rm('/tmp/bootstrap');
    if (function_exists('opcache_reset')) {
        opcache_reset();
    }
    file_put_contents($markerFile, $deployMarker);
}

$dbPath = __DIR__ . '/../database/database.sqlite';
$tmpDbPath = '/tmp/database.sqlite';

if (file_exists($dbPath) && !file_exists($tmpDbPath)) {
    copy($dbPath, $tmpDbPath);
}

$dirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
    '/tmp/bootstrap/cache',
];
foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
}
$_ENV['APP_STORAGE'] = '/tmp/storage';
putenv('APP_STORAGE=/tmp/storage');
$_ENV['VIEW_COMPILED_PATH'] = '/tmp/storage/framework/views';
putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');

require __DIR__ . '/../public/index.php';
