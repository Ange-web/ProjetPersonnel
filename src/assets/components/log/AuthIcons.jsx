import React from 'react';

const AuthIcon = ({ type, className = "", width = 24, height = 24, strokeWidth = 2.5 }) => {
    const gradientDef = (
        <defs>
            <linearGradient id="authNspyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00dfc4" />
                <stop offset="100%" stopColor="#007cf0" />
            </linearGradient>
        </defs>
    );

    const commonProps = {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "url(#authNspyGradient)",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className,
        width,
        height
    };

    switch (type) {
        case 'login':
        case 'lock':
            return (
                <svg {...commonProps}>
                    {gradientDef}
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            );
        case 'register':
        case 'user':
            return (
                <svg {...commonProps}>
                    {gradientDef}
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            );
        default:
            return null;
    }
};

export default AuthIcon;
