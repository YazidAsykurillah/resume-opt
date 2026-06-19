<?php

namespace App\Jobs;

use App\Models\Analysis;
use App\Services\AnalysisEngineService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class RunAnalysisJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Analysis $analysis
    ) {}

    public function handle(AnalysisEngineService $engine): void
    {
        try {
            $engine->run($this->analysis);
        } catch (\Exception $e) {
            Log::error("Analysis Job Failed", [
                'analysis_id' => $this->analysis->id,
                'error' => $e->getMessage()
            ]);
        }
    }
}
