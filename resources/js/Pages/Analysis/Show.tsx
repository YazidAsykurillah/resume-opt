import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Show({ auth, analysis }: PageProps<{ analysis: any }>) {
    const isProcessing = analysis.status === 'processing' || analysis.status === 'pending';
    const hasFailed = analysis.status === 'failed';
    const result = analysis.result;

    const handleRetry = () => {
        router.post(route('analyses.retry', analysis.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-indigo-950 leading-tight">Analysis Report</h2>}
        >
            <Head title="Analysis Report" />

            <div className="py-12 bg-violet-50 min-h-screen font-sans">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Header / Actions */}
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-indigo-950">
                            Resume for <span className="text-indigo-600">{analysis.job?.title || 'Job'}</span>
                        </h3>
                        <div className="flex items-center gap-4">
                            {isProcessing && (
                                <span className="flex items-center text-indigo-600 bg-indigo-100 px-4 py-2 rounded-full font-semibold shadow-sm">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing Analysis...
                                </span>
                            )}
                            {(hasFailed || !isProcessing) && (
                                <button
                                    onClick={handleRetry}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-200 cursor-pointer"
                                >
                                    Retry Analysis
                                </button>
                            )}
                        </div>
                    </div>

                    {hasFailed && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm">
                            <p className="font-bold">Analysis Failed</p>
                            <p>{analysis.error_message || 'An unknown error occurred during analysis.'}</p>
                        </div>
                    )}

                    {!isProcessing && !hasFailed && result && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Main ATS Score Card */}
                            <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex flex-col items-center justify-center">
                                <h4 className="text-lg font-semibold text-indigo-950 mb-2">ATS Score</h4>
                                <div className="text-6xl font-bold text-indigo-600 font-mono">
                                    {result.ats_score}<span className="text-2xl text-indigo-300">/100</span>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">Overall ATS Compatibility</div>
                            </div>

                            {/* Job Match Score Card */}
                            <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex flex-col items-center justify-center">
                                <h4 className="text-lg font-semibold text-indigo-950 mb-2">Job Match</h4>
                                <div className="text-6xl font-bold text-emerald-500 font-mono">
                                    {result.job_match_score}<span className="text-2xl text-emerald-300">%</span>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">Semantic Suitability</div>
                            </div>

                            {/* Keyword Coverage Card */}
                            <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex flex-col items-center justify-center">
                                <h4 className="text-lg font-semibold text-indigo-950 mb-2">Keywords</h4>
                                <div className="text-6xl font-bold text-indigo-400 font-mono">
                                    {result.keyword_coverage}<span className="text-2xl text-indigo-200">%</span>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">Keyword Coverage</div>
                            </div>

                            {/* ATS Breakdown */}
                            <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
                                <h4 className="text-xl font-bold text-indigo-950 mb-4 border-b pb-2">ATS Breakdown</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {result.ats_breakdown && Object.entries(result.ats_breakdown).map(([key, value]) => (
                                        <div key={key} className="bg-violet-50 p-4 rounded-xl">
                                            <div className="text-sm text-indigo-900 font-semibold capitalize mb-1">
                                                {key.replace('_', ' ')}
                                            </div>
                                            <div className="text-2xl font-bold text-indigo-600 font-mono">{String(value)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Missing Skills */}
                            <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
                                <h4 className="text-xl font-bold text-indigo-950 mb-4 border-b pb-2">Missing Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.missing_skills?.length > 0 ? result.missing_skills.map((skill: string, i: number) => (
                                        <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                            {skill}
                                        </span>
                                    )) : (
                                        <span className="text-gray-500 italic">No missing skills detected.</span>
                                    )}
                                </div>
                            </div>

                            {/* AI Insights: Strengths, Weaknesses, Recs */}
                            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                                    <h4 className="text-lg font-bold text-emerald-700 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        Strengths
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.strengths?.map((item: string, i: number) => (
                                            <li key={i} className="text-gray-700 text-sm flex items-start">
                                                <span className="text-emerald-500 mr-2">•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
                                    <h4 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                        Weaknesses
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.weaknesses?.map((item: string, i: number) => (
                                            <li key={i} className="text-gray-700 text-sm flex items-start">
                                                <span className="text-red-500 mr-2">•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
                                    <h4 className="text-lg font-bold text-indigo-700 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        Recommendations
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.recommendations?.map((item: string, i: number) => (
                                            <li key={i} className="text-gray-700 text-sm flex items-start">
                                                <span className="text-indigo-500 mr-2">→</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
