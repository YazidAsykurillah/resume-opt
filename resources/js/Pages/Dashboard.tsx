import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }: any) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-[#F5F3FF] min-h-screen font-['Plus_Jakarta_Sans']">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl sm:rounded-2xl border border-white">
                        <div className="p-12 text-center">
                            <h3 className="text-3xl font-bold text-[#1E1B4B] mb-4">Welcome back to ResumeOpt!</h3>
                            <p className="mb-10 text-gray-600 text-lg">Get started by analyzing your resume against a target job posting.</p>
                            <Link 
                                href={route('analyses.create')} 
                                className="bg-[#6366F1] hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-200 text-lg inline-block"
                            >
                                Start New Analysis
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
