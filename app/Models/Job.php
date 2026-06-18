<?php

namespace App\Models;

use App\Enums\JobStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Job extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'status' => JobStatus::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function parsedJob(): HasOne
    {
        return $this->hasOne(ParsedJob::class);
    }

    public function analyses(): HasMany
    {
        return $this->hasMany(Analysis::class);
    }
}
