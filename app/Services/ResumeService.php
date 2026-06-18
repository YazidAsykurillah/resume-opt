<?php

namespace App\Services;

use App\Enums\ResumeStatus;
use App\Jobs\ParseResumeJob;
use App\Models\Resume;
use Illuminate\Http\UploadedFile;

class ResumeService
{
    public function uploadResume(UploadedFile $file, int $userId): Resume
    {
        $path = $file->store('resumes', 'local');

        $resume = Resume::create([
            'user_id' => $userId,
            'filename' => basename($path),
            'file_path' => $path,
            'original_filename' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'file_hash' => \Illuminate\Support\Str::uuid()->toString(),
            'uploaded_at' => now(),
            'status' => ResumeStatus::Uploaded,
        ]);

        ParseResumeJob::dispatch($resume);

        return $resume;
    }
}
