import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

const Loader: React.FC = (): JSX.Element => {
  return (
    <Box style={{ width: "100%", height: "100vh" }}>
      <LinearProgress />
    </Box>
  );
};
export { Loader };
