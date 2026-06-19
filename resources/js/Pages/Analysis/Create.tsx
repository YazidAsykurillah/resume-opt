import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
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

            <div className="py-12 bg-[#F5F3FF] min-h-screen">
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
                                    <Listbox value={selectedResumeId} onChange={setSelectedResumeId}>
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-default rounded-xl bg-white py-3.5 pl-4 pr-10 text-left shadow-sm border border-gray-200 focus:outline-none focus-visible:border-[#6366F1] focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#6366F1] sm:text-sm transition-all duration-200 hover:border-indigo-300">
                                                <span className={`block truncate ${!selectedResumeId ? 'text-gray-400' : 'text-gray-900 font-medium'}`}>
                                                    {selectedResumeId 
                                                        ? uploadedResumes.find((r: any) => r.id == selectedResumeId)?.original_name 
                                                        : 'Select an existing resume...'}
                                                </span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                                        <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={React.Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-2 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                                                    {uploadedResumes.map((r: any) => (
                                                        <Listbox.Option
                                                            key={r.id}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-3 pl-10 pr-4 transition-colors ${
                                                                    active ? 'bg-indigo-50 text-[#6366F1]' : 'text-gray-900'
                                                                }`
                                                            }
                                                            value={r.id}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span className={`block truncate ${selected ? 'font-medium text-[#6366F1]' : 'font-normal'}`}>
                                                                        {r.original_name}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#6366F1]">
                                                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                    {uploadedResumes.length === 0 && (
                                                        <div className="py-3 px-4 text-gray-500 text-sm text-center">
                                                            No resumes found. Please upload one below.
                                                        </div>
                                                    )}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Listbox>

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
                                
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input 
                                        type="url" 
                                        placeholder="Paste public job URL (Indeed, JobStreet, etc.)"
                                        className="block w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 sm:text-sm transition-all duration-200 hover:border-indigo-300"
                                        value={jobUrl}
                                        onChange={(e) => setJobUrl(e.target.value)}
                                        disabled={isExtracting || processing}
                                    />
                                    {jobError && <p className="text-sm text-red-500 mt-2 flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>{jobError}</p>}
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
