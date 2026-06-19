<?php

namespace App\Services;

class JobMatchService
{
    private LLMService $llm;

    public function __construct(LLMService $llm)
    {
        $this->llm = $llm;
    }

    public function calculate(int $atsScore, array $resumeData, array $jobData): int
    {
        $prompt = "You are an expert semantic analyzer. Compare the resume summary and work experience against the job responsibilities and return a semantic similarity score from 0 to 100. Return ONLY valid JSON adhering to this schema: {\"similarity\": 85}\n\nResume: " . json_encode($resumeData) . "\nJob: " . json_encode($jobData);
        
        $response = $this->llm->generateJSON($prompt);
        $similarity = 50; // default

        if ($response) {
            $jsonStr = $response['candidates'][0]['content']['parts'][0]['text'] ?? '{}';
            $jsonStr = str_replace(['```json', '```'], '', $jsonStr);
            $data = json_decode(trim($jsonStr), true);
            $similarity = $data['similarity'] ?? 50;
        }

        $jobMatchScore = ($atsScore * 0.7) + ($similarity * 0.3);

        return min(100, max(0, (int) round($jobMatchScore)));
    }
}
