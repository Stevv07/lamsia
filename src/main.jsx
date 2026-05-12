import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LamsiaDashboard from './LamsiaDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LamsiaDashboard />
  </StrictMode>,
)
