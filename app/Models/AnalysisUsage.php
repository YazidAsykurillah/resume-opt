<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnalysisUsage extends Model
{
    protected $table = 'analysis_usage';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'token_usage' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function analysis(): BelongsTo
    {
        return $this->belongsTo(Analysis::class);
    }
}
