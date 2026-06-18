import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0 relative overflow-hidden">
            {/* Background elements for depth */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
                <Link href="/">
                    <ApplicationLogo className="h-24 w-auto fill-current text-primary drop-shadow-md" />
                </Link>
            </div>

            <div className="mt-8 w-full sm:max-w-md relative z-10">
                <div className="card-glass shadow-xl border-white/40">
                    {children}
                </div>
            </div>
        </div>
    );
}
