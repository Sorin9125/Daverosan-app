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

function App() {

  return (
    <Context>
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
            <Route path="/register" element={<Register />} />
            <Route path="/clients" element={<ProtectedRoute><Client /></ProtectedRoute>} />
            <Route path="/requests" element={<ProtectedRoute><Request /></ProtectedRoute>} />
            <Route path="/offers" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/productionNotes" element={<ProtectedRoute><ProductionNotes /></ProtectedRoute>}/>
          </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </Context>

  );
}

export default App;
