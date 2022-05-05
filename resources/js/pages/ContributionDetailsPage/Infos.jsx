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
} from "@mui/material";
import React, { useContext, useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { DataGrid } from "@mui/x-data-grid";
import PaymentModal from "../../components/PaymentModal";

const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 70,
    },
    {
        field: "firstname",
        headerName: "Noms",
        width: 150,
    },
    {
        field: "lastname",
        headerName: "Prenoms",
        width: 150,
    },
    {
        field: "phone",
        headerName: "Numero tel",
        width: 170,
    },
];

function Infos({ contribution, refetch }) {
    const [open, setOpen] = useState(false);

    return (
        <Grid container columnSpacing={{ md: 3 }}>
            <Grid item xs={12} md={6}>
                <Box>
                    <Table sx={{boxShadow: 1}}>
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
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <Box
                        component={Paper}
                        sx={{
                            boxShadow: 5,
                            padding: 2,
                        }}
                    >
                        <Box mt={1}>
                            <Button
                                sx={{ mb: 1 }}
                                startIcon={<AttachMoneyIcon />}
                                variant="contained"
                                onClick={() => setOpen(true)}
                                fullWidth
                            >
                                Payer ma cotisation
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        component={Paper}
                        sx={{
                            marginTop: 2,
                            width: "100%",
                            height: "400px",
                            borderColor: "grey.500",
                            padding: 2,
                            pb: 3,
                        }}
                    >
                        <Typography component="h3" variant="h4">
                            Membres
                        </Typography>
                        <DataGrid
                            columns={columns}
                            rows={contribution?.members||[]}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </Box>
                </Box>
            </Grid>
             <>
             <PaymentModal
                open={open}
                contribution={contribution}
                onClose={() => setOpen(false)}
                onSuccess={() => {
                    setOpen(false)
                    refetch()
                }}
            /></>
        </Grid>
    );
}

export default Infos;
