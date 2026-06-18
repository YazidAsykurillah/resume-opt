<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobRequest;
use App\Models\Job;
use App\Services\JobService;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class JobController extends Controller
{
    use AuthorizesRequests;

    public function __construct(private JobService $jobService) {}

    public function store(StoreJobRequest $request)
    {
        $job = $this->jobService->createJob(
            $request->validated(),
            $request->user()->id
        );

        if ($request->wantsJson()) {
            return response()->json(['job' => $job]);
        }

        return redirect()->back();
    }

    public function destroy(Job $job)
    {
        $this->authorize('delete', $job);
        $job->delete();

        return redirect()->back();
    }
}
