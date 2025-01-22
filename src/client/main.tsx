import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import './styles.css';
import ErrorBoundary from './errors/errorBoundary/ErrorBoundary';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
      <ToastContainer />
    </ErrorBoundary>
  </React.StrictMode>
);
