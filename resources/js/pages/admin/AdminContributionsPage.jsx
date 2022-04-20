import {
    AppBar,
    Badge,
    Box,
    Button,
    FormControl,
    Grid,
    Icon,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Pagination,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const contributions = [
    {
        id: 1,
        name: "Test de cotisation 1",
        description: "Description et objectif de test de cotisation 1",
        members: [
            {
                id: 1,
                firstname: "Jean",
                lastname: "Dupont",
                email: "jean@gmail.com",
                phone: "0123456789",
                isAvailable: true,
            },
            {
                id: 2,
                firstname: "Jean",
                lastname: "Dupont",
                email: "jean@gmail.com",
                phone: "0123456789",
                isAvailable: true,
            },
        ],
    },
    {
        id: 2,
        name: "Test de cotisation 2",
        description: "Description et objectif de test de cotisation 2",
        members: [
            {
                id: 1,
                firstname: "Jean",
                lastname: "Dupont",
                email: "jean@gmail.com",
                phone: "0123456789",
                isAvailable: true,
            },
            {
                id: 2,
                firstname: "Jean",
                lastname: "Dupont",
                email: "jean@gmail.com",
                phone: "0123456789",
                isAvailable: true,
            },
        ],
    },
    {
        id: 3,
        name: "Test de cotisation 3",
        description: "Description et objectif de test de cotisation 3",
        members: [
            {
                id: 1,
                firstname: "Jean",
                lastname: "Dupont",
                email: "jean@gmail.com",
                phone: "0123456789",
                isAvailable: true,
            },
            {
                id: 2,
                firstname: "Jean",
                lastname: "Dupont",
                email: "jean@gmail.com",
                phone: "0123456789",
                isAvailable: true,
            },
            {
                id: 3,
                firstname: "Jean",
                lastname: "Dupont",
                email: "jean@gmail.com",
                phone: "0123456789",
                isAvailable: true,
            },
            {
                id: 4,
                firstname: "Jean",
                lastname: "Dupont",
                email: "jean@gmail.com",
                phone: "0123456789",
                isAvailable: true,
            },
        ],
    },
];

function AdminContributionsPage() {
    const [selected, setSetSelected] = useState(null);
    useEffect(() => {
        if (contributions.length > 0) {
            setSetSelected(contributions[0]);
        }
    }, [contributions]);

    return (
        <Box mt={10} ml={2}>
            <Box>
                <Typography variant="h4">Gestion des cotisations</Typography>
            </Box>
            <Grid container columnSpacing={3}>
                <Grid item xs={12} md={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setSetSelected(null)}
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
                        {contributions.map((item) => (
                            <ListItem
                                components={Paper}
                                color="primary"
                                key={item.id}
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() => setSetSelected(item)}
                                >
                                    <ListItemIcon>
                                        <ArrowForwardIosIcon
                                            color={
                                                item.id === selected?.id
                                                    ? "primary"
                                                    : "inherit"
                                            }
                                        />
                                    </ListItemIcon>
                                    <ListItemText>{item.name}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box sx={{ maxHeight: 500, overflowY: "auto" }}>
                        <SelectedContribution selected={selected} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

const ITEMS_PER_PAGE = 3;
const SelectedContribution = ({ selected }) => {
    const [selectedContribution, setselectedContribution] = useState(null);
    const [page, setPage] = useState(1);
    useEffect(() => {
        setselectedContribution(
            selected
                ? selected
                : {
                      id: null,
                      name: "",
                      description: "",
                      members: [],
                  }
        );
    }, [selected]);

    useEffect(() => {
        setPage(1);
    }, [selected]);
    return (
        <Box>
            <AppBar position="static">
                <Typography variant="h4">
                        {
                            selectedContribution?.id ?
                            selectedContribution?.name: "Nouvelle cotisation"
                        }
                    </Typography>
                {selectedContribution?.id && <Box ml="auto" flexDirection="row" py={1}>
                    <Button sx={{mr: 1}} title="Faire un retrait sur le solde de la cotisation">
                        Solde: 1212 FCFA
                    </Button>
                    <Button  component={Link} to="/admin/contributions/1/adhesions" sx={{mr: 1}} title="Demandes d'hadesion">
                        <Badge badgeContent={100} color="secondary">
                            <Icon sx={{ fontSize: 30 }}>person_add</Icon>
                        </Badge>
                    </Button>
                </Box>}
            </AppBar>
            <Box component="form" mt={1}>
                <Typography mb={1} component="h4" variant="h5">
                    Informations da la cotisation
                </Typography>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        value={selectedContribution?.name}
                        label={!selectedContribution?.name?"Nom de la cotisation":undefined}
                    />
                </FormControl>
                <FormControl sx={{ mt: 2 }} fullWidth>
                    <TextField
                        multiline
                        minRows={4}
                        maxRows={4}
                        value={selectedContribution?.description}
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
            {selectedContribution?.id && <Box mt={2}>
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
                            <TableCell>Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedContribution?.members
                            .slice(
                                (page - 1) * ITEMS_PER_PAGE,
                                (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                            )
                            .map((m) => (
                                <TableRow key={m.id}>
                                    <TableCell>{m.firstname}</TableCell>
                                    <TableCell>{m.lastname}</TableCell>
                                    <TableCell>{m.phone}</TableCell>
                                    <TableCell>
                                        <Switch />
                                    </TableCell>
                                    <TableCell>
                                        <Switch />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <Pagination
                    sx={{ mt: 1 }}
                    page={page}
                    onChange={(e, page) => {
                        setPage(page);
                    }}
                    count={selectedContribution?.members?.length}
                    variant="outlined"
                    shape="rounded"
                />
            </Box>}
        </Box>
    );
};

export default AdminContributionsPage;
