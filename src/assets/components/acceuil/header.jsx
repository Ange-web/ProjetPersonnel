import React from 'react';
import './style.css';
import logo from '../../images/logo.png'

import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="logo">
      <img src={logo} alt="Logo NSPY" className='logo-img' />
    </div>
    <nav className="nav">
      <Link to="/">Accueil</Link>
      <Link to="/scan">Services</Link>
      <a href="#">Contact</a>
      <a href="#">À propos</a>
    </nav>
      <Link to="/Login"><button className="btn-primary">Connexion</button></Link>
  </header>
);

export default Header;