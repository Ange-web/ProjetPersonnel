import React from 'react';
import './style.css';
import { TrustLogo } from './AppIcons';

const TrustSection = () => (
  <section className="trust-section">
    <div className="container">
      <h2>Ils nous font confiance</h2>
      <div className="trust-logos">
        <div className="trust-logo">
          <TrustLogo type="microsoft" />
        </div>
        <div className="trust-logo">
          <TrustLogo type="bmw" />
        </div>
        <div className="trust-logo">
          <TrustLogo type="google" />
        </div>
        <div className="trust-logo">
          <TrustLogo type="amazon" />
        </div>
        <div className="trust-logo">
          <TrustLogo type="netflix" />
        </div>
      </div>
    </div>
  </section>
);

export default TrustSection;
