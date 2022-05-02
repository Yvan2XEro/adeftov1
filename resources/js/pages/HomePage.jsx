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
                                sx={{ fontWeight: "bold" ,mt:2}}
                                component="h1"
                                variant="h4"
                                align="justify"
                                className=""
                                color="primary"
                            >
                                Bienvenue sur la plateforme  de cotisations ADEFTO
                            </Typography>
                            <Typography sx={{ flex: 1, mt: 2,ml:1 }} component="h5" variant="h4">
                            Faites vos cotisations depuis chez vous et en
                                ligne
                            </Typography>
                            <Typography sx={{ flex: 1, mt: 2,ml:3 }} component="h5" variant="h4">
                            Via des operateurs telephoniques locaux (OM,Momo)
                            </Typography>
                            <Typography sx={{ flex: 1, mt: 2 ,ml:5}} component="h5" variant="h4">
                            Le suivi en temps reel ,en live!
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mr: 2 }}
                                component={Link}
                                to={"/register"}
                            >
                                S'inscrire
                            </Button>
                            <Button
                                color="primary"
                                variant="outlined"
                                component={Link}
                                to={"/login"}
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
