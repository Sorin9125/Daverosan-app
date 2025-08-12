import { useContext } from "react";
import { userContext } from "./Context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/Login";
import Client from "./Pages/Client";
import Request from "./Pages/Requests";
import Offers from "./Pages/Offer";
import Orders from "./Pages/Orders";
import Register from "./Pages/Register";

function App() {
  const { user, loading } = useContext(userContext);

  if (loading) {
    return <div>Asteptati</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        {user && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />
          <Route 
            path="/inregistrare"
            element={< Register/>}  
          />
          <Route
            path="/clienti"
            element={user ? <Client /> : <Navigate to="/" />}
          />
          <Route
            path="/cereri"
            element={user ? <Request /> : <Navigate to="/" />}
          />
          <Route
            path="/oferte"
            element={user ? <Offers /> : <Navigate to="/" />}
          />
          <Route
            path="/comenzi"
            element={user ? <Orders /> : <Navigate to="/" />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>

  );
}

export default App;
