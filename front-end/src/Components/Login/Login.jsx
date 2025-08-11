import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userApi from "../../Utils/User";
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { userContext } from "../../Context";
import { useContext } from "react";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { setUser, setLoading} = useContext(userContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await userApi.loginUser(formData);
            setUser(response.data.user); 
            navigate("/clienti");
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor="#f5f5f5"
            >
                <Paper elevation={3} sx={{ p: 4, width: 350 }}>
                    <Typography variant="h5" component="h1" gutterBottom align="center">
                        Autentificare
                    </Typography>
                    <form onSubmit={login}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Parolă"
                            name="password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Autentificare
                        </Button>
                    </form>
                </Paper>
            </Box>
        </>
    )
}

export default Login;