<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LLMService
{
    /**
     * Generate structured JSON from text or a file.
     *
     * @param string $prompt
     * @param string|null $systemInstruction
     * @param array|null $inlineData e.g. ['mimeType' => 'application/pdf', 'data' => base64_encode($bytes)]
     * @return array|null
     */
    public function generateJSON(string $prompt, ?string $systemInstruction = null, ?array $inlineData = null): ?array
    {
        $key = config('services.gemini.key');
        $model = config('services.gemini.model', 'gemini-1.5-pro');

        $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$key}";

        $parts = [];

        if ($inlineData) {
            $parts[] = ['inlineData' => $inlineData];
        }

        $parts[] = ['text' => $prompt];

        $payload = [
            'contents' => [
                ['parts' => $parts]
            ],
            'generationConfig' => [
                'responseMimeType' => 'application/json',
            ],
        ];

        if ($systemInstruction) {
            $payload['systemInstruction'] = [
                'parts' => [['text' => $systemInstruction]]
            ];
        }

        $response = Http::post($url, $payload);

        if ($response->failed()) {
            Log::error('LLM API Error', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return null;
        }

        $content = $response->json('candidates.0.content.parts.0.text');

        if (!$content) {
            Log::error('LLM API Error: No content returned', ['response' => $response->json()]);
            return null;
        }

        // Clean up markdown block if Gemini included it
        $content = preg_replace('/```(?:json)?\s*(.*?)\s*```/s', '$1', $content);

        return json_decode(trim($content), true);
    }
}
