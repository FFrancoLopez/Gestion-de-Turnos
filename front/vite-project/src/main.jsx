import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { UsersContextProvider } from './context/UsersContext.jsx'
import App from './App.jsx'

createRoot (document.getElementById('root')).render(
  <StrictMode>
    <UsersContextProvider>

      <BrowserRouter>

        <App />
      
      </BrowserRouter>

    </UsersContextProvider>
  </StrictMode>,
)
