import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

function Footer() {
  const { user } = useContext(AuthContext);

  if(!user) {
    return null;
  }

  return (
    <>
      <Box
        component="footer"
        sx={{
          p: 3,
          mt: "auto",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          textAlign: "center",
          height: 80,
        }}
      >
          <Typography variant="body2" color="text.secondary" fontSize="1.2rem">
              Daverosan
          </Typography>
      </Box>
    </>
  );
}

export default Footer;
