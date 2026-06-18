<?php

namespace App\Services;

use App\Enums\JobStatus;
use App\Integrations\Firecrawl\FirecrawlClient;
use App\Models\Job;
use Illuminate\Support\Facades\Log;

class JobExtractionService
{
    public function __construct(
        private FirecrawlClient $firecrawl,
        private LLMService $llm
    ) {}

    public function process(Job $job): void
    {
        $job->update(['status' => JobStatus::Processing]);

        // 1. Extract content via Firecrawl
        $markdownContent = $this->firecrawl->scrape($job->url);

        if (!$markdownContent) {
            $job->update(['status' => JobStatus::Failed]);
            Log::error('Failed to scrape job URL: ' . $job->url);
            return;
        }

        $job->update(['description' => $markdownContent]);

        // 2. Generate structured JSON via LLM
        $prompt = "Extract the following information from the job posting content below and return ONLY a valid JSON object matching this schema exactly:\n";
        $prompt .= "{\n";
        $prompt .= "  \"job_title\": \"\",\n";
        $prompt .= "  \"company\": \"\",\n";
        $prompt .= "  \"location\": \"\",\n";
        $prompt .= "  \"employment_type\": \"\",\n";
        $prompt .= "  \"skills_required\": [],\n";
        $prompt .= "  \"responsibilities\": [],\n";
        $prompt .= "  \"qualifications\": []\n";
        $prompt .= "}\n\n";
        $prompt .= "Job Posting Content:\n" . $markdownContent;

        $json = $this->llm->generateJSON($prompt, 'You are a precise data extraction assistant. Output ONLY valid JSON.');

        if (!$json || !isset($json['job_title'])) {
            $job->update(['status' => JobStatus::Failed]);
            return;
        }

        // 3. Store parsed data
        $job->parsedJob()->create([
            'json_data' => $json,
            'parsed_at' => now(),
        ]);

        $job->update([
            'title' => $json['job_title'] ?? 'Unknown Title',
            'company' => $json['company'] ?? 'Unknown Company',
            'status' => JobStatus::Completed,
        ]);
    }
}
