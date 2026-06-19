<?php

namespace App\Services;

class ATSScoringService
{
    public function calculate(array $resumeData, array $jobData, int $keywordCoverage): array
    {
        $skillsScore = $this->calculateSkillsScore($resumeData, $jobData);
        $experienceScore = $this->calculateExperienceScore($resumeData, $jobData);
        $educationScore = $this->calculateEducationScore($resumeData, $jobData);
        $keywordScore = (int) round(($keywordCoverage / 100) * 20);

        $total = $skillsScore + $experienceScore + $educationScore + $keywordScore;

        return [
            'total_score' => min(100, $total),
            'breakdown' => [
                'skills_score' => $skillsScore,
                'experience_score' => $experienceScore,
                'education_score' => $educationScore,
                'keyword_score' => $keywordScore,
            ]
        ];
    }

    private function calculateSkillsScore(array $resumeData, array $jobData): int
    {
        $reqSkills = $jobData['skills_required'] ?? [];
        $resSkills = $resumeData['skills'] ?? [];
        
        if (empty($reqSkills)) return 40;

        $matched = array_intersect(array_map('strtolower', $reqSkills), array_map('strtolower', $resSkills));
        return (int) round((count($matched) / count($reqSkills)) * 40);
    }

    private function calculateExperienceScore(array $resumeData, array $jobData): int
    {
        // Prototype heuristic
        return 22; 
    }

    private function calculateEducationScore(array $resumeData, array $jobData): int
    {
        // Prototype heuristic
        return 8; 
    }
}
