<?php

namespace App\Models;

use App\Enums\ResumeStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Resume extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'status' => ResumeStatus::class,
            'uploaded_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function parsedResume(): HasOne
    {
        return $this->hasOne(ParsedResume::class);
    }

    public function analyses(): HasMany
    {
        return $this->hasMany(Analysis::class);
    }
}
