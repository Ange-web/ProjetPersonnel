import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../assets/components/acceuil/footer';
import OnboardingPopup from '../assets/components/onboarding/OnboardingPopup';
import '../assets/components/acceuil/style.css';

const Layout = () => (
  <div className="page-container">
    <OnboardingPopup />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;
