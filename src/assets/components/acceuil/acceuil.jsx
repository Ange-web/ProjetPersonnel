import React from 'react';
import Header from './header';
import Home from './home';
import Dashboard from './Dashboard';
import TrustSection from './TrustSection';
import ServicesSection from './ServicesSection';
import HowItWorks from './HowItWorks';
import AboutSection from './AboutSection';
import './style.css';


const Accueil = () => (
  <div>
    <Header />
    <Home />
    <HowItWorks />
    <Dashboard />
    <ServicesSection />
    <AboutSection />
  </div>
);

export default Accueil;
