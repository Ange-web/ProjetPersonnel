import React from 'react';


export const HomeIllustration = ({ width = 120, height = 120 }) => (
    <svg width={width} height={height} viewBox="0 0 120 120" fill="none">
        <rect x="30" y="20" width="60" height="80" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />

        <rect x="40" y="35" width="40" height="2" rx="1" fill="#20B2AA" />
        <rect x="40" y="42" width="35" height="2" rx="1" fill="#20B2AA" />
        <rect x="40" y="49" width="30" height="2" rx="1" fill="#20B2AA" />
        <rect x="40" y="56" width="25" height="2" rx="1" fill="#20B2AA" />

        <circle cx="75" cy="45" r="12" fill="none" stroke="#20B2AA" strokeWidth="3" />
        <line x1="84" y1="54" x2="90" y2="60" stroke="#20B2AA" strokeWidth="3" strokeLinecap="round" />

        <rect x="45" y="70" width="3" height="15" fill="#20B2AA" />
        <rect x="52" y="65" width="3" height="20" fill="#20B2AA" />
        <rect x="59" y="60" width="3" height="25" fill="#20B2AA" />
        <rect x="66" y="70" width="3" height="15" fill="#20B2AA" />

        <circle cx="46.5" cy="85" r="2" fill="#20B2AA" />
        <circle cx="53.5" cy="80" r="2" fill="#20B2AA" />
        <circle cx="60.5" cy="75" r="2" fill="#20B2AA" />
        <circle cx="67.5" cy="85" r="2" fill="#20B2AA" />
        <path d="M46.5 85 L53.5 80 L60.5 75 L67.5 85" stroke="#20B2AA" strokeWidth="2" fill="none" />
    </svg>
);


export const TrustLogo = ({ type, width = 80, height = 40 }) => {
    const commonProps = { width, height, viewBox: "0 0 80 40", fill: "none" };
    const fillBase = "#a0aec0";
    const fillText = "#4a5568";

    switch (type) {
        case 'microsoft':
            return (
                <svg {...commonProps}>
                    <rect x="10" y="15" width="60" height="10" rx="2" fill={fillBase} />
                    <text x="40" y="22" textAnchor="middle" fill={fillText} fontSize="8" fontWeight="bold">Microsoft</text>
                </svg>
            );
        case 'bmw':
            return (
                <svg {...commonProps}>
                    <circle cx="20" cy="20" r="15" fill={fillBase} />
                    <text x="20" y="25" textAnchor="middle" fill={fillText} fontSize="8" fontWeight="bold">BMW</text>
                </svg>
            );
        case 'google':
            return (
                <svg {...commonProps}>
                    <rect x="5" y="10" width="70" height="20" rx="3" fill={fillBase} />
                    <text x="40" y="25" textAnchor="middle" fill={fillText} fontSize="8" fontWeight="bold">Google</text>
                </svg>
            );
        case 'amazon':
            return (
                <svg {...commonProps}>
                    <rect x="15" y="12" width="50" height="16" rx="2" fill={fillBase} />
                    <text x="40" y="23" textAnchor="middle" fill={fillText} fontSize="8" fontWeight="bold">Amazon</text>
                </svg>
            );
        case 'netflix':
            return (
                <svg {...commonProps}>
                    <rect x="10" y="8" width="60" height="24" rx="4" fill={fillBase} />
                    <text x="40" y="22" textAnchor="middle" fill={fillText} fontSize="8" fontWeight="bold">Netflix</text>
                </svg>
            );
        default:
            return null;
    }
};


export const DashboardIcon = ({ type, width = 32, height = 32, color = "#20B2AA" }) => {
    const commonProps = { width, height, viewBox: "0 0 32 32", fill: "none" };

    switch (type) {
        case 'total':

            return (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" fill="none" />
                    <path d="M24 8 L24 24 L32 24" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        case 'url':
            return (
                <svg {...commonProps}>
                    <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" />
                    <path d="M16 8 L16 16 L20 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        case 'ip':
            return (
                <svg {...commonProps}>
                    <rect x="8" y="12" width="16" height="12" rx="2" stroke={color} strokeWidth="2" />
                    <circle cx="12" cy="18" r="1.5" fill={color} />
                    <circle cx="16" cy="18" r="1.5" fill={color} />
                    <circle cx="20" cy="18" r="1.5" fill={color} />
                </svg>
            );
        case 'port':
            return (
                <svg {...commonProps}>
                    <rect x="10" y="8" width="12" height="16" rx="2" stroke={color} strokeWidth="2" />
                    <line x1="14" y1="12" x2="18" y2="12" stroke={color} strokeWidth="2" />
                    <line x1="14" y1="16" x2="18" y2="16" stroke={color} strokeWidth="2" />
                    <line x1="14" y1="20" x2="18" y2="20" stroke={color} strokeWidth="2" />
                </svg>
            );
        case 'exif':
            return (
                <svg {...commonProps}>
                    <rect x="8" y="6" width="16" height="20" rx="2" stroke={color} strokeWidth="2" />
                    <circle cx="16" cy="14" r="3" stroke={color} strokeWidth="2" />
                    <path d="M10 22 L12 20 L14 22 L18 18 L22 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        default:
            return null;
    }
};


export const AcceuilServiceIcon = ({ type }) => {
    switch (type) {
        case 'gear':
            return (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="#20B2AA" />
                    <path d="M24 8L28 16L36 16L30 22L32 30L24 26L16 30L18 22L12 16L20 16L24 8Z" fill="white" />
                </svg>
            );
        case 'shield':
            return (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M24 4L8 12V24C8 32 12 38 24 42C36 38 40 32 40 24V12L24 4Z" fill="#20B2AA" />
                    <path d="M18 24L22 28L30 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'search':
            return (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="20" cy="20" r="16" fill="#20B2AA" />
                    <rect x="28" y="28" width="12" height="12" rx="2" fill="#20B2AA" />
                    <circle cx="20" cy="20" r="8" fill="white" />
                    <path d="M28 28L36 36" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        default:
            return null;
    }
}
