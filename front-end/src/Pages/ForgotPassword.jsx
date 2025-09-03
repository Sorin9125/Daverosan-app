import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import userApi from "../Utils/User";
import { toast } from "react-toastify";

function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: "",
    })
    const [isFormCompleted, setIsFormCompleted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const response = await userApi.sendResetToken(formData);
            toast.success(response.data.message);
            setIsFormCompleted(true);
        } catch (err) {
            toast.error(err.response.data.message);
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
                        Resetare parolă
                    </Typography>
                    {
                        !isFormCompleted ? <form onSubmit={handleSend}>
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
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Trimite
                            </Button>
                        </form> :
                            <Typography
                                variant="body1"
                                align="center"
                                sx={{
                                    mt: 2,
                                    fontSize: '1.1rem',
                                    color: 'text.primary',
                                }}
                            >
                                Pentru a vă putea reseta parola urmați instrucțiunile din mail
                            </Typography>
                    }
                </Paper>
            </Box>
        </>
    )
}

export default ForgotPassword;