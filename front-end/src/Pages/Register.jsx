import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import AuthContext from "../Context/AuthContext";

function Register() {
    const { register, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    })

    useEffect(() => {
        if (user) {
            navigate("/clients");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            register(formData);
        } catch (err) {
            console.error(err);
        }
    }

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
                        Înregistrare
                    </Typography>
                    <form onSubmit={handleRegister}>
                        <TextField
                            variant="outlined"
                            label="Nume"
                            name="lastName"
                            type="test"
                            fullWidth
                            margin="normal"
                            value={formData.lastName}
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
                            label="Prenume"
                            name="firstName"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={formData.firstName}
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
                            Înregistrare
                        </Button>
                    </form>
                </Paper>
            </Box>
        </>
    )
}

export default Register;