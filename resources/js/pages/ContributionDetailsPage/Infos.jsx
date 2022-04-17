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
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AddCardIcon from "@mui/icons-material/AddCard";
import { Link } from "react-router-dom";

function Infos() {
    return (
        <Grid container columnSpacing={{ md: 3 }}>
            <Grid item xs={6} md={6}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Coordonateur</TableCell>
                            <TableCell>Jean Robet</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Seance numero</TableCell>
                            <TableCell>15</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Nombre de membres</TableCell>
                            <TableCell>15</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Solde Actuel</TableCell>
                            <TableCell>133000 FCFA</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date de debut</TableCell>
                            <TableCell>22/32/2332</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date de fin</TableCell>
                            <TableCell>22/32/2332</TableCell>
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
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Doloribus delectus quia
                                soluta! Vel corporis itaque deserunt reiciendis
                                commodi ea omnis odio obcaecati minus. Saepe
                                repellendus modi cum ad, fugiat a? Lorem, ipsum
                                dolor sit amet consectetur adipisicing elit.
                                Doloribus delectus quia soluta! Vel corporis
                                itaque deserunt reiciendis commodi ea omnis odio
                                obcaecati minus. Saepe repellendus modi cum ad,
                                fugiat a? Lorem, ipsum dolor sit amet
                                consectetur adipisicing elit. Doloribus delectus
                                quia soluta! Vel corporis itaque deserunt
                                reiciendis commodi ea omnis odio obcaecati
                                minus. Saepe repellendus modi cum ad, fugiat a?
                            </Typography>
                        </Box>
                    </TableBody>
                </Table>
                <Box mt={1}>
                    <Button
                        startIcon={<AttachMoneyIcon />}
                        variant="contained"
                        fullWidth
                    >
                        Payer ma cautisation
                    </Button>
                </Box>
                <Box mt={1}>
                    <Button
                        color="error"
                        variant="contained"
                        fullWidth
                        startIcon={<PersonRemoveIcon />}
                    >
                        Quitter la cautisation
                    </Button>
                </Box>
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
                        <Typography component="h3" variant="h4">
                            Reglements
                        </Typography>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Reglements 1</TableCell>
                                    <TableCell>
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Fuga minima numquam
                                        odio, officia alias, excepturi molestiae
                                        autem error quasi labore at nesciunt
                                        amet, iste reiciendis rerum cum aut quae
                                        sed!
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Reglements 2</TableCell>
                                    <TableCell>22/32/2332</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Box mt={1}>
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
                                <TableRow>
                                    <TableCell>Jean</TableCell>
                                    <TableCell>Robert</TableCell>
                                    <TableCell>123131313</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Jean</TableCell>
                                    <TableCell>Robert</TableCell>
                                    <TableCell>123131313</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Jean</TableCell>
                                    <TableCell>Robert</TableCell>
                                    <TableCell>123131313</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Infos;
