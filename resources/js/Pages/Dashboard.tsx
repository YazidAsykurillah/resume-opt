import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="card text-center p-12">
                        <h3 className="text-2xl font-semibold text-primary mb-2">Welcome to ResumeOpt</h3>
                        <p className="text-gray-600">Your dashboard is ready for Sprint 1 features.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
