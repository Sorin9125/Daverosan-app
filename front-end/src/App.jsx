import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoginPage from "./Pages/Login";
import Client from "./Pages/Client";
import Request from "./Pages/Requests";
import Offers from "./Pages/Offer";
import Orders from "./Pages/Orders";
import Register from "./Pages/Register";
import AuthProvider from "./Context";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
        >
          <Navbar />
          <Box sx={{ 
            flex: 1,
            p: 3,
            mt: 2,
            mb: 2,
           }}>
            <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/inregistrare" element={<Register />} />
            <Route path="/clienti" element={<ProtectedRoute><Client /></ProtectedRoute>} />
            <Route path="/cereri" element={<ProtectedRoute><Request /></ProtectedRoute>} />
            <Route path="/oferte" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
            <Route path="/comenzi" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
