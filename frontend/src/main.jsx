import React , { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
   
    <CookiesProvider>
      <StrictMode>
       <BrowserRouter> 
         <App />
        </BrowserRouter> 
      </StrictMode>
    </CookiesProvider>
    
)
