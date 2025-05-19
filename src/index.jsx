import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Log when index.jsx executes
console.log('index.jsx: Starting React app initialization');

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('index.jsx: App rendered successfully');
} catch (error) {
  console.error('index.jsx: Failed to render app:', error);
  document.getElementById('root').innerHTML = `
    <div style="text-align: center; padding: 20px; color: red;">
      <h1>Error Loading Kashurpedia</h1>
      <p>Initialization error: ${error.message}</p>
      <p>Stack: ${error.stack}</p>
      <p>Please refresh the page or contact support.</p>
    </div>
  `;
}
