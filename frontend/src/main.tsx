import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './context/UserContext' // 👈 asegúrate que esta ruta sea correcta

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider> {/* 👈 envolvemos toda la app */}
      <App />
    </UserProvider>
  </StrictMode>,
)
