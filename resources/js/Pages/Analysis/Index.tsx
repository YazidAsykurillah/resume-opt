import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, analyses }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Analyses</h2>}
        >
            <Head title="Analyses" />

            <div className="py-12 bg-[#F5F3FF] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-[#1E1B4B]">Your Analyses</h1>
                        <Link href={route('analyses.create')} className="bg-[#6366F1] hover:bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md transition-colors duration-200">
                            New Analysis
                        </Link>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm sm:rounded-xl border border-white">
                        <div className="p-6">
                            {analyses.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">No analyses created yet.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Target</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {analyses.data.map((analysis: any) => (
                                            <tr key={analysis.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{analysis.job?.title || 'Unknown Job'}</div>
                                                    <div className="text-sm text-gray-500">{analysis.job?.company || analysis.job?.url}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{analysis.resume?.original_name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        analysis.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        analysis.status === 'failed' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {analysis.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(analysis.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link href={route('analyses.show', analysis.id)} className="text-[#6366F1] hover:text-indigo-900 font-bold">
                                                        View Details &rarr;
                                                    </Link>
                                                    {analysis.status !== 'completed' && (
                                                        <Link href={route('analyses.retry', analysis.id)} method="post" as="button" className="text-emerald-600 hover:text-emerald-900 font-bold ml-4">
                                                            Retry
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
