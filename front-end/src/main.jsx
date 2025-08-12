import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import Context from './Context'

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
      <Context>
        <App />
      </Context>
    </ThemeProvider>
  </StrictMode>,
)
