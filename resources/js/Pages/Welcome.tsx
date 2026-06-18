import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
}: PageProps) {
    return (
        <>
            <Head title="Welcome to ResumeOpt" />
            <div className="min-h-screen bg-background text-text flex flex-col font-sans">
                {/* Navbar */}
                <nav className="w-full px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-heading font-bold text-xl">
                            R
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight text-text">ResumeOpt</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="btn-primary">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="font-semibold text-text/80 hover:text-primary transition-colors cursor-pointer">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="btn-primary">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section (Intro Hook) */}
                <main className="flex-1">
                    <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center text-center">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                            AI-Powered Resume Optimization
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-4xl text-text">
                            Land your dream job with an <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ATS-friendly</span> resume.
                        </h1>
                        <p className="text-lg text-text/70 mb-10 max-w-2xl mx-auto">
                            Stop getting rejected by automated systems. Our AI analyzes your resume against job descriptions and provides actionable improvements to double your interview rate.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="btn-primary py-4 px-8 text-lg">
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <Link href={route('register')} className="btn-primary py-4 px-8 text-lg shadow-xl shadow-cta/20">
                                    Optimize Your Resume Free
                                </Link>
                            )}
                            <a href="#how-it-works" className="btn-secondary py-4 px-8 text-lg bg-white">
                                See How It Works
                            </a>
                        </div>

                        {/* Social Proof (Logos) */}
                        <div className="mt-20 pt-10 border-t border-primary/10 w-full">
                            <p className="text-sm font-semibold text-text/50 uppercase tracking-wider mb-8">Trusted by professionals hired at</p>
                            <div className="flex flex-wrap justify-center gap-8 lg:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                                <div className="flex items-center gap-2 font-heading font-bold text-2xl text-text cursor-default"><div className="w-6 h-6 rounded-sm bg-text"></div>TechCorp</div>
                                <div className="flex items-center gap-2 font-heading font-bold text-2xl text-text cursor-default"><div className="w-6 h-6 rounded-full bg-text"></div>GlobalNet</div>
                                <div className="flex items-center gap-2 font-heading font-bold text-2xl text-text cursor-default"><div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-text"></div>Innovate</div>
                                <div className="flex items-center gap-2 font-heading font-bold text-2xl text-text cursor-default"><div className="w-6 h-6 rotate-45 bg-text"></div>CloudSys</div>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 1: The Problem */}
                    <section className="bg-white py-20 lg:py-32 border-y border-gray-100">
                        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl lg:text-5xl font-bold mb-6">Why is your resume getting ignored?</h2>
                                <p className="text-lg text-text/70 mb-6">
                                    Over 75% of resumes are rejected by Applicant Tracking Systems (ATS) before a human ever sees them. Missing keywords, poor formatting, and weak bullet points are costing you interviews.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 font-bold">✕</span>
                                        <span className="text-text/80 font-medium">Missing critical job description keywords</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 font-bold">✕</span>
                                        <span className="text-text/80 font-medium">Vague accomplishments without metrics</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 font-bold">✕</span>
                                        <span className="text-text/80 font-medium">Unreadable formatting for ATS parsers</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
                                <div className="card-glass relative border-red-100 p-8 shadow-xl">
                                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                        <div className="font-semibold text-text">ATS Scan Result</div>
                                        <div className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">Match: 34%</div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
                                        <div className="mt-6 text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg border border-red-100">⚠️ 12 critical keywords missing</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 2: The Journey / How it works */}
                    <section id="how-it-works" className="py-20 lg:py-32">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl lg:text-5xl font-bold mb-4">How ResumeOpt fixes it</h2>
                                <p className="text-lg text-text/70 max-w-2xl mx-auto">Three simple steps to transform your resume from a generic document into a targeted interview magnet.</p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="card text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                                    <h3 className="text-xl font-bold mb-3">Upload Resume</h3>
                                    <p className="text-text/70">Upload your current resume and paste the job description you are targeting.</p>
                                </div>
                                <div className="card text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                                    <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
                                    <p className="text-text/70">Our AI scans both documents, identifying missing keywords and weak impact statements.</p>
                                </div>
                                <div className="card text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                                    <h3 className="text-xl font-bold mb-3">Get Optimized</h3>
                                    <p className="text-text/70">Receive actionable, line-by-line recommendations to perfectly tailor your resume.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 3: Social Proof / Testimonials */}
                    <section className="bg-primary text-white py-20 lg:py-32">
                        <div className="max-w-7xl mx-auto px-6 text-center">
                            <h2 className="text-3xl lg:text-5xl font-bold mb-16 text-white">Join 10,000+ hired professionals</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                                {[
                                    { name: 'Sarah J.', role: 'Product Manager', text: 'ResumeOpt helped me tailor my resume for a FAANG company. I got the interview and the job within 3 weeks!' },
                                    { name: 'Michael T.', role: 'Software Engineer', text: 'I was applying to dozens of jobs with no response. The AI showed me my formatting was completely unreadable to ATS.' },
                                    { name: 'Elena R.', role: 'Marketing Director', text: 'The keyword matching feature is a game changer. It takes the guesswork out of customizing my resume for each application.' }
                                ].map((testimonial, i) => (
                                    <div key={i} className="bg-white/10 backdrop-blur border border-white/20 p-8 rounded-2xl cursor-default transition-transform hover:-translate-y-1">
                                        <div className="flex gap-1 mb-4 text-yellow-400">
                                            ★★★★★
                                        </div>
                                        <p className="text-white/90 mb-6 line-clamp-4">"{testimonial.text}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">{testimonial.name[0]}</div>
                                            <div>
                                                <div className="font-bold text-white">{testimonial.name}</div>
                                                <div className="text-sm text-white/70">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Climax CTA */}
                    <section className="py-20 lg:py-32 text-center">
                        <div className="max-w-3xl mx-auto px-6">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Stop guessing. Start landing interviews.</h2>
                            <p className="text-xl text-text/70 mb-10">
                                Join thousands of job seekers who transformed their job search with AI-powered insights.
                            </p>
                            {auth.user ? (
                                <Link href={route('dashboard')} className="btn-primary py-4 px-10 text-lg shadow-xl shadow-cta/20">
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <Link href={route('register')} className="btn-primary py-4 px-10 text-lg shadow-xl shadow-cta/20">
                                    Create Your Free Account
                                </Link>
                            )}
                            <p className="mt-6 text-sm text-text/50">No credit card required. Free tier available.</p>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white py-12">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center font-heading font-bold text-sm">
                                R
                            </div>
                            <span className="font-heading font-bold text-lg tracking-tight text-text">ResumeOpt</span>
                        </div>
                        <div className="text-center text-sm text-text/50">
                            &copy; 2026 ResumeOpt. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
