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
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
