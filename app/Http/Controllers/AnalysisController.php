<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnalysisRequest;
use App\Models\Analysis;
use App\Models\Resume;
use App\Services\AnalysisService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Jobs\RunAnalysisJob;

class AnalysisController extends Controller
{
    public function __construct(private AnalysisService $analysisService) {}

    public function index(Request $request)
    {
        $analyses = Analysis::where('user_id', $request->user()->id)
            ->with(['resume', 'job'])
            ->latest()
            ->paginate();

        return Inertia::render('Analysis/Index', [
            'analyses' => $analyses,
        ]);
    }

    public function create(Request $request)
    {
        $resumes = Resume::where('user_id', $request->user()->id)->get();
        return Inertia::render('Analysis/Create', [
            'resumes' => $resumes,
        ]);
    }

    public function store(StoreAnalysisRequest $request)
    {
        $analysis = $this->analysisService->createAnalysis(
            $request->validated('resume_id'),
            $request->validated('job_id'),
            $request->user()->id
        );

        return redirect()->route('analyses.show', $analysis->id);
    }

    public function show(Analysis $analysis)
    {
        Gate::authorize('view', $analysis);

        return Inertia::render('Analysis/Show', [
            'analysis' => $analysis->load(['job.parsedJob', 'resume.parsedResume', 'result'])
        ]);
    }

    public function retry(Analysis $analysis)
    {
        Gate::authorize('update', $analysis);

        if ($analysis->status->value !== 'processing') {
            $analysis->update(['status' => \App\Enums\AnalysisStatus::Pending, 'error_message' => null]);
            RunAnalysisJob::dispatch($analysis);
        }

        return back()->with('success', 'Analysis job has been dispatched.');
    }
}
