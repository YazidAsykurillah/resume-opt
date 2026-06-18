<?php

use App\Services\LLMService;
use Illuminate\Support\Facades\Http;

it('generates json correctly', function () {
    Http::fake([
        'generativelanguage.googleapis.com/*' => Http::response([
            'candidates' => [
                [
                    'content' => [
                        'parts' => [
                            ['text' => '{"success": true}']
                        ]
                    ]
                ]
            ]
        ], 200)
    ]);

    $service = new LLMService();
    $result = $service->generateJSON('Test prompt');

    expect($result)->toBeArray();
    expect($result['success'])->toBeTrue();
});
