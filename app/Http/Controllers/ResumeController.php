<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResumeRequest;
use App\Models\Resume;
use App\Services\ResumeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ResumeController extends Controller
{
    use AuthorizesRequests;

    public function __construct(private ResumeService $resumeService) {}

    public function index(Request $request)
    {
        $resumes = Resume::where('user_id', $request->user()->id)
            ->latest()
            ->paginate();

        return Inertia::render('Resume/Index', [
            'resumes' => $resumes,
        ]);
    }

    public function show(Resume $resume)
    {
        $this->authorize('view', $resume);

        $resume->load('parsed');

        return Inertia::render('Resume/Show', [
            'resume' => $resume,
        ]);
    }

    public function store(StoreResumeRequest $request)
    {
        $resume = $this->resumeService->uploadResume(
            $request->file('file'),
            $request->user()->id
        );

        if ($request->wantsJson()) {
            return response()->json(['resume' => $resume]);
        }

        return redirect()->back();
    }

    public function destroy(Resume $resume)
    {
        $this->authorize('delete', $resume);
        $resume->delete();
        
        return redirect()->route('resumes.index');
    }
}
