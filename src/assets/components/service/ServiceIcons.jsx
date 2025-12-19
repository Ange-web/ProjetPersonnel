import React from 'react';

const ServiceIcon = ({ type, className = "", width = 60, height = 60, strokeWidth = 1.5 }) => {

    const gradientDef = (
        <defs>
            <linearGradient id="nspyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00dfc4" />
                <stop offset="100%" stopColor="#007cf0" />
            </linearGradient>
        </defs>
    );

    const commonProps = {
        width,
        height,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "url(#nspyGradient)",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className
    };

    switch (type) {
        case 'url':
        case 'scan':
            return (
                <svg {...commonProps}>
                    {gradientDef}
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <path d="M11 8v6"></path>
                    <path d="M8 11h6"></path>
                </svg>
            );
        case 'port':
            return (
                <svg {...commonProps}>
                    {gradientDef}
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
            );
        case 'port-alt':
            return (
                <svg {...commonProps}>
                    {gradientDef}
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            );
        case 'ip':
            return (
                <svg {...commonProps}>
                    {gradientDef}
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
            );
        case 'ip-alt':
            return (
                <svg {...commonProps}>
                    {gradientDef}
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            );

        case 'exif':
            return (
                <svg {...commonProps}>
                    {gradientDef}
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
            );
        case 'nuclei':
            return (
                <svg {...commonProps}>
                    {gradientDef}
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                </svg>
            );
        default:
            return null;
    }
};

export default ServiceIcon;
