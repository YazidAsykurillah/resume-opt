<?php

namespace App\Http\Requests;

use App\Enums\JobSource;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'url' => ['required', 'url'],
            'source' => ['nullable', new Enum(JobSource::class)],
        ];
    }
}
