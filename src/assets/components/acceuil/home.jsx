import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="home">
    <h1>Évaluations en cybersécurité</h1>
    <p>
      Analysez et améliorez la sécurité de vos systèmes numériques grâce à nos services spécialisés.
    </p>
    <button className="btn-primary"><Link to="/servicehome">Nos outils</Link></button>
  </section>
);

export default Home;