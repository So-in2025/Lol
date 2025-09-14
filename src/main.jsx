import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './fonts/fonts.css' // <-- AQUÍ ESTÁ LA CORRECCIÓN
import './index.css'
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)