<?php

namespace App\Jobs;

use App\Models\Resume;
use App\Services\ResumeParsingService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ParseResumeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public Resume $resume) {}

    public function handle(ResumeParsingService $service): void
    {
        $service->process($this->resume);
    }
}
