<?php

namespace App\Services;

class KeywordMatchingService
{
    public function calculate(array $resumeData, array $jobData): array
    {
        $jobKeywords = array_merge(
            $jobData['skills_required'] ?? [],
            $this->extractTextKeywords($jobData['responsibilities'] ?? ''),
            $this->extractTextKeywords($jobData['qualifications'] ?? '')
        );

        $resumeKeywords = array_merge(
            $resumeData['skills'] ?? [],
            $this->extractTextKeywords($resumeData['summary'] ?? ''),
            $this->extractTextKeywords($resumeData['work_experience'] ?? '')
        );

        $jobKeywordsNorm = array_unique(array_filter(array_map('strtolower', $jobKeywords)));
        $resumeKeywordsNorm = array_unique(array_filter(array_map('strtolower', $resumeKeywords)));

        $matched = [];
        $missing = [];

        foreach ($jobKeywordsNorm as $index => $kw) {
            if (in_array($kw, $resumeKeywordsNorm)) {
                $matched[] = $jobKeywords[$index] ?? $kw;
            } else {
                $missing[] = $jobKeywords[$index] ?? $kw;
            }
        }

        $total = count($jobKeywordsNorm);
        $coverage = $total > 0 ? (int) round((count($matched) / $total) * 100) : 0;

        return [
            'matched_keywords' => array_values(array_unique($matched)),
            'missing_keywords' => array_values(array_unique($missing)),
            'coverage_percentage' => $coverage,
        ];
    }

    private function extractTextKeywords(mixed $text): array
    {
        if (is_array($text)) {
            $text = json_encode($text);
        }
        preg_match_all('/\b[a-zA-Z]{4,}\b/', $text ?? '', $matches);
        return $matches[0] ?? [];
    }
}
