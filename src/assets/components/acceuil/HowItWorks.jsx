import React from 'react';
import './style.css';

const HowItWorks = () => {
    return (
        <section className="how-it-works-section">
            <div className="how-it-works-container">
                <h2 className="section-title">Comment ça marche ?</h2>
                <div className="steps-container">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <div className="step-icon">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                                <path d="M7 11h10"></path>
                            </svg>
                        </div>
                        <h3>Vous entrez une URL / IP</h3>
                        <p>Saisissez simplement la cible que vous souhaitez analyser.</p>
                    </div>

                    <div className="step-arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>

                    <div className="step-card">
                        <div className="step-number">2</div>
                        <div className="step-icon">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <path d="M11 8v3l2.5 1.5"></path>
                            </svg>
                        </div>
                        <h3>NSPY analyse vos services</h3>
                        <p>Nos scanners détectent les ports ouverts et les vulnérabilités.</p>
                    </div>

                    <div className="step-arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>

                    <div className="step-card">
                        <div className="step-number">3</div>
                        <div className="step-icon">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                        </div>
                        <h3>Rapport clair avec priorités</h3>
                        <p>Recevez un audit détaillé et des conseils de correction.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
