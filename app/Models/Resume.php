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

    protected $appends = ['file_name', 'original_name', 'size', 'mime_type'];

    public function getFileNameAttribute()
    {
        return $this->attributes['filename'] ?? null;
    }

    public function getOriginalNameAttribute()
    {
        return $this->attributes['original_filename'] ?? null;
    }

    public function getSizeAttribute()
    {
        return $this->attributes['file_size'] ?? null;
    }

    public function getMimeTypeAttribute()
    {
        $filename = $this->attributes['filename'] ?? '';
        return str_ends_with(strtolower($filename), '.pdf') ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }

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
