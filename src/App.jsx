import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Accueil from './assets/components/acceuil/acceuil';
import Parcours from './assets/components/parcours/parcours';
import InputInscription from './assets/components/log/formInsciption';
import InputLogin from './assets/components/log/formlogin';
import Servicehome from './assets/components/service/service-home';
import ScanPage from './assets/components/service/urlscan';
import IpPage from './assets/components/service/ipscan';
import PortScanPage from './assets/components/service/portscan';
import ExifPage from './assets/components/service/exifpage';
import ProfilPage from './assets/components/profil/ProfilPage';
import NSPYScanHistoryDashboard from './assets/components/dashboard/NSPYScanHistoryDashboard';
import PrivacyPolicy from './assets/components/acceuil/PrivacyPolicy';
import TermsOfUse from './assets/components/acceuil/TermsOfUse';
import LegalMentions from './assets/components/acceuil/LegalMentions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Accueil />,
      },
      {
        path: 'parcours',
        element: <Parcours />,
      },
      {
        path: 'signup',
        element: <InputInscription />,
      },
      {
        path: 'Login',
        element: <InputLogin />
      },
      {
        path: 'servicehome',
        element: <Servicehome />
      },
      {
        path: 'scanurl',
        element: <ScanPage />
      },
      {
        path: 'scanip',
        element: <IpPage />
      },
      {
        path: 'scanport',
        element: <PortScanPage />
      },
      {
        path: 'scanexif',
        element: <ExifPage />
      },
      {
        path: 'profil',
        element: <ProfilPage />
      },
      {
        path: 'dashboard',
        element: <NSPYScanHistoryDashboard />
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: 'terms-of-use',
        element: <TermsOfUse />
      },
      {
        path: 'legal-mentions',
        element: <LegalMentions />
      },
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
