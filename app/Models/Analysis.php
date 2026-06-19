<?php

namespace App\Models;

use App\Enums\AnalysisStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Analysis extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'status' => AnalysisStatus::class,
            'analysis_data' => 'array',
            'ats_score' => 'integer',
            'job_match_score' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function resume(): BelongsTo
    {
        return $this->belongsTo(Resume::class);
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    public function analysisUsages(): HasMany
    {
        return $this->hasMany(AnalysisUsage::class);
    }

    public function result(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(AnalysisResult::class);
    }
}
