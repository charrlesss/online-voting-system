import { Box } from "@mui/material";
import React from "react";
import "../style/loaderSpinner.css";

const LoaderApi: React.FC = () => {
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1000,
        background: "whitesmoke",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box className="spinner">
        <Box className="cube1"></Box>
        <Box className="cube2"></Box>
      </Box>
    </Box>
  );
};

export default LoaderApi;
