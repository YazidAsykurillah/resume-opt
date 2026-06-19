<?php

$analysis = \App\Models\Analysis::find(5);
if ($analysis) {
    $analysis->update(['status' => \App\Enums\AnalysisStatus::Pending ?? 'pending', 'error_message' => null]);
    \App\Jobs\RunAnalysisJob::dispatch($analysis);
    echo "Successfully dispatched RunAnalysisJob for Analysis ID 5.\n";
} else {
    echo "Error: Analysis with ID 5 was not found.\n";
}
