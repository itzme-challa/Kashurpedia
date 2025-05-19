import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

console.log('index.jsx: Starting');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
console.log('index.jsx: Rendered');
