import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material"
import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import userApi from "../Utils/User";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const [anchor, setAnchor] = useState(null);
    const isOpen = Boolean(anchor);
    const navigate = useNavigate();

    const handleClick = (e) => {
        setAnchor(e.currentTarget)
    }

    const handleClose = () => {
        setAnchor(null)
    }

    const handleLogout = async () => {
        try {
            const response = await userApi.logoutUser();
            toast.success(response.data.message);
            setUser(null);
            handleClose();
        } catch (err) {
            console.error(err);
        }

    }

    if (!user || !user?.isVerified) {
        return null;
    }

    return (
        <>
            <AppBar position="static" sx={{ height: 80, }}>
                <Toolbar sx={{ minHeight: 80, }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/clients"
                            sx={{ fontSize: "1.1rem", px: 3, py: 1.5 }}
                        >
                            Clienți
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/requests"
                            sx={{ fontSize: "1.1rem", px: 3, py: 1.5 }}
                        >
                            Cereri
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/offers"
                            sx={{ fontSize: "1.1rem", px: 3, py: 1.5 }}
                        >
                            Oferte
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/orders"
                            sx={{ fontSize: "1.1rem", px: 3, py: 1.5 }}
                        >
                            Comenzi
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/production-notes"
                            sx={{ fontSize: "1.1rem", px: 3, py: 1.5 }}
                        >
                            Note de producție
                        </Button>
                    </Box>
                    <Button
                        color="inherit"
                        onClick={handleClick}
                        aria-controls={isOpen ? "user-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={isOpen ? "true" : undefined}
                        sx={{
                            fontSize: "1.2rem",
                            textTransform: "none",
                        }}
                        endIcon={<ArrowDropDown />}
                    >
                        {user.firstName} {user.lastName}
                    </Button>
                    <Menu
                        id="user-menu"
                        anchorEl={anchor}
                        open={isOpen}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem onClick={() => { navigate(`/profile/${user.id}`); handleClose() }}>Vezi profilul</MenuItem>
                        <MenuItem onClick={handleLogout}>Delogare</MenuItem>

                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;