<?php

namespace App\Services;

use App\Models\Analysis;
use App\DTOs\AnalysisResultDTO;

class AnalysisEngineService
{
    public function __construct(
        private ATSScoringService $atsEngine,
        private KeywordMatchingService $keywordEngine,
        private SkillsGapService $skillsEngine,
        private JobMatchService $jobMatchEngine,
        private InsightGenerationService $insightEngine
    ) {}

    public function run(Analysis $analysis): void
    {
        try {
            $analysis->update(['status' => 'processing', 'error_message' => null]);

            $resumeData = $analysis->resume->parsedResume->json_data ?? [];
            $jobData = $analysis->job->parsedJob->json_data ?? [];

            // 1. Keyword Matching
            $keywordResult = $this->keywordEngine->calculate($resumeData, $jobData);

            // 2. ATS Scoring
            $atsResult = $this->atsEngine->calculate($resumeData, $jobData, $keywordResult['coverage_percentage']);

            // 3. Skills Gap
            $skillsResult = $this->skillsEngine->calculate($resumeData['skills'] ?? [], $jobData['skills_required'] ?? []);

            // 4. Job Match
            $jobMatchScore = $this->jobMatchEngine->calculate($atsResult['total_score'], $resumeData, $jobData);

            // 5. Insight Generation
            $insightResult = $this->insightEngine->generate(
                $resumeData,
                $jobData,
                $atsResult['total_score'],
                $atsResult['breakdown'],
                $skillsResult['missing_skills']
            );

            // 6. Build DTO
            $dto = new AnalysisResultDTO(
                $atsResult['total_score'],
                $atsResult['breakdown'],
                $jobMatchScore,
                $keywordResult['coverage_percentage'],
                $keywordResult['matched_keywords'],
                $keywordResult['missing_keywords'],
                $skillsResult['missing_skills'],
                $insightResult['strengths'],
                $insightResult['weaknesses'],
                $insightResult['recommendations']
            );

            // 7. Save Result
            $analysis->result()->updateOrCreate(
                ['analysis_id' => $analysis->id],
                $dto->toArray()
            );

            $analysis->update([
                'status' => 'completed',
                'ats_score' => $atsResult['total_score'],
                'job_match_score' => $jobMatchScore,
            ]);

        } catch (\Exception $e) {
            $analysis->update([
                'status' => 'failed',
                'error_message' => $e->getMessage()
            ]);
            throw $e;
        }
    }
}
