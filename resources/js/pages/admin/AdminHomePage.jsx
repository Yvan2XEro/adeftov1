import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Grid, Badge, Paper,Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import BgImg from "../../assets/images/administration.svg";


export default function AdminHomePage() {
    return (
        <Container>
            <Grid container sx={{ mt: 10 }} elevate={6}>
                <Grid item xs={12} md={6} lg={4} sx={{ mt: 2 }}>
                    <NavLink
                        to="/admin/contributions"
                        className="nav-link"
                        activeclassname="active"
                    >
                        <Card component={Paper} sx={{ mx: 1.5, my: 1 }}>
                            <CardActionArea>
                                <CardContent height="440">
                                    <Badge badgeContent={100} color="secondary">
                                        <Icon sx={{ fontSize: 50 }}>
                                            add_business
                                        </Icon>
                                    </Badge>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        Gestion des cotisations
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ mt: 2 }}>
                    <NavLink
                        to="/admin/users"
                        className="nav-link"
                        activeClassName="active"
                    >
                        <Card component={Paper} sx={{ mx: 1.5, my: 1 }}>
                            <CardActionArea>
                                <CardContent>
                                    <Badge badgeContent={100} color="secondary">
                                        <Icon sx={{ fontSize: 50 }}>group</Icon>
                                    </Badge>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        Gestion des membres
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ mt: 2 }}>
                    <NavLink
                        to="/admin/statistics"
                        className="nav-link"
                        activeclassname="active"
                    >
                        <Card component={Paper} sx={{ mx: 1.5, my: 1 }}>
                            <CardActionArea>
                                <CardContent>
                                    <Badge badgeContent={100} color="secondary">
                                        <Icon sx={{ fontSize: 50 }}>
                                            insights
                                        </Icon>
                                    </Badge>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        Statistiques
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid item md={12} xs={12}>
                <Box maxHeight={15}>
                    <Typography component="img" src={BgImg} alt="adefto" />
                </Box>
            </Grid>
            </Grid>

        </Container>
    );
}
