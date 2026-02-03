
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Handle initial redirect from 404 for SEO-friendly URLs on non-SPA environments
 */
(function handleRedirect() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('p');
    if (redirectPath) {
      const originalPath = '/' + redirectPath.replace(/--/g, '/');
      const cleanUrl = originalPath + window.location.hash;
      window.history.replaceState(null, '', cleanUrl);
    }
  } catch (e) {
    console.error('Redirect restoration failed:', e);
  }
})();

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
