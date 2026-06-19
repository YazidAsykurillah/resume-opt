import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, resume }: any) {
    const parsedData = resume.parsed?.json_data;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Resume Details</h2>}
        >
            <Head title="Resume Details" />

            <div className="py-12 bg-[#F5F3FF] min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm sm:rounded-xl border border-white p-8">
                        <div className="border-b border-gray-200 pb-6 mb-6">
                            <h1 className="text-3xl font-bold text-[#1E1B4B]">{resume.original_name}</h1>
                            <p className="text-gray-500 mt-2">Status: <span className="font-semibold">{resume.status}</span></p>
                        </div>

                        {resume.status === 'parsed' && parsedData ? (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-[#1E1B4B] mb-3 border-b pb-2">Profile</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <p><span className="text-gray-500">Name:</span> {parsedData.personal_information?.name}</p>
                                        <p><span className="text-gray-500">Email:</span> {parsedData.personal_information?.email}</p>
                                        <p><span className="text-gray-500">Phone:</span> {parsedData.personal_information?.phone}</p>
                                    </div>
                                    <p className="mt-4 text-gray-700">{parsedData.summary}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#1E1B4B] mb-3 border-b pb-2">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {parsedData.skills?.map((skill: string, index: number) => (
                                            <span key={index} className="bg-indigo-50 text-[#6366F1] px-3 py-1 rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#1E1B4B] mb-3 border-b pb-2">Experience</h3>
                                    {parsedData.work_experience?.map((exp: any, index: number) => (
                                        <div key={index} className="mb-4">
                                            <h4 className="font-semibold text-lg">{exp.title} at {exp.company}</h4>
                                            <p className="text-sm text-gray-500">{exp.date} | {exp.location}</p>
                                            <ul className="list-disc list-inside mt-2 text-gray-700">
                                                {exp.description?.map((desc: string, i: number) => (
                                                    <li key={i}>{desc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : resume.status === 'failed' ? (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-2xl mx-auto mt-8">
                                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-xl font-bold text-red-800 mb-2">Parsing Failed</h3>
                                <p className="text-red-600 mb-6 text-lg">
                                    {resume.error_message || "An unexpected error occurred while parsing this resume."}
                                </p>
                                <Link 
                                    href={route('resumes.retry', resume.id)} 
                                    method="post" 
                                    as="button" 
                                    type="button" 
                                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all duration-200"
                                >
                                    Retry Parsing
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <svg className="animate-spin h-12 w-12 text-[#6366F1] mx-auto mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <p className="text-[#1E1B4B] font-bold text-xl">Processing your resume...</p>
                                <p className="text-gray-500 text-base mt-2">This usually takes about 10-15 seconds.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
