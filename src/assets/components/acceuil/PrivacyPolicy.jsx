import React from 'react';
import Header from './header';
import './style.css';

const PrivacyPolicy = () => {
    return (
        <div className="home">
            <Header />
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Politique de confidentialité – NSPY</h1>

                <div className="service-card" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>
                        Dernière mise à jour : 15 décembre 2025
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Présentation</h2>
                    <p>
                        NSPY est une plateforme de sécurité informatique permettant aux utilisateurs d’analyser des URL,
                        adresses IP, ports réseau et métadonnées d’images à des fins de diagnostic et de sensibilisation à la cybersécurité.
                    </p>
                    <p>
                        La protection de vos données personnelles est une priorité.
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Données collectées</h2>
                    <p>Lors de l’utilisation de NSPY, nous pouvons collecter :</p>

                    <h3 style={{ color: '#e2e8f0', fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Données fournies par l’utilisateur</h3>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>Prénom et nom</li>
                        <li>Adresse email</li>
                        <li>Nom d’utilisateur</li>
                        <li>Mot de passe (chiffré)</li>
                        <li>Connexion via Google (email, nom, photo de profil si autorisée)</li>
                    </ul>

                    <h3 style={{ color: '#e2e8f0', fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Données techniques</h3>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>Adresse IP</li>
                        <li>Historique des scans effectués</li>
                        <li>Résultats d’analyse et rapports générés</li>
                        <li>Informations de connexion (date, heure)</li>
                    </ul>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Finalité de la collecte</h2>
                    <p>Les données sont utilisées uniquement pour :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>Créer et gérer votre compte utilisateur</li>
                        <li>Fournir les fonctionnalités de scan</li>
                        <li>Générer et stocker des rapports</li>
                        <li>Assurer la sécurité de la plateforme</li>
                        <li>Améliorer l’expérience utilisateur</li>
                    </ul>
                    <p>Aucune donnée n’est vendue ou cédée à des tiers.</p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Sécurité des données</h2>
                    <p>NSPY met en œuvre des mesures techniques et organisationnelles pour protéger vos données :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>Chiffrement des mots de passe</li>
                        <li>Accès sécurisé</li>
                        <li>Limitation des accès aux données sensibles</li>
                    </ul>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>5. Durée de conservation</h2>
                    <p>Les données sont conservées :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>Tant que le compte est actif</li>
                        <li>Ou jusqu’à la suppression du compte par l’utilisateur</li>
                    </ul>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>6. Cookies</h2>
                    <p>
                        NSPY peut utiliser des cookies techniques strictement nécessaires au bon fonctionnement du site (authentification, session).
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>7. Droits de l’utilisateur</h2>
                    <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#94a3b8', marginBottom: '1rem' }}>
                        <li>Accès à vos données</li>
                        <li>Rectification</li>
                        <li>Suppression</li>
                        <li>Opposition au traitement</li>
                    </ul>
                    <p>
                        Vous pouvez exercer vos droits en nous contactant à : <a href="mailto:nspy52261@gmail.com" style={{ color: '#20B2AA' }}>nspy52261@gmail.com</a>
                    </p>

                    <h2 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>8. Contact</h2>
                    <p>
                        Pour toute question concernant la protection des données : <a href="mailto:nspy52261@gmail.com" style={{ color: '#20B2AA' }}>nspy52261@gmail.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
