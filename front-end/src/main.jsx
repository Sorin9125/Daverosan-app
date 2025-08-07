import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter} from "react-router-dom"
import { RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import router from './Routes/Routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
