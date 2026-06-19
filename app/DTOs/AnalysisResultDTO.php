<?php

namespace App\DTOs;

class AnalysisResultDTO
{
    public int $atsScore;
    public array $atsBreakdown;
    public int $jobMatchScore;
    public int $keywordCoverage;
    public array $matchedKeywords;
    public array $missingKeywords;
    public array $missingSkills;
    public array $strengths;
    public array $weaknesses;
    public array $recommendations;

    public function __construct(
        int $atsScore,
        array $atsBreakdown,
        int $jobMatchScore,
        int $keywordCoverage,
        array $matchedKeywords,
        array $missingKeywords,
        array $missingSkills,
        array $strengths,
        array $weaknesses,
        array $recommendations
    ) {
        $this->atsScore = $atsScore;
        $this->atsBreakdown = $atsBreakdown;
        $this->jobMatchScore = $jobMatchScore;
        $this->keywordCoverage = $keywordCoverage;
        $this->matchedKeywords = $matchedKeywords;
        $this->missingKeywords = $missingKeywords;
        $this->missingSkills = $missingSkills;
        $this->strengths = $strengths;
        $this->weaknesses = $weaknesses;
        $this->recommendations = $recommendations;
    }

    public function toArray(): array
    {
        return [
            'ats_score' => $this->atsScore,
            'ats_breakdown' => $this->atsBreakdown,
            'job_match_score' => $this->jobMatchScore,
            'keyword_coverage' => $this->keywordCoverage,
            'matched_keywords' => $this->matchedKeywords,
            'missing_keywords' => $this->missingKeywords,
            'missing_skills' => $this->missingSkills,
            'strengths' => $this->strengths,
            'weaknesses' => $this->weaknesses,
            'recommendations' => $this->recommendations,
        ];
    }
}
