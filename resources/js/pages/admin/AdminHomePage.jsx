import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Container, Grid } from '@mui/material';
import { NavLink, useNavigate } from "react-router-dom";


export default function AdminHomePage() {
    return (
        <Container>

            <Grid container sx={{ mt: 10 }}>
                <Grid item xs={12} md={6} lg={4} sx={{  mt:2,}}>
                    <NavLink to="/" className="nav-link" activeClassName="active">
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://source.unsplash.com/random"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Gestion des adhesions
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{  mt:2,}}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://source.unsplash.com/random"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Gestion des membres
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{mt:2,}}>
                    <Card >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://source.unsplash.com/random"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Gestion des cotisations
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ mt:2,}}>
                    <Card >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://source.unsplash.com/random"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{  mt:2,}}>
                    <Card >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://source.unsplash.com/random"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ mt:2,}}>
                    <Card >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://source.unsplash.com/random"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ mt:2,}}>
                    <Card >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://source.unsplash.com/random"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

            </Grid>
        </Container>
    );
}
