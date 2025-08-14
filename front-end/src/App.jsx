import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoginPage from "./Pages/Login";
import Client from "./Pages/Client";
import Request from "./Pages/Requests";
import Offers from "./Pages/Offer";
import Orders from "./Pages/Orders";
import Register from "./Pages/Register";
import { useContext } from "react";
import AuthProvider from "./Context";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/inregistrare" element={<Register />}/>
          <Route path="/clienti" element={<ProtectedRoute><Client /></ProtectedRoute>} />
          <Route path="/cereri" element={<ProtectedRoute><Request /></ProtectedRoute>} />
          <Route path="/oferte" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
          <Route path="/comenzi" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </AuthProvider>

  );
}

export default App;
