<?php

use App\Models\User;
use App\Models\Resume;
use App\Models\Job;
use App\Models\ParsedResume;
use App\Models\ParsedJob;
use App\Services\AnalysisService;
use Illuminate\Support\Str;

$user = User::first();
if (!$user) {
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'password' => bcrypt('password')
    ]);
}

$resume = Resume::create([
    'user_id' => $user->id,
    'filename' => 'test_' . time() . '.pdf',
    'original_filename' => 'resume.pdf',
    'status' => \App\Enums\ResumeStatus::Parsed ?? 'parsed',
    'file_path' => 'resumes/test.pdf',
    'file_hash' => Str::random(40),
    'file_size' => 1024,
    'uploaded_at' => now(),
]);

ParsedResume::create([
    'resume_id' => $resume->id,
    'parsed_at' => now(),
    'json_data' => [
        'skills' => ['PHP', 'Laravel', 'React', 'Docker'],
        'summary' => 'Experienced software engineer with a strong background in web development.',
        'work_experience' => 'Built scalable web apps using Laravel and React.'
    ]
]);

$job = Job::create([
    'user_id' => $user->id,
    'title' => 'Senior Backend Developer',
    'company' => 'Tech Corp',
    'description' => 'Job description',
    'status' => 'completed',
]);

ParsedJob::create([
    'job_id' => $job->id,
    'parsed_at' => now(),
    'json_data' => [
        'skills_required' => ['PHP', 'Laravel', 'Docker', 'AWS'],
        'responsibilities' => 'Develop and maintain backend services.',
        'qualifications' => '5 years of experience in PHP.'
    ]
]);

$service = app(AnalysisService::class);
$analysis = $service->createAnalysis($resume->id, $job->id, $user->id);

echo "Analysis created with ID: " . $analysis->id . "\n";
echo "You can check the dashboard or go directly to /analyses/" . $analysis->id . "\n";
exit;
