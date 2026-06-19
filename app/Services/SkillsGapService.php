<?php

namespace App\Services;

class SkillsGapService
{
    /**
     * Compare resume skills against job skills.
     */
    public function calculate(array $resumeSkills, array $jobSkills): array
    {
        // Normalize
        $resumeSkillsNorm = array_map('strtolower', $resumeSkills);
        $jobSkillsNorm = array_map('strtolower', $jobSkills);

        $missingSkills = [];
        foreach ($jobSkillsNorm as $index => $skill) {
            if (!in_array($skill, $resumeSkillsNorm)) {
                $missingSkills[] = $jobSkills[$index];
            }
        }

        return [
            'missing_skills' => array_values(array_unique($missingSkills)),
        ];
    }
}
