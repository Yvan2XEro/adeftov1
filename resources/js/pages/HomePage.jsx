import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BgImg from "../assets/images/bg.svg";
import { AuthContext } from "../contexts/AuthContextProvider";

function HomePage() {
    const {isAuthenticated} = useContext(AuthContext)
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
                            <Box display="flex" flexDirection="row">
                                <Typography
                                    sx={{ fontWeight: "bold" }}
                                    component="h1"
                                    variant="h3"
                                    color="primary"
                                >
                                    Bienvenue sur la plateforme des cotisations ADEFTO
                                </Typography>
                            </Box>
                            <Typography sx={{ flex: 1, mt: 2 }} component="p">
                                Faites vos cotisations depuis chez vous et en
                                ligne via des operateurs telephoniques locaux
                                (OM,Momo). Le suivi en temps reel ,en live!
                            </Typography>
                        </Box>
                        {!isAuthenticated ? <Box display="flex" justifyContent="space-between">
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
                        </Box>:<Button
                                color="primary"
                                variant="contained"
                                component={Link}
                                to={"/contributions"}
                            >
                                Cautiser maintenant
                            </Button>}
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
