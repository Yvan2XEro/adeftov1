import {
    Box,
    Button,
    FormControl,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";

function AdminContributionsPage() {
    return (
        <Box mt={10} mx={2}>
            <Box>
                <Typography variant="h4">Gestion des cotisations</Typography>
            </Box>
            <Grid container columnSpacing={3}>
                <Grid item xs={12} md={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                    >
                        Creer une nouvelle cautisation
                    </Button>

                    <List
                        sx={{ width: "100%", bgcolor: "background.paper" }}
                        subheader={
                            <ListSubheader
                                component="div"
                                id="nested-list-subheader"
                            >
                                Liste de cotisations
                            </ListSubheader>
                        }
                    >
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {}}>
                                <ListItemIcon>
                                    <ArrowForwardIosIcon />
                                </ListItemIcon>
                                <ListItemText>la reunion de test</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {}}>
                                <ListItemIcon>
                                    <ArrowForwardIosIcon />
                                </ListItemIcon>
                                <ListItemText>la reunion de test</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {}}>
                                <ListItemIcon>
                                    <ArrowForwardIosIcon />
                                </ListItemIcon>
                                <ListItemText>la reunion de test</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {}}>
                                <ListItemIcon>
                                    <ArrowForwardIosIcon />
                                </ListItemIcon>
                                <ListItemText>la reunion de test</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={8}>
                    <SelectedContributions />
                </Grid>
            </Grid>
        </Box>
    );
}

const SelectedContributions = () => {
    return (
        <Box>
            <Box component="form">
                <Typography mb={1} component="h4" variant="h5">
                    Informations da la cotisation
                </Typography>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        value="Test de cotisation"
                        label="Nom de la cotisation"
                    />
                </FormControl>
                <FormControl sx={{ mt: 2 }} fullWidth>
                    <TextField
                        multiline
                        minRows={4}
                        maxRows={4}
                        fullWidth
                        label="Description et objectif"
                    />
                </FormControl>
                <LoadingButton
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Enregistrer
                </LoadingButton>
            </Box>
            <Box mt={2}>
                <Typography mb={1} component="h4" variant="h5">
                    Membres da la cotisation
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>Prenom</TableCell>
                            <TableCell>Tel</TableCell>
                            <TableCell>Membre special</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Jean</TableCell>
                            <TableCell>Robert</TableCell>
                            <TableCell>323232</TableCell>
                            <TableCell>
                                <Switch />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default AdminContributionsPage;
