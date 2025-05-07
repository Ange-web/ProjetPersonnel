import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Accueil from './assets/components/acceuil/acceuil';
import InputInscription from './assets/components/log/formInsciption';
import InputLogin from './assets/components/log/formlogin';
import ScanPage from './assets/components/service/service';

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
    path:'/scan',
    element: <ScanPage/>
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
