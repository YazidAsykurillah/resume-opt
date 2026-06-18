<?php

namespace App\Services;

use App\Enums\ResumeStatus;
use App\Models\Resume;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use ZipArchive;
use Exception;

class ResumeParsingService
{
    public function __construct(private LLMService $llm) {}

    public function process(Resume $resume): void
    {
        $resume->update(['status' => ResumeStatus::Parsing]);

        try {
            $content = Storage::disk('local')->get($resume->file_path);
            
            if (!$content) {
                throw new Exception('File not found');
            }

            $prompt = "Extract the following information from the resume and return ONLY a valid JSON object matching this schema exactly:\n";
            $prompt .= "{\n";
            $prompt .= "  \"personal_information\": {\"name\": \"\", \"email\": \"\", \"phone\": \"\", \"location\": \"\"},\n";
            $prompt .= "  \"summary\": \"\",\n";
            $prompt .= "  \"skills\": [],\n";
            $prompt .= "  \"work_experience\": [],\n";
            $prompt .= "  \"education\": [],\n";
            $prompt .= "  \"certifications\": []\n";
            $prompt .= "}\n\n";

            $inlineData = null;
            $textContext = '';

            if ($resume->mime_type === 'application/pdf') {
                $inlineData = [
                    'mimeType' => 'application/pdf',
                    'data' => base64_encode($content),
                ];
                $prompt .= "Analyze the attached PDF resume.";
            } elseif (str_contains($resume->mime_type, 'wordprocessingml')) {
                // Extract text from DOCX
                $textContext = $this->extractTextFromDocx(Storage::disk('local')->path($resume->file_path));
                $prompt .= "Resume Text:\n" . $textContext;
            } else {
                throw new Exception('Unsupported file type');
            }

            $json = $this->llm->generateJSON(
                $prompt, 
                'You are an expert ATS system. Output ONLY valid JSON.', 
                $inlineData
            );

            if (!$json) {
                throw new Exception('Failed to generate structured data');
            }

            $resume->parsedResume()->create([
                'json_data' => $json,
                'parsed_at' => now(),
            ]);

            $resume->update(['status' => ResumeStatus::Parsed]);
        } catch (\Exception $e) {
            Log::error('Resume parsing failed: ' . $e->getMessage(), ['resume_id' => $resume->id, 'exception' => $e]);
            $resume->update(['status' => ResumeStatus::Failed]);
        }
    }

    private function extractTextFromDocx(string $filePath): string
    {
        $zip = new ZipArchive;
        if ($zip->open($filePath) === true) {
            $xml = $zip->getFromName('word/document.xml');
            $zip->close();
            if ($xml) {
                $xml = str_replace(['<w:p>', '<w:p '], "\n<w:p>", $xml);
                return strip_tags($xml);
            }
        }
        return '';
    }
}
