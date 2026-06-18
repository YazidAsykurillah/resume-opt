<?php

namespace App\Jobs;

use App\Models\Job as JobModel;
use App\Services\JobExtractionService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ExtractJobJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public JobModel $targetJob) {}

    public function handle(JobExtractionService $service): void
    {
        $service->process($this->targetJob);
    }
}
