import React from 'react';
import './style.css';

const TrustSection = () => (
  <section className="trust-section">
    <div className="container">
      <h2>Ils nous font confiance</h2>
      <div className="trust-logos">
        <div className="trust-logo">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            <rect x="10" y="15" width="60" height="10" rx="2" fill="#a0aec0"/>
            <text x="40" y="22" textAnchor="middle" fill="#4a5568" fontSize="8" fontWeight="bold">Microsoft</text>
          </svg>
        </div>
        <div className="trust-logo">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            <circle cx="20" cy="20" r="15" fill="#a0aec0"/>
            <text x="20" y="25" textAnchor="middle" fill="#4a5568" fontSize="8" fontWeight="bold">BMW</text>
          </svg>
        </div>
        <div className="trust-logo">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            <rect x="5" y="10" width="70" height="20" rx="3" fill="#a0aec0"/>
            <text x="40" y="25" textAnchor="middle" fill="#4a5568" fontSize="8" fontWeight="bold">Google</text>
          </svg>
        </div>
        <div className="trust-logo">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            <rect x="15" y="12" width="50" height="16" rx="2" fill="#a0aec0"/>
            <text x="40" y="23" textAnchor="middle" fill="#4a5568" fontSize="8" fontWeight="bold">Amazon</text>
          </svg>
        </div>
        <div className="trust-logo">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            <rect x="10" y="8" width="60" height="24" rx="4" fill="#a0aec0"/>
            <text x="40" y="22" textAnchor="middle" fill="#4a5568" fontSize="8" fontWeight="bold">Netflix</text>
          </svg>
        </div>
      </div>
    </div>
  </section>
);

export default TrustSection;
