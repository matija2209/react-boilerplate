import React from "react";
import { Box, Container, Typography } from "@mui/material";

function UploadPage() {
  return (
    <Container sx={{ py: 2 }}>
      <Box component={"header"} sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          component={"h1"}
          fontWeight={500}
          color="initial"
        >
          Add Audio Recording
        </Typography>
        <Typography variant="body1">
          Enter patient information and upload audio recordings.
        </Typography>
      </Box>

    </Container>
  );
}

export default UploadPage;
