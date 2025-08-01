import { Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/footer'
import { ToastContainer } from 'react-toastify'
import Navbar from './Components/Navbar/Navbar'
import Client from './Pages/Client'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
            <Route path='/clienti' element={<Client />}/>
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={3000}/>
      <Footer />
    </>
  )
}

export default App
