<?php

namespace App\Services;

class InsightGenerationService
{
    private LLMService $llm;

    public function __construct(LLMService $llm)
    {
        $this->llm = $llm;
    }

    public function generate(array $resumeData, array $jobData, int $atsScore, array $atsBreakdown, array $missingSkills): array
    {
        $prompt = "You are an expert technical recruiter and ATS system. Analyze the following data and generate strengths, weaknesses, and recommendations for the candidate. Return ONLY valid JSON adhering to this schema:
{
  \"strengths\": [\"strength1\", ...],
  \"weaknesses\": [\"weakness1\", ...],
  \"recommendations\": [\"recommendation1\", ...]
}
Data:
ATS Score: $atsScore
ATS Breakdown: " . json_encode($atsBreakdown) . "
Missing Skills: " . json_encode($missingSkills) . "
Resume: " . json_encode($resumeData) . "
Job: " . json_encode($jobData);

        $response = $this->llm->generateJSON($prompt);

        if (!$response) {
            return [
                'strengths' => [],
                'weaknesses' => [],
                'recommendations' => [],
            ];
        }

        return [
            'strengths' => $response['strengths'] ?? [],
            'weaknesses' => $response['weaknesses'] ?? [],
            'recommendations' => $response['recommendations'] ?? [],
        ];
    }
}
