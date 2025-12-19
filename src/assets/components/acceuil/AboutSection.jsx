import React from 'react';
import './style.css';

const AboutSection = () => {
    return (
        <section className="about-section">
            <div className="about-container">
                <h2 className="section-title">À propos de NSPY</h2>

                <div className="bento-grid">
                    <div className="bento-card card-large">
                        <h3>👤 Qui est derrière NSPY ?</h3>
                        <p>
                            NSPY est un projet indépendant que je conçois et développe en parallèle de mon parcours de développeur.
                        </p>
                        <p>
                            Je me forme au développement d’applications et je m’intéresse de près à la cybersécurité, en particulier à la détection des failles et à la manière d’expliquer ces sujets de façon claire et accessible.
                        </p>
                    </div>

                    <div className="bento-card card-medium">
                        <h3>💡 Pourquoi NSPY ?</h3>
                        <p>
                            De nombreux outils sont puissants but complexes. NSPY a été pensé pour proposer :
                        </p>
                        <ul>
                            <li>Analyses automatisées</li>
                            <li>Résultats clairs et hiérarchisés</li>
                            <li>Explications simples sans jargon</li>
                        </ul>
                    </div>

                    <div className="bento-card card-medium">
                        <h3>🔐 Sécurité & Éthique</h3>
                        <ul className="check-list">
                            <li>Analyses sur ressources autorisées uniquement</li>
                            <li>Aucune attaque destructive</li>
                            <li>Aucune revente de données</li>
                            <li>Respect des limites légales</li>
                        </ul>
                    </div>

                    <div className="bento-card card-wide">
                        <h3>🚀 Roadmap & évolution</h3>
                        <p>
                            NSPY évolue avec de nouvelles analyses, des rapports plus clairs et des fonctionnalités pédagogiques.
                        </p>
                    </div>

                    <div className="bento-card card-contact">
                        <h3>✉️ Contact</h3>
                        <p>Des idées ou des questions ?</p>
                        <a href="mailto:contact@nspy.fr" className="contact-link">Me contacter</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
