import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Accueil from './assets/components/acceuil/acceuil';
import InputInscription from './assets/components/log/formInsciption';
import InputLogin from './assets/components/log/formlogin';
import Servicehome from './assets/components/service/service-home';
import ScanPage from './assets/components/service/urlscan';
import IpPage from './assets/components/service/ipscan';
import PortScanPage from './assets/components/service/portscan';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Accueil />,
  },
  {
    path:'/signup',
    element: <InputInscription />,
  },
  {
    path:'/Login',
    element: <InputLogin/>
  },
  {
    path:'/servicehome',
    element: <Servicehome/>
  },
  {
    path:'/scanurl',
    element: <ScanPage/>
  },
  {
    path:'/scanip',
    element: <IpPage/>
  },
  {
    path:'/scanport',
    element: <PortScanPage/>
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
