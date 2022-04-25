import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Container, Grid, Badge, Paper } from '@mui/material';
import { NavLink, useNavigate } from "react-router-dom";
import Icon from '@mui/material/Icon';
import { AuthContext } from '../../contexts/AuthContextProvider';
import trust from '../../services/trust';
import { toast } from 'react-toastify';

export default function AdminHomePage() {
    const {user} = React.useContext(AuthContext);
    const navigate = useNavigate();
    // React.useEffect(() => {
    //     if(!trust.isAdmin(user) || !trust.isSuperAdmin(user)){
    //         toast.error('Vous n\'avez pas les droits nécessaires pour accéder à cette page');
    //         navigate('/');
    //     }
    // }, [user]);

    return (
        <Container>
            <Grid container sx={{ mt: 10 }} elevate={6}>
                <Grid item xs={12} md={6} lg={4} sx={{ mt: 2, }}>
                    <NavLink to="/admin/contributions" className="nav-link" activeclassname="active" Style="text-decoration: none">
                        <Card component={Paper} sx={{mx: 1.5, my: 1}}>
                            <CardActionArea>
                                <CardContent height="440">
                                    <Badge badgeContent={100} color="secondary">
                                        <Icon sx={{ fontSize: 50 }}>
                                            add_business
                                        </Icon>
                                    </Badge>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Gestion des cotisations
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ mt: 2, }}>
                    <NavLink to="/admin" className="nav-link" activeclassname="active" Style="text-decoration: none">
                        <Card component={Paper} sx={{mx: 1.5, my: 1}}>
                            <CardActionArea>
                                <CardContent height="440">
                                    <Badge badgeContent={100} color="secondary">
                                        <Icon sx={{ fontSize: 50 }}>description</Icon>
                                    </Badge>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Gestion des adhesions
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ mt: 2, }}>
                    <NavLink to="/admin" className="nav-link" activeclassname="active" Style="text-decoration: none">
                        <Card component={Paper} sx={{mx: 1.5, my: 1}}>
                            <CardActionArea>
                                <CardContent>
                                    <Badge badgeContent={100} color="secondary">
                                        <Icon sx={{ fontSize: 50 }}>group</Icon>
                                    </Badge>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Gestion des membres
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ mt: 2, }}>
                    <NavLink to="/admin" className="nav-link" activeclassname="active" Style="text-decoration: none">
                        <Card component={Paper} sx={{mx: 1.5, my: 1}}>
                            <CardActionArea>
                                <CardContent>
                                    <Badge badgeContent={100} color="secondary">
                                        <Icon sx={{ fontSize: 50 }}> attach_money</Icon>
                                    </Badge>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Gestion des caisses
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ mt: 2, }}>
                    <NavLink to="/admin" className="nav-link" activeclassname="active" Style="text-decoration: none">
                        <Card component={Paper} sx={{mx: 1.5, my: 1}}>
                            <CardActionArea>
                                <CardContent>
                                    <Badge badgeContent={100} color="secondary">
                                        <Icon sx={{ fontSize: 50 }}>insights</Icon>
                                    </Badge>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Statistiques
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ mt: 2, }}>
                    <NavLink to="/admin" className="nav-link" activeclassname="active" Style="text-decoration: none">
                        <Card component={Paper} sx={{mx: 1.5, my: 1}}>
                            <CardActionArea>
                                <CardContent>
                                    <Badge badgeContent={100} color="secondary">
                                        <Icon sx={{ fontSize: 50 }}>construction</Icon>
                                    </Badge>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Parametres
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>

            </Grid>
        </Container>
    );
}
