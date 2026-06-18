import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ auth, resume }: any) {
    const parsedData = resume.parsed?.json_data;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Resume Details</h2>}
        >
            <Head title="Resume Details" />

            <div className="py-12 bg-[#F5F3FF] min-h-screen font-['Plus_Jakarta_Sans']">
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
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">This resume is currently being processed or could not be parsed.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
