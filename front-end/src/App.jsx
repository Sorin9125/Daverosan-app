import { useContext } from "react";
import { userContext } from "./Context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./components/footer/footer";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Client from "./Pages/Client";
import Request from "./Pages/Requests";
import Offers from "./Pages/Offer";
import Orders from "./Pages/Orders";

function App() {
  const { user, loading } = useContext(userContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/clienti" /> : <LoginPage />}
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
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
