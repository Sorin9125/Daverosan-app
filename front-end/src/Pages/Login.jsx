import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, Link } from '@mui/material';
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
import userApi from "../Utils/User";

function LoginPage() {
    const {  user, setUser, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [failedAttempts, setFailedAttempts] = useState(0)

    useEffect(() => {
        if (user) {
            navigate(`/clients`);
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userApi.loginUser(formData);
      setUser(response.data.user);
    } catch (err) {
      setFailedAttempts((prev) => prev + 1);
      toast.error(err.response.data.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor="background.default"
                px={2}
            >
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        width: { xs: '100%', sm: 400 },
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                        bgcolor: "background.paper"
                    }}>
                    <Typography
                        variant="h5"
                        component="h1"
                        gutterBottom
                        align="center"
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main'
                        }}
                    >
                        Autentificare
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            slotProps={{
                                inputLabel: {
                                    sx: {
                                        position: 'relative',
                                        transform: 'none',
                                        fontSize: '1.1rem',
                                        color: 'primary.main',
                                        mb: 1,
                                    },
                                },
                                input: {
                                    color: '#000',
                                    fontSize: '1.1rem',
                                    padding: '12.5px 14px',
                                }
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Parolă"
                            name="password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            slotProps={{
                                inputLabel: {
                                    sx: {
                                        position: 'relative',
                                        transform: 'none',
                                        fontSize: '1.1rem',
                                        color: 'primary.main',
                                        mb: 1,
                                    },
                                },
                                input: {
                                    color: '#000',
                                    fontSize: '1.1rem',
                                    padding: '12.5px 14px',
                                }
                            }}
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
                    {
                        failedAttempts >= 3 ? <Link
                            component="button"
                            variant="body2"
                            onClick={() => { navigate("/forgot-password"); setFailedAttempts(0) }}
                            sx={{
                                color: 'primary.main',
                                textDecoration: 'underline',
                                fontWeight: 500,
                                ml: 0.5,
                                cursor: 'pointer',
                                alignContent: 'center',
                                '&:hover': {
                                    color: 'primary.dark',
                                    textDecoration: 'none',
                                },
                            }}>Am uitat parola</Link> : <></>
                    }
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Nu ai cont?
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => { navigate("/register") }}
                        >
                            Înregistrează-te
                        </Button>
                    </Typography>
                </Paper>
            </Box>
        </>
    )
}

export default LoginPage;