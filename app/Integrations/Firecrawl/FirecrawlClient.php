<?php

namespace App\Integrations\Firecrawl;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FirecrawlClient
{
    /**
     * Scrape a URL and return its markdown content.
     */
    public function scrape(string $url): ?string
    {
        $apiKey = config('services.firecrawl.key');
        
        if (!$apiKey) {
            Log::error('Firecrawl API Key is missing.');
            return null;
        }

        $response = Http::withToken($apiKey)
            ->post('https://api.firecrawl.dev/v1/scrape', [
                'url' => $url,
                'formats' => ['markdown'],
                'onlyMainContent' => true,
            ]);

        if ($response->failed()) {
            Log::error('Firecrawl API Error', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return null;
        }

        return $response->json('data.markdown');
    }
}
