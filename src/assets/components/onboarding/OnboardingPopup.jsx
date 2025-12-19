import React, { useState, useEffect } from 'react';

const OnboardingPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState(1);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const done = localStorage.getItem('nspy_onboarding_done');
        if (done !== 'true') {

            const timer = setTimeout(() => setIsVisible(true), 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            localStorage.setItem('nspy_onboarding_done', 'true');
            setIsVisible(false);
        }, 300);
    };

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    if (!isVisible) return null;

    return (
        <>
            <style>
                {`
                .nspy-onboarding-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(2, 6, 23, 0.7);
                    backdrop-filter: blur(8px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    opacity: 0;
                    animation: nspyFadeIn 0.3s forwards;
                }

                .nspy-onboarding-overlay.closing {
                    animation: nspyFadeOut 0.3s forwards;
                }

                .nspy-onboarding-card {
                    background-color: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 1rem;
                    width: 100%;
                    max-width: 450px;
                    padding: 0;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
                    transform: scale(0.95);
                    opacity: 0;
                    animation: nspyScaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.1s;
                    overflow: hidden;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    color: #f8fafc;
                }
                
                .nspy-onboarding-overlay.closing .nspy-onboarding-card {
                    animation: nspyScaleOut 0.3s forwards;
                }

                .nspy-step-indicator {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    padding-top: 2rem;
                    margin-bottom: 1rem;
                }

                .nspy-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #334155;
                    transition: all 0.3s ease;
                }

                .nspy-dot.active {
                    background-color: #10b981;
                    box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
                    width: 24px;
                    border-radius: 4px;
                }

                .nspy-card-content {
                    padding: 0 2rem 2rem 2rem;
                    text-align: center;
                }

                .nspy-icon-wrapper {
                    width: 64px;
                    height: 64px;
                    margin: 0 auto 1.5rem auto;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(14, 165, 233, 0.2));
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    font-size: 2rem;
                }

                .nspy-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    background: linear-gradient(to right, #ffffff, #94a3b8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .nspy-text {
                    color: #94a3b8;
                    line-height: 1.6;
                    font-size: 1rem;
                    margin-bottom: 2rem;
                }

                .nspy-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .nspy-btn {
                    width: 100%;
                    padding: 0.875rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: none;
                }

                .nspy-btn-primary {
                    background: linear-gradient(135deg, #10b981, #0ea5e9);
                    color: white;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                }

                .nspy-btn-primary:hover {
                    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
                    transform: translateY(-1px);
                }

                .nspy-btn-secondary {
                    background: transparent;
                    color: #94a3b8;
                    border: 1px solid #334155;
                }

                .nspy-btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: #f8fafc;
                    border-color: #475569;
                }
                
                .nspy-btn-ghost {
                    background: transparent;
                    color: #64748b;
                    font-size: 0.9rem;
                    padding: 0.5rem;
                }
                
                .nspy-btn-ghost:hover {
                    color: #94a3b8;
                }

                @keyframes nspyFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes nspyFadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }

                @keyframes nspyScaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                
                @keyframes nspyScaleOut {
                    from { transform: scale(1); opacity: 1; }
                    to { transform: scale(0.95); opacity: 0; }
                }
                `}
            </style>

            <div className={`nspy-onboarding-overlay ${isClosing ? 'closing' : ''}`}>
                <div className="nspy-onboarding-card">
                    <div className="nspy-step-indicator">
                        <div className={`nspy-dot ${step === 1 ? 'active' : ''}`} />
                        <div className={`nspy-dot ${step === 2 ? 'active' : ''}`} />
                        <div className={`nspy-dot ${step === 3 ? 'active' : ''}`} />
                    </div>

                    <div className="nspy-card-content">
                        {step === 1 && (
                            <>
                                <div className="nspy-icon-wrapper">
                                    🛡️
                                </div>
                                <h2 className="nspy-title">Bienvenue sur NSPY</h2>
                                <p className="nspy-text">
                                    NSPY te permet d’analyser la sécurité (URL, ports, IP, métadonnées),
                                    de consulter un historique et de générer des rapports.
                                </p>
                                <div className="nspy-actions">
                                    <button className="nspy-btn nspy-btn-primary" onClick={handleNext}>
                                        Suivant
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="nspy-icon-wrapper">
                                    👤
                                </div>
                                <h2 className="nspy-title">Compte utilisateur</h2>
                                <p className="nspy-text">
                                    NSPY fonctionne avec un compte utilisateur afin de protéger tes données
                                    et te permettre de retrouver tes scans et rapports à tout moment.
                                    L’inscription est rapide et nécessaire pour accéder aux outils.
                                </p>
                                <div className="nspy-actions">
                                    <button className="nspy-btn nspy-btn-primary" onClick={handleNext}>
                                        Suivant
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <div className="nspy-icon-wrapper">
                                    🚀
                                </div>
                                <h2 className="nspy-title">Avant de commencer</h2>
                                <p className="nspy-text">
                                    Prends le temps de consulter l’historique et les résultats.
                                    Les règles légales et d’utilisation seront affichées plus tard.
                                </p>
                                <div className="nspy-actions">
                                    <button className="nspy-btn nspy-btn-primary" onClick={handleClose}>
                                        J’ai compris
                                    </button>
                                    <button className="nspy-btn nspy-btn-ghost" onClick={handleClose}>
                                        Passer
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OnboardingPopup;
