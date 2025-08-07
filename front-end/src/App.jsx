import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/footer'
import { ToastContainer } from 'react-toastify'
import Navbar from './Components/Navbar/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000}/>
      <Outlet />
      <Footer />
    </>
  )
}

export default App
