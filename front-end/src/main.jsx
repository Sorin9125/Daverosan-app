import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import Context from './Context'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4096dbff',
    },
    secondary: {
      main: '#ffffffde'
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Context>
        <App />
      </Context>
    </ThemeProvider>
  </StrictMode>,
)
