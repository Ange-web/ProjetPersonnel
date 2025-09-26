import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../assets/components/acceuil/footer';
import '../assets/components/acceuil/style.css';

const Layout = () => (
  <div className="page-container">
    <Outlet />
    <Footer />
  </div>
);

export default Layout;
