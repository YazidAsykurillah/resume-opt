<?php

namespace App\Services;

use App\Enums\AnalysisStatus;
use App\Models\Analysis;

class AnalysisService
{
    public function createAnalysis(int $resumeId, int $jobId, int $userId): Analysis
    {
        return Analysis::create([
            'user_id' => $userId,
            'resume_id' => $resumeId,
            'job_id' => $jobId,
            'status' => AnalysisStatus::Pending,
        ]);
    }
}
