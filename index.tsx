
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Optional: Handle SPA redirect from 404.html if applicable
const urlParams = new URLSearchParams(window.location.search);
const p = urlParams.get('p');
if (p) {
  const originalPath = '/' + p.replace(/--/g, '/');
  window.history.replaceState(null, '', originalPath + window.location.hash);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
