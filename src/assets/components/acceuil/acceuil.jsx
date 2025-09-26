import React from 'react';
import Header from './header';
import Home from './home';
import TrustSection from './TrustSection';
import ServicesSection from './ServicesSection';
import './style.css';


const Accueil = () => (
  <div>
    <Header />
    <Home />
    <TrustSection />
    <ServicesSection />
  </div>
);

export default Accueil;
