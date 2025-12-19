import React from 'react';
import Header from './header';
import './style.css';

const TermsOfUse = () => {
    return (
        <div className="home">
            <Header />
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Conditions d’utilisation – NSPY</h1>

                <div className="service-card" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>
                        Dernière mise à jour : 15 décembre 2025
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Objet</h2>
                    <p>
                        Les présentes conditions définissent les règles d’utilisation de la plateforme NSPY.
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Accès au service</h2>
                    <p>L’accès aux outils NSPY nécessite :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>La création d’un compte utilisateur</li>
                        <li>Ou une connexion via un fournisseur tiers (Google)</li>
                    </ul>
                    <p>
                        L’utilisateur est responsable de la confidentialité de ses identifiants.
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Utilisation autorisée</h2>
                    <p>
                        NSPY est destiné uniquement à des fins légales et éthiques.
                    </p>
                    <p>L’utilisateur s’engage à :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>Scanner uniquement des systèmes, sites ou ressources dont il est propriétaire ou autorisé</li>
                        <li>Ne pas utiliser NSPY à des fins malveillantes</li>
                        <li>Respecter la législation en vigueur</li>
                    </ul>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Responsabilité</h2>
                    <p>NSPY fournit des analyses à titre informatif et pédagogique.</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>Les résultats ne constituent pas un audit de sécurité officiel</li>
                        <li>NSPY ne peut être tenu responsable des actions menées par l’utilisateur à partir des résultats</li>
                    </ul>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>5. Suspension ou suppression de compte</h2>
                    <p>NSPY se réserve le droit de :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>Suspendre ou supprimer un compte en cas d’abus</li>
                        <li>Bloquer l’accès aux services en cas de non-respect des règles</li>
                    </ul>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>6. Propriété intellectuelle</h2>
                    <p>
                        L’ensemble du site, du code, des interfaces et des contenus appartient à NSPY.
                    </p>
                    <p>
                        Toute reproduction non autorisée est interdite.
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>7. Évolution des conditions</h2>
                    <p>
                        NSPY peut modifier les présentes conditions à tout moment.<br />
                        Les utilisateurs seront informés en cas de changement important.
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>8. Droit applicable</h2>
                    <p>
                        Les présentes conditions sont soumises au droit français.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUse;
