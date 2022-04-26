import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Spinner() {
    return (
        <Box display="flex" justifyContent="center">
            <CircularProgress />
        </Box>
    );
}

export default Spinner;
