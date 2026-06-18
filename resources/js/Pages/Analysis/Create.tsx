import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Create({ auth, resumes }: any) {
    const [selectedResumeId, setSelectedResumeId] = useState('');
    const [jobUrl, setJobUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [jobError, setJobError] = useState('');
    
    const [uploadedResumes, setUploadedResumes] = useState(resumes);
    const [extractedJobId, setExtractedJobId] = useState('');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadError('');
        
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(route('resumes.store'), formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' }
            });
            setUploadedResumes([response.data.resume, ...uploadedResumes]);
            setSelectedResumeId(response.data.resume.id);
        } catch (error: any) {
            setUploadError(error.response?.data?.message || 'Failed to upload resume');
        } finally {
            setIsUploading(false);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedResumeId) {
            setUploadError('Please select or upload a resume');
            return;
        }
        if (!jobUrl) {
            setJobError('Please enter a job URL');
            return;
        }

        setIsExtracting(true);
        setJobError('');

        try {
            // Step 1: Submit Job
            const jobResponse = await axios.post(route('jobs.store'), { url: jobUrl }, {
                headers: { 'Accept': 'application/json' }
            });
            const jobId = jobResponse.data.job.id;

            setIsExtracting(false);
            setIsSubmitting(true);

            // Step 2: Create Analysis
            window.location.href = route('analyses.store'); // This won't work correctly with post. We need to use Inertia form.
            
            // Let's just use axios and then inertia visit
        } catch (error: any) {
            setIsExtracting(false);
            setJobError(error.response?.data?.message || 'Failed to extract job');
        }
    };

    // Correct Inertia Submission
    const { data, setData, post, processing } = useForm({
        resume_id: '',
        job_id: ''
    });

    const submitAll = async () => {
        if (!selectedResumeId) {
            setUploadError('Please select or upload a resume');
            return;
        }
        if (!jobUrl) {
            setJobError('Please enter a job URL');
            return;
        }

        setIsExtracting(true);
        setJobError('');

        try {
            const jobResponse = await axios.post(route('jobs.store'), { url: jobUrl }, {
                headers: { 'Accept': 'application/json' }
            });
            
            const jobId = jobResponse.data.job.id;
            
            // Now submit the final analysis form via Inertia
            setData({
                resume_id: selectedResumeId,
                job_id: jobId
            });
            
            // Wait for state update then submit
            setTimeout(() => {
                const form = document.getElementById('analysis-form') as HTMLFormElement;
                form.requestSubmit();
            }, 100);

        } catch (error: any) {
            setIsExtracting(false);
            setJobError(error.response?.data?.message || 'Failed to process job URL');
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Analysis</h2>}
        >
            <Head title="New Analysis" />

            <div className="py-12 bg-[#F5F3FF] min-h-screen font-['Plus_Jakarta_Sans']">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white/80 backdrop-blur-lg shadow-xl sm:rounded-2xl border border-white p-8">
                        
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-[#1E1B4B]">Start Analysis</h1>
                            <p className="text-indigo-900/60 mt-3 text-lg">Match your candidate profile against a target job</p>
                        </div>

                        <div className="space-y-8">
                            {/* Step 1: Resume */}
                            <div className="p-6 bg-white rounded-xl shadow-sm border border-indigo-50">
                                <h3 className="text-xl font-bold text-[#1E1B4B] mb-4 flex items-center">
                                    <span className="bg-indigo-100 text-[#6366F1] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                                    Candidate Profile
                                </h3>
                                
                                <div className="space-y-4">
                                    <select 
                                        className="w-full border-gray-200 rounded-lg shadow-sm focus:ring-[#6366F1] focus:border-[#6366F1]"
                                        value={selectedResumeId}
                                        onChange={(e) => setSelectedResumeId(e.target.value)}
                                    >
                                        <option value="">Select an existing resume...</option>
                                        {uploadedResumes.map((r: any) => (
                                            <option key={r.id} value={r.id}>{r.original_name}</option>
                                        ))}
                                    </select>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="bg-white px-2 text-sm text-gray-500">OR</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Resume (PDF/DOCX)</label>
                                        <input 
                                            type="file" 
                                            accept=".pdf,.docx"
                                            onChange={handleFileUpload}
                                            disabled={isUploading}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#6366F1] hover:file:bg-indigo-100 cursor-pointer"
                                        />
                                        {isUploading && <p className="text-sm text-[#6366F1] mt-2 animate-pulse">Uploading and preparing...</p>}
                                        {uploadError && <p className="text-sm text-red-500 mt-2">{uploadError}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Job */}
                            <div className="p-6 bg-white rounded-xl shadow-sm border border-indigo-50">
                                <h3 className="text-xl font-bold text-[#1E1B4B] mb-4 flex items-center">
                                    <span className="bg-indigo-100 text-[#6366F1] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                                    Target Job Posting
                                </h3>
                                
                                <div>
                                    <input 
                                        type="url" 
                                        placeholder="Paste public job URL (LinkedIn, Indeed, etc.)"
                                        className="w-full border-gray-200 rounded-lg shadow-sm focus:ring-[#6366F1] focus:border-[#6366F1] py-3"
                                        value={jobUrl}
                                        onChange={(e) => setJobUrl(e.target.value)}
                                        disabled={isExtracting || processing}
                                    />
                                    {jobError && <p className="text-sm text-red-500 mt-2">{jobError}</p>}
                                </div>
                            </div>

                            {/* Hidden Form for submission */}
                            <form id="analysis-form" onSubmit={(e) => { e.preventDefault(); post(route('analyses.store')); }}>
                            </form>

                            <button 
                                onClick={submitAll} 
                                disabled={isExtracting || processing || isUploading || (!selectedResumeId && !jobUrl)}
                                className="w-full py-4 bg-[#10B981] disabled:bg-emerald-300 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-200 text-lg flex justify-center items-center"
                            >
                                {isExtracting || processing ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Processing Request...
                                    </span>
                                ) : 'Analyze Match'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
