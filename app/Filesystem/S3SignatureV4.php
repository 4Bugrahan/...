<?php

namespace App\Filesystem;

/**
 * Minimal AWS Signature Version 4 signer for simple S3-compatible PUT/GET/DELETE/HEAD
 * requests. Exists to avoid depending on the full aws/aws-sdk-php package (3000+ files,
 * ~55MB), which is too large for the vercel-php serverless runtime to package correctly.
 */
class S3SignatureV4
{
    public function __construct(
        private string $accessKeyId,
        private string $secretAccessKey,
        private string $region,
    ) {}

    /**
     * Only host/x-amz-content-sha256/x-amz-date are signed — SignedHeaders does not
     * need to cover every header actually sent (e.g. Content-Type is sent unsigned),
     * which keeps this immune to any header-normalization the HTTP client does.
     *
     * @return array<string, string> headers to send with the request
     */
    public function sign(string $method, string $host, string $path, string $body): array
    {
        $amzDate = gmdate('Ymd\THis\Z');
        $dateStamp = gmdate('Ymd');
        $payloadHash = hash('sha256', $body);

        $headers = [
            'host' => $host,
            'x-amz-content-sha256' => $payloadHash,
            'x-amz-date' => $amzDate,
        ];

        ksort($headers);
        $signedHeaders = implode(';', array_keys($headers));
        $canonicalHeaders = '';
        foreach ($headers as $key => $value) {
            $canonicalHeaders .= "{$key}:{$value}\n";
        }

        $canonicalUri = implode('/', array_map('rawurlencode', explode('/', $path)));
        $canonicalRequest = implode("\n", [
            $method,
            $canonicalUri,
            '',
            $canonicalHeaders,
            $signedHeaders,
            $payloadHash,
        ]);

        $credentialScope = "{$dateStamp}/{$this->region}/s3/aws4_request";
        $stringToSign = implode("\n", [
            'AWS4-HMAC-SHA256',
            $amzDate,
            $credentialScope,
            hash('sha256', $canonicalRequest),
        ]);

        $kSecret = 'AWS4'.$this->secretAccessKey;
        $kDate = hash_hmac('sha256', $dateStamp, $kSecret, true);
        $kRegion = hash_hmac('sha256', $this->region, $kDate, true);
        $kService = hash_hmac('sha256', 's3', $kRegion, true);
        $kSigning = hash_hmac('sha256', 'aws4_request', $kService, true);
        $signature = hash_hmac('sha256', $stringToSign, $kSigning);

        $authorization = "AWS4-HMAC-SHA256 Credential={$this->accessKeyId}/{$credentialScope}, SignedHeaders={$signedHeaders}, Signature={$signature}";

        return [
            'Authorization' => $authorization,
            'x-amz-content-sha256' => $payloadHash,
            'x-amz-date' => $amzDate,
        ];
    }
}
