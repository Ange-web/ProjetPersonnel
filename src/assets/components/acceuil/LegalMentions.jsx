import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import './style.css';

const LegalMentions = () => {
    return (
        <div className="home">
            <Header />
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Mentions légales – NSPY</h1>

                <div className="service-card" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>
                        Dernière mise à jour : 15 décembre 2025
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Éditeur du site</h2>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li><strong>Nom du site :</strong> NSPY</li>
                        <li><strong>Responsable de la publication :</strong> Ange Nono</li>
                        <li><strong>Statut :</strong> Projet personnel / Plateforme numérique indépendante</li>
                        <li><strong>Adresse e-mail de contact :</strong> <a href="mailto:nspy52261@gmail.com" style={{ color: '#20B2AA' }}>nspy52261@gmail.com</a></li>
                    </ul>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Hébergement</h2>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li><strong>Hébergeur :</strong> Vercel Inc.</li>
                        <li><strong>Adresse :</strong><br />
                            340 S Lemon Ave #4133<br />
                            Walnut, CA 91789<br />
                            États-Unis
                        </li>
                        <li><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#20B2AA' }}>https://vercel.com</a></li>
                    </ul>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Accès au site</h2>
                    <p>
                        Le site NSPY est accessible à l’adresse suivante :<br />
                        👉 <a href="https://projet-personnel-rust.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#20B2AA' }}>https://projet-personnel-rust.vercel.app/</a>
                    </p>
                    <p>L’accès à certaines fonctionnalités (outils de scan, tableau de bord, génération de rapports) nécessite :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>la création d’un compte utilisateur</li>
                        <li>ou une connexion via un fournisseur tiers (Google)</li>
                    </ul>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Description du service</h2>
                    <p>NSPY est une plateforme dédiée à la cybersécurité permettant notamment :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>l’analyse de sécurité d’URL</li>
                        <li>le scan de ports réseau</li>
                        <li>l’analyse d’adresses IP</li>
                        <li>l’analyse de métadonnées (EXIF)</li>
                        <li>la consultation d’un historique de scans</li>
                        <li>la génération de rapports de sécurité (PDF)</li>
                    </ul>
                    <p>Les services proposés ont une finalité informative, préventive et pédagogique.</p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>5. Responsabilité</h2>
                    <p>Les informations et résultats fournis par NSPY :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>ne constituent pas un audit de sécurité officiel</li>
                        <li>sont fournis à titre indicatif</li>
                    </ul>
                    <p>L’éditeur du site ne saurait être tenu responsable :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>de l’utilisation faite des résultats par l’utilisateur</li>
                        <li>des dommages directs ou indirects résultant de l’usage de la plateforme</li>
                    </ul>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>6. Utilisation légale et autorisée</h2>
                    <p>L’utilisateur s’engage à utiliser NSPY exclusivement :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>sur des systèmes, sites ou ressources dont il est propriétaire</li>
                        <li>ou pour lesquels il dispose d’une autorisation explicite</li>
                    </ul>
                    <p style={{ color: '#f43f5e', marginTop: '1rem' }}>
                        ❌ Toute utilisation à des fins illégales, frauduleuses ou malveillantes est strictement interdite.
                    </p>
                    <p>
                        NSPY se réserve le droit de suspendre ou supprimer un compte en cas de non-respect de ces règles.
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>7. Propriété intellectuelle</h2>
                    <p>
                        L’ensemble des éléments constituant le site NSPY (code, design, textes, interfaces, logos) est protégé par les lois relatives à la propriété intellectuelle.
                    </p>
                    <p>
                        Toute reproduction, modification ou diffusion sans autorisation préalable est interdite.
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>8. Données personnelles</h2>
                    <p>
                        La gestion des données personnelles est décrite dans la<br />
                        👉 <Link to="/privacy-policy" style={{ color: '#20B2AA' }}>Politique de confidentialité</Link>
                    </p>
                    <p>
                        Conformément au RGPD, l’utilisateur dispose de droits d’accès, de rectification et de suppression de ses données.
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>9. Cookies</h2>
                    <p>NSPY utilise uniquement des cookies techniques strictement nécessaires :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>à l’authentification</li>
                        <li>à la sécurité</li>
                        <li>au bon fonctionnement du site</li>
                    </ul>
                    <p>Aucun cookie publicitaire ou de suivi commercial n’est utilisé.</p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>10. Droit applicable</h2>
                    <p>
                        Les présentes mentions légales sont régies par le droit français.
                    </p>
                    <p>
                        En cas de litige, et à défaut de résolution amiable, les tribunaux compétents seront ceux du ressort du domicile de l’éditeur.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LegalMentions;
