<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParsedJob extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'json_data' => 'array',
            'parsed_at' => 'datetime',
        ];
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }
}
