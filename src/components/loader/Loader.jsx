import React from "react";
import { CircularProgress, Box } from "@mui/material";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        color: "#fff",
      }}
    >
      <CircularProgress color="inherit" size={60} />
    </Box>
  );
}

export default Loader;
