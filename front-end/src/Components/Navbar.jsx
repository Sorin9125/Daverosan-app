import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material"
import { useContext, useState } from "react";
import { AuthContext } from "../Context";

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
            <AppBar position="static" >
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/clienti"
                        >
                            Clienți
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/cereri"
                        >
                            Cereri
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/oferte"
                        >
                            Oferte
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/comenzi"
                        >
                            Comenzi
                        </Button>
                    </Box>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ cursor: "pointer" }}
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