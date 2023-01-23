import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './custom.scss'
import 'react-toastify/dist/ReactToastify.css';
import "font-awesome/css/font-awesome.min.css";
import AppRoutes from './routing/AppRoutes';
import { AuthInit, AuthProvider } from './moduls/Auth';
import { ToastContainer } from 'react-toastify';

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AuthInit>
        <AppRoutes/>
        <ToastContainer />
      </AuthInit>
    </AuthProvider>
  </React.StrictMode>
);