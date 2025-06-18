import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


document.documentElement.setAttribute('data-theme', window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
