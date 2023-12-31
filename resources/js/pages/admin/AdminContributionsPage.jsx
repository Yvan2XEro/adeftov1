import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
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
import React, { useCallback, useEffect, useState, useContext } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Link, useSearchParams } from "react-router-dom";
import {
    getAllContributions,
    updateContribution,
    addContribution,
    removeSpecialMember,
    addSpecialMember,
    getContribution,
} from "../../services/contributionsServices";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Spinner from "../../components/Spinner";
import SearchIcon from '@mui/icons-material/Search';
import {AuthContext} from '../../contexts/AuthContextProvider'


function AdminContributionsPage() {
    const [selected, setSetSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [contributions, setContributions] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const {isAdmin} = useContext(AuthContext);

    useEffect(() => {
        if (contributions.length > 0) {
            const id = !!searchParams?.get("selected_id")
                ? searchParams?.get("selected_id")
                : contributions[0].id;
            setSetSelected(id);
        }
    }, [contributions]);
    useEffect(() => {
        fetchContributions();
    }, []);
    const fetchContributions = useCallback(async () => {
        setLoading(true);
        getAllContributions()
            .then((response) => {
                setContributions(response.data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    return (
        <Box mt={10} ml={2}>
            {!loading ? (
                <>
                    <Box>
                        <Typography variant="h4">
                            Gestion des cotisations
                        </Typography>
                    </Box>
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} md={4}>
                            <List
                                sx={{
                                    width: "100%",
                                    bgcolor: "background.paper",
                                }}
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
                                            onClick={() => {
                                                setSetSelected(item.id);
                                                setSearchParams({
                                                    selected_id: item.id,
                                                });
                                            }}
                                        >
                                            <ListItemIcon>
                                                <ArrowForwardIosIcon
                                                    color={
                                                        item.id === selected
                                                            ? "primary"
                                                            : "inherit"
                                                    }
                                                />
                                            </ListItemIcon>
                                            <ListItemText>
                                                {item.name}
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ maxHeight: 500, overflowY: "auto" }}>
                                <SelectedContribution
                                    selectedId={selected}
                                    setSetSelected={setSetSelected}
                                    onUpdate={() => fetchContributions()}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <Spinner />
            )}
        </Box>
    );
}

const ITEMS_PER_PAGE = 3;
const shema = yup.object().shape({
    name: yup.string().min(3).required(),
    description: yup.string().min(3).required(),
});
const SelectedContribution = ({ selectedId, onUpdate, setSetSelected }) => {
    const [selectedContribution, setselectedContribution] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);
    const [exp, setExp] = useState({ info: true, members: true });
    useEffect(() => {
        setPage(1);
        if (selectedId) {
            fetchSelectContribution(selectedId);
        }
        reset();
    }, [selectedId]);

    const fetchSelectContribution = useCallback(
        async (selectedId) => {
            setLoading(true);
            getContribution(selectedId)
                .then((response) => {
                    setselectedContribution(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error.response);
                    toast.error(
                        "Erreur lors de la récupération de la cotisation"
                    );
                });
        },
        [getContribution]
    );

    const isSpecialMember = (member) => {
        return selectedContribution.specials_members.find((m) => {
            return m.id === member.id;
        })
            ? true
            : false;
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(shema),
    });
    const submit = useCallback(
        (data) => {
            if (selectedId) {
                updateContribution(selectedId, data).then(() => {
                    onUpdate();
                    toast.success("La cotisation a été modifiée avec succès");
                });
            } else {
                addContribution(data).then((response) => {
                    setSetSelected(response.data.id);
                    onUpdate();
                    toast.success("La cotisation a été ajoutée avec succès");
                });
            }
        },
        [selectedContribution, onUpdate]
    );
    const [searchKey, setSearchKey] = useState("");
    const filteredMembers = useCallback(() => {
        return selectedContribution?.members?.filter(
            (i) =>
                i.firstname.toLowerCase().includes(searchKey.toLowerCase()) ||
                i.lastname.toLowerCase().includes(searchKey.toLowerCase()) ||
                i.email.toLowerCase().includes(searchKey.toLowerCase())
        );
    }, [selectedContribution, searchKey]);
    return (
        <Box>
            <AppBar position="static" color="inherit">
                <Typography variant="h4">
                    {selectedId
                        ? selectedContribution?.name
                        : "Nouvelle cotisation"}
                </Typography>
                {selectedId && (
                    <Box ml="auto" flexDirection="row" py={1}>
                        <Button
                            sx={{ mr: 1 }}
                            title="Faire un retrait sur le solde de la cotisation"
                        >
                            Solde: {selectedContribution?.balance} FCFA
                        </Button>
                    </Box>
                )}
            </AppBar>
            <Accordion expanded={exp.info}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={() => setExp((p) => ({ ...exp, info: !p.info }))}
                >
                    <Typography mb={1} component="h4" variant="h5">
                        Informations da la cotisation
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        component="form"
                        mt={1}
                        onSubmit={handleSubmit(submit)}
                    >
                        <FormControl fullWidth>
                            <TextField
                                multiline
                                defaultValue={
                                    selectedId ? selectedContribution?.name : ""
                                }
                                error={!!errors?.name}
                                fullWidth
                                {...register("name")}
                                label="Nom de la cotisation"
                            />
                            {!!errors.name && (
                                <Typography
                                    color="error"
                                    component="span"
                                    variant="caption"
                                >
                                    {errors.name?.message}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl sx={{ mt: 2 }} fullWidth>
                            <TextField
                                multiline
                                minRows={4}
                                maxRows={4}
                                defaultValue={
                                    selectedId
                                        ? selectedContribution?.description
                                        : ""
                                }
                                error={!!errors?.description}
                                fullWidth
                                {...register("description")}
                                label="Description et objectif"
                            />
                            {!!errors.description && (
                                <Typography
                                    color="error"
                                    component="span"
                                    variant="caption"
                                >
                                    {errors.description?.message}
                                </Typography>
                            )}
                        </FormControl>
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={isSubmitting}
                            disabled={!selectedId && !isValid}
                            sx={{ mt: 2 }}
                        >
                            Enregistrer
                        </LoadingButton>
                    </Box>
                </AccordionDetails>
            </Accordion>
            {selectedId && selectedContribution?.id && (
                <Accordion expanded={exp.members}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        onClick={() =>
                            setExp((p) => ({ ...exp, members: !p.members }))
                        }
                    >
                        <Typography mb={1} component="h4" variant="h5">
                            Membres da la cotisation
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                                sx={{ color: "action.active", mr: 1, my: 0.5 }}
                            />
                            <TextField
                                id="input-with-sx"
                                fullWidth
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
                                label="Rechercher par nom, prenom, email"
                                variant="standard"
                            />
                        </Box>
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
                                {filteredMembers()
                                    .map((member) => ({
                                        ...member,
                                        isSpecial: isSpecialMember(member),
                                    }))
                                    .slice(
                                        (page - 1) * ITEMS_PER_PAGE,
                                        (page - 1) * ITEMS_PER_PAGE +
                                            ITEMS_PER_PAGE
                                    )
                                    .map((m) => (
                                        <TableRow key={m.id}>
                                            <TableCell>{m.firstname}</TableCell>
                                            <TableCell>{m.lastname}</TableCell>
                                            <TableCell>{m.phone}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    disabled={
                                                        checking ||
                                                        m?.id ===
                                                            selectedContribution.user_id
                                                    }
                                                    checked={
                                                        m.isSpecial ||
                                                        m.id ===
                                                            selectedContribution.user_id
                                                    }
                                                    onChange={() => {
                                                        if (
                                                            isSpecialMember(m)
                                                        ) {
                                                            setChecking(true);
                                                            removeSpecialMember(
                                                                selectedContribution.id,
                                                                m.id
                                                            )
                                                                .then(
                                                                    async () => {
                                                                        setChecking(
                                                                            false
                                                                        );
                                                                        await fetchSelectContribution(
                                                                            selectedId
                                                                        );
                                                                    }
                                                                )
                                                                .catch(() => {
                                                                    setChecking(
                                                                        false
                                                                    );
                                                                });
                                                        } else {
                                                            setChecking(true);
                                                            addSpecialMember(
                                                                selectedContribution.id,
                                                                m.id
                                                            )
                                                                .then(
                                                                    async () => {
                                                                        setChecking(
                                                                            false
                                                                        );
                                                                        await fetchSelectContribution(
                                                                            selectedId
                                                                        );
                                                                    }
                                                                )
                                                                .catch(() => {
                                                                    setChecking(
                                                                        false
                                                                    );
                                                                });
                                                        }
                                                        setselectedContribution(
                                                            {
                                                                ...selectedContribution,
                                                            }
                                                        );
                                                    }}
                                                />
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
                            count={
                                Math.ceil(filteredMembers().length /
                                ITEMS_PER_PAGE)
                            }
                            variant="outlined"
                            shape="rounded"
                        />
                    </AccordionDetails>
                </Accordion>
            )}
        </Box>
    );
};

export default AdminContributionsPage;
