import { useState, useContext, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
import userApi from "../Utils/User";
import { useParams } from "react-router-dom";

function UserProfile() {
    const { user, setUser } = useContext(AuthContext);
    const [fetchedUser, setFetchedUser] = useState();
    const [formData, setFormData] = useState({
        password: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async (id) => {
            try {
                const response = await userApi.getUserById(id);
                setFetchedUser(response.data);
                setFormData((prev) => ({
                    ...prev,
                    ...response.data
                }));
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser(id);
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if (user.id != id) {
                return toast.error("Schimba semaforul");
            }
            const response = await userApi.updateUser(id, formData);
            console.log(response.data);
            setUser({
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                email: response.data.user.email,
                id: response.data.user.id,
                isVerified: response.data.user.isVerified,
            })
            setFormData((prev) => ({
                ...prev,
                password: "",
            }))
            setIsEditing(!isEditing);
            toast.success(response.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 6,
                    px: 2,
                    minHeight: "30vh",
                    bgcolor: "background.default",
                }}
            >
                <Typography component="h1"
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ mb: 3 }}>
                    Profil
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(!isEditing)}
                    sx={{
                        textTransform: "none",
                        borderRadius: "12px",
                        mb: 3,
                        px: 4,
                        py: 1.5,
                    }}
                >
                    {isEditing ? "Anulează" : "Editează datele"}
                </Button>
                <Paper
                    elevation={6}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        width: { xs: "100%", sm: 400 },
                        borderRadius: 3,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                        bgcolor: "background.paper",
                    }}>
                    {
                        isEditing ?
                            <><Typography
                                variant="h5"
                                align="center"
                                sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
                            >
                                Actuazlizează datele
                            </Typography>
                                <form onSubmit={handleUpdate}>
                                    <TextField
                                        variant="outlined"
                                        label="Prenume"
                                        name="firstName"
                                        type="text"
                                        fullWidth
                                        margin="normal"
                                        value={formData?.firstName}
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
                                        label="Nume"
                                        name="lastName"
                                        type="text"
                                        fullWidth
                                        margin="normal"
                                        value={formData?.lastName}
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
                                        value={formData?.email}
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
                                        value={formData?.password}
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
                                        Actualizează
                                    </Button>
                                </form>
                            </> :
                            <>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 2 }}>
                                        <Typography variant="subtitle2" color="primary.color">
                                            Prenume
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                            {fetchedUser?.firstName}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 2 }}>
                                        <Typography variant="subtitle2" color="primary.color">
                                            Nume
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                            {fetchedUser?.lastName}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 2 }}>
                                        <Typography variant="subtitle2" color="primary.color">
                                            Email
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                            {fetchedUser?.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </>
                    }
                </Paper>
            </Box>
        </>
    )
}

export default UserProfile;