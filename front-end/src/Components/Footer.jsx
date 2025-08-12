import { Box, Typography } from "@mui/material";
import { userContext } from "../Context";
import { useContext } from "react";

function Footer() {
  const { user } = useContext(userContext);
  if(!user) {
    return null;
  }
  return (
    <>
      <Box
        component="footer"
        sx={{
          p: 2,
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
