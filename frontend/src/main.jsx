import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DesktopProvider } from "./Components/AppContext";

createRoot(document.getElementById('root')).render(
    <DesktopProvider>
      <StrictMode>
        <App />
      </StrictMode>
   </DesktopProvider>
)
