import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
const theme = createTheme({
  palette: {
    background: {
      default: '#4096db',
      paper: '#fff',
    },
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <CookiesProvider>
            <ToastContainer />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <App />
            </LocalizationProvider>
            
        </CookiesProvider>
    </ThemeProvider>
  </StrictMode>,
)
