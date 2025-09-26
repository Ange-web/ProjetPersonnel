import React from 'react';
import Header from './header';
import Home from './home';
import ServicesSection from './ServicesSection';
import Footer from './footer';
import './style.css';


const Accueil = () => (
  <div className="page-container">
    <Header />
    <Home />
    <ServicesSection />
    <Footer />
  </div>
);

export default Accueil;
