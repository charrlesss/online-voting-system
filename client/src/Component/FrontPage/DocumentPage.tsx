import { Box } from "@mui/material";
import React from "react";

const DocumentPage: React.FC = (): JSX.Element => {
  return (
  <Box style={{
      width:"99vw",
      height:"100vh",
      position:"relative",
  }}>
    <embed src="final.pdf" type="application/pdf" width="100%" height="100%" />
  </Box>
  )
};

export default DocumentPage;
