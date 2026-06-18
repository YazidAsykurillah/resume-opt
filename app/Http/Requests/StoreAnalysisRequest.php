<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnalysisRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'resume_id' => ['required', 'exists:resumes,id'],
            'job_id' => ['required', 'exists:jobs,id'],
        ];
    }
}
