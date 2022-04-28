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
    Pagination,
    Avatar,
    Switch,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnTotalSilenceIcon from "@mui/icons-material/DoNotDisturbOnTotalSilence";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import EditUserModal from "../../components/EditUserModal";
import {
    allUsers,
    checkIsAdmin,
    deleteUser,
    toggleIsAdmin,
} from "../../services/usersServices";
import Spinner from "../../components/Spinner";
import SearchIcon from "@mui/icons-material/Search";
import { Info } from "@mui/icons-material";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { defaultImage, imagePath } from "../../services/htt";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 5;
function AdminUsersPage() {
    const { user: loggedUser } = useContext(AuthContext);
    const [selected, setSelected] = useState(null);
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
                user.firstname
                    .toLowerCase()
                    .includes(searchKey.toLowerCase()) ||
                user.lastname.toLowerCase().includes(searchKey.toLowerCase()) ||
                user.email.toLowerCase().includes(searchKey.toLowerCase()) ||
                user.phone.toLowerCase().includes(searchKey.toLowerCase())
            );
        });
    }, [users, searchKey]);

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const [page, setPage] = useState(1);
    const [checking, setChecking] = useState(false);

    return (
        <Box m={10}>
            <Box>
                <Typography variant="h4">Gestion des Users</Typography>
            </Box>
            {!loading ? (
                <>
                    <Grid container>
                        <Grid item sm={12} md={6} xs={6}>
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
                            <Box
                                mt={2}
                                sx={{
                                    ml: "auto",
                                    mr: "auto",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    alignSelf: "center",
                                }}
                            >
                                <SearchIcon
                                    sx={{
                                        color: "action.active",
                                        mr: 1,
                                        my: 0.5,
                                    }}
                                />
                                <TextField
                                    id="input-with-sx"
                                    fullWidth
                                    value={searchKey}
                                    onChange={(e) =>
                                        setSearchKey(e.target.value)
                                    }
                                    label="Rechercher par nom, prenom, email"
                                    variant="standard"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <Paper elevate={6}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Avatar</TableCell>
                                            <TableCell>Nom</TableCell>
                                            <TableCell>Prenom</TableCell>
                                            <TableCell>Tel</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>
                                                Infos Detaillées
                                            </TableCell>
                                            <TableCell>Banir</TableCell>
                                            <TableCell>
                                                Administrateur
                                            </TableCell>
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
                                                        <Typography
                                                            variant="p"
                                                            component={Link}
                                                            to={`/admin/users/${user.id}`}
                                                        >
                                                            <Avatar
                                                                src={
                                                                    user.avatar
                                                                        ? imagePath(
                                                                              user.avatar
                                                                          )
                                                                        : defaultImage
                                                                }
                                                            />
                                                        </Typography>
                                                    </TableCell>
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
                                                            onClick={() => {
                                                                setSelected(
                                                                    user
                                                                );
                                                                setOpenModal(
                                                                    true
                                                                );
                                                            }}
                                                            color="success"
                                                            variant="outlined"
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            onClick={() => {
                                                                if (
                                                                    window.confirm(
                                                                        "Etes vous sure de votre action?"
                                                                    )
                                                                ) {
                                                                    deleteUser(
                                                                        user.id
                                                                    )
                                                                        .then(
                                                                            () => {
                                                                                toast.success(
                                                                                    "Utilisateur supprime du systeme!"
                                                                                );
                                                                                fetchUsers();
                                                                            }
                                                                        )
                                                                        .catch(
                                                                            (
                                                                                _
                                                                            ) => {
                                                                                toast.error(
                                                                                    "Erreur lors de la suppression de l'utilisateur"
                                                                                );
                                                                            }
                                                                        );
                                                                }
                                                            }}
                                                            color="error"
                                                            disabled={
                                                                user.id ===
                                                                loggedUser?.id
                                                            }
                                                            variant="outlined"
                                                        >
                                                            <NotInterestedIcon />
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Switch
                                                            checked={checkIsAdmin(
                                                                user
                                                            )}
                                                            disabled={
                                                                user.id ===
                                                                    loggedUser?.id ||
                                                                checking
                                                            }
                                                            onChange={() => {
                                                                setChecking(
                                                                    true
                                                                );
                                                                toggleIsAdmin(
                                                                    user.id
                                                                )
                                                                    .then(
                                                                        () => {
                                                                            setChecking(
                                                                                false
                                                                            );
                                                                            fetchUsers();
                                                                        }
                                                                    )
                                                                    .catch(
                                                                        () => {
                                                                            setChecking(
                                                                                false
                                                                            );
                                                                        }
                                                                    );
                                                            }}
                                                        />
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
                            count={Math.ceil(
                                filteredUsers().length / ITEMS_PER_PAGE
                            )}
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
                selected={selected}
                onSuccess={fetchUsers}
                onClose={() => {
                    setSelected(null);
                    setOpenModal(false);
                }}
            />
        </Box>
    );
}
export default AdminUsersPage;
