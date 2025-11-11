import React from 'react';
import Header from './header';
import Home from './home';
import Dashboard from './Dashboard';
import TrustSection from './TrustSection';
import ServicesSection from './ServicesSection';
import './style.css';


const Accueil = () => (
  <div>
    <Header />
    <Home />
    <Dashboard />
    <ServicesSection />
  </div>
);

export default Accueil;
