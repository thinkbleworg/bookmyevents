import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar noButtons={true} />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" mb={2}>
          The page you’re looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </Button>
      </Box>
    </>
  );
};

export default PageNotFound;
