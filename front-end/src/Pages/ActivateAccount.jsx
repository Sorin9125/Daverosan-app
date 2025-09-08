import { useState, useEffect, useContext } from "react";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import userApi from "../Utils/User";
import { useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ActivateAccount() {
    const [formData, setFormData] = useState({
        code: "",
    });
    const {user,  setUser, setLoading} = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.isVerified) {
            navigate(`/clients`);
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleActivation = async (e) => {
        e.preventDefault();
        try {
            const response = await userApi.activateAccount(formData, id);
            toast.success(response.data.message);
            setUser((prev) => ({...prev, isVerified: true }));
        } catch (err) {
            setUser((prev) => ({...prev, isVerified: false }));
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
                        Verificare mail
                    </Typography>
                    <form onSubmit={handleActivation}>
                        <TextField
                            variant="outlined"
                            label="Cod de verificare"
                            name="code"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={formData.code}
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
                            Trimite
                        </Button>
                    </form>
                </Paper>
            </Box>
        </>
    )
};

export default ActivateAccount;