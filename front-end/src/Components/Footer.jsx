import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../Context";

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
          textAlign: "center"
        }}
      >
          <Typography variant="body2" color="text.secondary">
              Daverosan
          </Typography>
      </Box>
    </>
  );
}

export default Footer;
