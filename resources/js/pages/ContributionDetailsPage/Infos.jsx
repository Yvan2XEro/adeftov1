import {
    Button,
    Grid,
    Table,
    Box,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Paper,
    TableHead,
} from "@mui/material";
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AddCardIcon from "@mui/icons-material/AddCard";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";

function Infos({ contribution }) {
    const { user } = useContext(AuthContext);

    return (
        <Grid container columnSpacing={{ md: 3 }}>
            <Grid item xs={6} md={6}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Coordonateur</TableCell>
                            <TableCell>
                                {contribution?.user.firstname}{" "}
                                {contribution?.user.lastname}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Seance numero</TableCell>
                            <TableCell>15</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Nombre de membres</TableCell>
                            <TableCell>
                                {contribution?.members.length}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Solde Actuel</TableCell>
                            <TableCell>{contribution?.balance} FCFA</TableCell>
                        </TableRow>
                        <Box mt={2}>
                            <Typography
                                variant="h4"
                                component="h4"
                                align="center"
                            >
                                Description et Objectif:
                            </Typography>
                            <Typography component="p">
                                {contribution?.description}
                            </Typography>
                        </Box>
                    </TableBody>
                </Table>
            </Grid>
            <Grid item md={6}>
                <Box>
                    <Box
                        component={Paper}
                        sx={{
                            border: 0.4,
                            borderColor: "grey.500",
                            padding: 2,
                        }}
                    >
                        <Box mt={1}>

                            <Button
                                sx={{mb: 1}}
                                startIcon={<AttachMoneyIcon />}
                                variant="contained"
                                fullWidth
                            >
                                Payer ma cautisation
                            </Button>
                            {!contribution?.members.find(
                                (m) => m.id === user?.id
                            ) ? (
                                <Button
                                    color="success"
                                    variant="contained"
                                    to="/contributions/1/new-member"
                                    component={Link}
                                    fullWidth
                                    startIcon={<AddCardIcon />}
                                >
                                    Rejoindre la cautisation
                                </Button>
                            ) : (
                                <Button
                                    color="error"
                                    variant="contained"
                                    fullWidth
                                    disabled={
                                        user?.id === contribution?.user_id
                                    }
                                    startIcon={<PersonRemoveIcon />}
                                >
                                    Quitter la cautisation
                                </Button>
                            )}
                        </Box>
                    </Box>
                    <Box
                        component={Paper}
                        sx={{
                            border: 0.4,
                            marginTop: 2,
                            borderColor: "grey.500",
                            padding: 2,
                        }}
                    >
                        <Typography component="h3" variant="h4">
                            Membres
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Noms</TableCell>
                                    <TableCell>Prenom</TableCell>
                                    <TableCell>Phone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contribution?.members.map((m) => (
                                    <TableRow key={m.id}>
                                        <TableCell>{m.firstname}</TableCell>
                                        <TableCell>{m.lastname}</TableCell>
                                        <TableCell>{m.phone}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Infos;
