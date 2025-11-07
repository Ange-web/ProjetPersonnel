import React from 'react';
import './style.css';

const ServiceCard = ({ icon, title, description }) => (
  <div className="service-card">
    <div className="service-icon">
      {icon === "configuration-image" && (
        <img
          src="https://cdn-icons-png.flaticon.com/512/6671/6671901.png"
          alt="Icône Évaluation de configuration"
          style={{ width: '48px', height: '48px' }}
        />
      )}
      {icon === "⚙️" && (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="#20B2AA"/>
          <path d="M24 8L28 16L36 16L30 22L32 30L24 26L16 30L18 22L12 16L20 16L24 8Z" fill="white"/>
        </svg>
      )}
      {icon === "🛡️" && (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L8 12V24C8 32 12 38 24 42C36 38 40 32 40 24V12L24 4Z" fill="#20B2AA"/>
          <path d="M18 24L22 28L30 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {icon === "🔍" && (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="20" cy="20" r="16" fill="#20B2AA"/>
          <rect x="28" y="28" width="12" height="12" rx="2" fill="#20B2AA"/>
          <circle cx="20" cy="20" r="8" fill="white"/>
          <path d="M28 28L36 36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default ServiceCard;