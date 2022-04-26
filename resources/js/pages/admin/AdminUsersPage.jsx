import {
    Box,
    Button,
    Grid,
    Icon,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Autocomplete,
    Stack,
    Pagination,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnTotalSilenceIcon from "@mui/icons-material/DoNotDisturbOnTotalSilence";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import EditUserModal from "../../components/EditUserModal";
import { allUsers } from "../../services/usersServices";
import Spinner from "../../components/Spinner";
import SearchIcon from '@mui/icons-material/Search';

const ITEMS_PER_PAGE = 5;
function AdminUsersPage() {
    const [selected, setSetSelected] = useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState("");
    const fetchUsers = React.useCallback(() => {
        allUsers()
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const filteredUsers = React.useCallback(() => {
        return users.filter((user) => {
            return (
                user.firstname.toLowerCase().includes(searchKey.toLowerCase()) ||
                user.lastname.toLowerCase().includes(searchKey.toLowerCase()) ||
                user.email.toLowerCase().includes(searchKey.toLowerCase()) ||
                user.phone.toLowerCase().includes(searchKey.toLowerCase())
        );  });
    }, [users, searchKey]);

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const [page, setPage] = useState(1);

    return (
        <Box mt={10} ml={2}>
            <Box>
                <Typography variant="h4">Gestion des Users</Typography>
            </Box>
            {!loading ? (
                <>
                    <Grid container>
                        <Grid item sm={12} md={6} xs={6} >
                        <Button
                            variant={selected ? "outlined" : "contained"}
                            color="primary"
                            onClick={() => {
                                setOpenModal(true);
                            }}
                            startIcon={<AddIcon />}
                        >
                            Creer un nouvel utilisateur
                        </Button>
                        <Box  mt={2} sx={{ ml: 'auto', mr: 'auto',display: "flex", alignItems: "flex-end", alignSelf: 'center' }}>
                            <SearchIcon
                                sx={{ color: "action.active", mr: 1, my: 0.5 }}
                            />
                            <TextField
                                id="input-with-sx"
                                fullWidth
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
                                label="Reachercher par nom, prenom, email"
                                variant="standard"
                            />
                        </Box>
                    </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 2 }} xs={12} md={12}>
                        <Grid item xs={12} md={12}>
                            <Paper elevate={6}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nom</TableCell>
                                            <TableCell>Prenom</TableCell>
                                            <TableCell>Tel</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>
                                                Infos Detaillées
                                            </TableCell>
                                            <TableCell>Modifier</TableCell>
                                            <TableCell>Muter</TableCell>
                                            <TableCell>Banir</TableCell>
                                            <TableCell>Promouvoir</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredUsers()
                                            .slice(
                                                (page - 1) * ITEMS_PER_PAGE,
                                                (page - 1) * ITEMS_PER_PAGE +
                                                    ITEMS_PER_PAGE
                                            )
                                            .map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        {user.firstname}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.lastname}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.phone}
                                                    </TableCell>

                                                    <TableCell>
                                                        {user.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            color="primary"
                                                            variant="outlined"
                                                        >
                                                            <Icon
                                                                sx={{
                                                                    fontSize: 30,
                                                                }}
                                                            >
                                                                information-circle
                                                            </Icon>
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            color="primary"
                                                            variant="outlined"
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            color="primary"
                                                            variant="outlined"
                                                        >
                                                            <DoNotDisturbOnTotalSilenceIcon />
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            color="primary"
                                                            variant="outlined"
                                                        >
                                                            <NotInterestedIcon />
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            color="primary"
                                                            variant="outlined"
                                                        >
                                                            <UpgradeIcon />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                        <Pagination
                            sx={{ mt: 1 }}
                            page={page}
                            onChange={(_, page) => {
                                setPage(page);
                            }}
                            count={users.length / ITEMS_PER_PAGE}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Grid>
                </>
            ) : (
                <Spinner />
            )}

            <EditUserModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </Box>
    );
}
export default AdminUsersPage;
