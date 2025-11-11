import React , { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from "react-cookie";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
    <CookiesProvider>
      <StrictMode>
         <App />
      </StrictMode>
    </CookiesProvider>
)
