import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, resumes }: any) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this resume?')) {
            destroy(route('resumes.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Resumes</h2>}
        >
            <Head title="My Resumes" />
            <div className="py-12 bg-[#F5F3FF] min-h-screen font-['Plus_Jakarta_Sans']">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm sm:rounded-xl border border-white">
                        <div className="p-6">
                            {resumes.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">No resumes uploaded yet.</p>
                                    <Link href={route('analyses.create')} className="text-[#6366F1] font-semibold hover:underline">
                                        Upload a resume to start analysis
                                    </Link>
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {resumes.data.map((resume: any) => (
                                            <tr key={resume.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-[#6366F1]">
                                                        <Link href={route('resumes.show', resume.id)} className="hover:underline">
                                                            {resume.original_name}
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        resume.status === 'parsed' ? 'bg-green-100 text-green-800' :
                                                        resume.status === 'failed' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {resume.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(resume.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => handleDelete(resume.id)} className="text-red-600 hover:text-red-900">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
