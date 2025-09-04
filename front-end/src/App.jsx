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
import ProductionNotes from "./Pages/ProductionNotes";
import Context from "./Context/Context";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import ActivateAccount from "./Pages/ActivateAccount";

function App() {

  return (
    <BrowserRouter>
      <Context>
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
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
              <Route path="/activate-account/:email" element={<ActivateAccount />}/>
              <Route path="/clients" element={<ProtectedRoute><Client /></ProtectedRoute>} />
              <Route path="/requests" element={<ProtectedRoute><Request /></ProtectedRoute>} />
              <Route path="/offers" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/production-notes" element={<ProtectedRoute><ProductionNotes /></ProtectedRoute>} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Context>
    </BrowserRouter>

  );
}

export default App;
