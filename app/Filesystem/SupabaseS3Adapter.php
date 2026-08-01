<?php

namespace App\Filesystem;

use Illuminate\Support\Facades\Http;
use League\Flysystem\Config;
use League\Flysystem\FileAttributes;
use League\Flysystem\FilesystemAdapter;
use League\Flysystem\UnableToCheckExistence;
use League\Flysystem\UnableToCopyFile;
use League\Flysystem\UnableToCreateDirectory;
use League\Flysystem\UnableToDeleteDirectory;
use League\Flysystem\UnableToDeleteFile;
use League\Flysystem\UnableToMoveFile;
use League\Flysystem\UnableToReadFile;
use League\Flysystem\UnableToRetrieveMetadata;
use League\Flysystem\UnableToSetVisibility;
use League\Flysystem\UnableToWriteFile;

/**
 * Minimal S3-compatible Flysystem adapter (write/read/delete/exists/size only —
 * everything this app actually uses) implemented with plain HTTP + a hand-rolled
 * SigV4 signer, instead of the full aws/aws-sdk-php package. That package ships
 * ~3,500 files (API definitions for every AWS service) which is too large for the
 * vercel-php serverless runtime to package — deploys failed with the runtime's own
 * launcher file missing from the build output once aws-sdk-php was added.
 */
class SupabaseS3Adapter implements FilesystemAdapter
{
    private S3SignatureV4 $signer;

    private string $host;

    private string $basePath;

    public function __construct(
        private string $endpoint,
        private string $bucket,
        string $accessKeyId,
        string $secretAccessKey,
        string $region,
        private ?string $publicUrl = null,
    ) {
        $this->signer = new S3SignatureV4($accessKeyId, $secretAccessKey, $region);
        $this->host = parse_url($endpoint, PHP_URL_HOST);
        // The endpoint itself may include a path prefix (Supabase's S3 gateway is
        // at .../storage/v1/s3) — that prefix must be part of the signed canonical
        // URI too, since it's part of the actual HTTP request path.
        $this->basePath = rtrim(parse_url($endpoint, PHP_URL_PATH) ?: '', '/');
    }

    private function objectPath(string $path): string
    {
        return $this->basePath.'/'.trim($this->bucket, '/').'/'.ltrim($path, '/');
    }

    private function request(string $method, string $path, string $body = '', array $extraHeaders = []): \Illuminate\Http\Client\Response
    {
        $objectPath = $this->objectPath($path);
        $headers = $this->signer->sign($method, $this->host, $objectPath, $body);
        $scheme = parse_url($this->endpoint, PHP_URL_SCHEME);

        return Http::withHeaders(array_merge($extraHeaders, $headers))
            ->withBody($body, $extraHeaders['Content-Type'] ?? 'application/octet-stream')
            ->send($method, "{$scheme}://{$this->host}{$objectPath}");
    }

    public function fileExists(string $path): bool
    {
        try {
            $response = $this->request('HEAD', $path);

            return $response->successful();
        } catch (\Throwable $e) {
            throw UnableToCheckExistence::forLocation($path, $e);
        }
    }

    public function directoryExists(string $path): bool
    {
        return false;
    }

    public function write(string $path, string $contents, Config $config): void
    {
        try {
            $response = $this->request('PUT', $path, $contents, [
                'Content-Type' => $config->get('mimetype', 'application/octet-stream'),
            ]);

            if (! $response->successful()) {
                throw new \RuntimeException("HTTP {$response->status()}: {$response->body()}");
            }
        } catch (\Throwable $e) {
            throw UnableToWriteFile::atLocation($path, $e->getMessage(), $e);
        }
    }

    public function writeStream(string $path, $contents, Config $config): void
    {
        $this->write($path, stream_get_contents($contents), $config);
    }

    public function read(string $path): string
    {
        try {
            $response = $this->request('GET', $path);
            if (! $response->successful()) {
                throw new \RuntimeException("HTTP {$response->status()}");
            }

            return $response->body();
        } catch (\Throwable $e) {
            throw UnableToReadFile::fromLocation($path, $e->getMessage(), $e);
        }
    }

    public function readStream(string $path)
    {
        $stream = fopen('php://temp', 'r+');
        fwrite($stream, $this->read($path));
        rewind($stream);

        return $stream;
    }

    public function delete(string $path): void
    {
        try {
            $response = $this->request('DELETE', $path);
            if (! $response->successful() && $response->status() !== 404) {
                throw new \RuntimeException("HTTP {$response->status()}: {$response->body()}");
            }
        } catch (\Throwable $e) {
            throw UnableToDeleteFile::atLocation($path, $e->getMessage(), $e);
        }
    }

    public function deleteDirectory(string $path): void
    {
        throw UnableToDeleteDirectory::atLocation($path, 'Directory operations are not supported.');
    }

    public function createDirectory(string $path, Config $config): void
    {
        throw UnableToCreateDirectory::dueToFailure($path, new \RuntimeException('Directory operations are not supported.'));
    }

    public function setVisibility(string $path, string $visibility): void
    {
        throw UnableToSetVisibility::atLocation($path, 'Visibility is not supported; the bucket is public.');
    }

    public function visibility(string $path): FileAttributes
    {
        return new FileAttributes($path, null, 'public');
    }

    public function mimeType(string $path): FileAttributes
    {
        throw UnableToRetrieveMetadata::mimeType($path, 'Not supported.');
    }

    public function lastModified(string $path): FileAttributes
    {
        throw UnableToRetrieveMetadata::lastModified($path, 'Not supported.');
    }

    public function fileSize(string $path): FileAttributes
    {
        try {
            $response = $this->request('HEAD', $path);
            if (! $response->successful()) {
                throw new \RuntimeException("HTTP {$response->status()}");
            }

            $size = (int) $response->header('Content-Length');

            return new FileAttributes($path, $size);
        } catch (\Throwable $e) {
            throw UnableToRetrieveMetadata::fileSize($path, $e->getMessage(), $e);
        }
    }

    public function listContents(string $path, bool $deep): iterable
    {
        return [];
    }

    public function move(string $source, string $destination, Config $config): void
    {
        throw UnableToMoveFile::fromLocationTo($source, $destination);
    }

    public function copy(string $source, string $destination, Config $config): void
    {
        throw UnableToCopyFile::fromLocationTo($source, $destination);
    }

    public function getUrl(string $path): string
    {
        $base = $this->publicUrl ?? $this->endpoint;

        return rtrim($base, '/').'/'.ltrim($path, '/');
    }
}
