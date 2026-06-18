<?php

namespace App\Services;

use App\Enums\JobStatus;
use App\Jobs\ExtractJobJob;
use App\Models\Job;

class JobService
{
    public function createJob(array $data, int $userId): Job
    {
        $job = Job::create([
            'user_id' => $userId,
            'url' => $data['url'],
            'title' => 'Processing...',
            'company' => 'Processing...',
            'description' => '',
            'status' => JobStatus::Pending,
        ]);

        ExtractJobJob::dispatch($job);

        return $job;
    }
}
