<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnalysisResult extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'ats_breakdown' => 'array',
            'matched_keywords' => 'array',
            'missing_keywords' => 'array',
            'missing_skills' => 'array',
            'strengths' => 'array',
            'weaknesses' => 'array',
            'recommendations' => 'array',
        ];
    }

    public function analysis(): BelongsTo
    {
        return $this->belongsTo(Analysis::class);
    }
}
