import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function HomePage() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        pl: 6,
      }}
    >
      <Typography component="h1" variant="h3">
        Bienvennu sur ADEFTO
      </Typography>
      <Typography component="p">
        Faites vos cautisations depuis chez vous et en ligne.
      </Typography>
    </Box>
  );
}

export default HomePage;
