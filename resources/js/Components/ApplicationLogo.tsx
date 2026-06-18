import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
            </defs>
            <rect x="10" y="25" width="50" height="50" rx="12" fill="url(#logo-gradient)" />
            <path d="M25 40 h20 M25 50 h20 M25 60 h10" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <text x="75" y="62" fontFamily="sans-serif" fontWeight="700" fontSize="42" fill="#1E1B4B">
                Resume<tspan fill="#6366F1">Opt</tspan>
            </text>
        </svg>
    );
}
