import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './fonts.css' // <-- AÑADE ESTA LÍNEA
import './index.css'
import { Analytics } from '@vercel/analytics/react'; // <-- AÑADE ESTA LÍNEA

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics /> {/* <-- AÑADE ESTA LÍNEA */}
  </React.StrictMode>,
)