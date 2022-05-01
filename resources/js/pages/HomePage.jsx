import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import BgImg from "../assets/images/bg.svg";

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
                    <Grid
                        item
                        md={6}
                        xs={12}
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{ fontWeight: "bold" }}
                                component="h1"
                                variant="h3"
                                className=""
                            >
                                Bienvennu sur la plateforme ADEFTO
                            </Typography>
                            <Typography sx={{ flex: 1, mt: 2 }} component="p">
                                Faites vos cotisations depuis chez vous et en
                                ligne. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Dignissimos commodi rem
                                aspernatur architecto eligendi ea, nemo eaque
                                eveniet tempora hic expedita saepe corrupti a
                                animi. Laborum beatae quam adipisci impedit.
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{mr: 2}}
                                conponent={Link}
                                to="/register"
                            >
                                S'inscrire
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{mr: 2}}
                                conponent={Link}
                                to="/login"
                            >
                                Se connecter
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Box maxHeight={400}>
                            <Typography
                                component="img"
                                src={BgImg}
                                alt="adefto"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default HomePage;
