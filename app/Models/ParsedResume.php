<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParsedResume extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'json_data' => 'array',
            'parsed_at' => 'datetime',
        ];
    }

    public function resume(): BelongsTo
    {
        return $this->belongsTo(Resume::class);
    }
}
