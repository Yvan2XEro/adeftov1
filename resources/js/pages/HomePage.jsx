import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BgImg from "../assets/images/bg.svg"

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
            <Box>
                <Grid container>
                    <Grid item md={6} xs={12}>
                        <Typography component="h1" variant="h3" className="">
                        Bienvennu sur ADEFTO
                    </Typography>
                    <Typography component="p">
                        Faites vos cotisations depuis chez vous et en ligne.
                    </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography component="img" src={BgImg} alt="adefto" />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default HomePage;
