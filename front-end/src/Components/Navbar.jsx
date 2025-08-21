import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material"
import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [anchor, setAnchor] = useState(null);
    const isOpen = Boolean(anchor);

    const handleClick = (e) => {
        setAnchor(e.currentTarget)
    }

    const handleClose = () => {
        setAnchor(null)
    }

    const handleLogout = async () => {
        try {
            await logout();
            handleClose()
        } catch (err) {
            console.error(err);
        }

    }

    if (!user) {
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
                            to="/productionNotes"
                            sx={{ fontSize: "1.1rem", px: 3, py: 1.5 }}
                        >
                            Note de producție
                        </Button>
                    </Box>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ cursor: "pointer", fontSize: "1.2rem" }}
                        onClick={handleClick}
                        aria-controls={isOpen ? "user-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={isOpen ? "true" : undefined}
                    >
                        {user.firstName} {user.lastName}
                        <ArrowDropDown />
                    </Typography>
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
                        <MenuItem onClick={handleLogout}>Delogare</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;