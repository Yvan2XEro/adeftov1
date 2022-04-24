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
import { AuthContext } from "../../contexts/AuthContextProvider";

function AdminContributionsPage() {
    const [selected, setSetSelected] = useState(null);
    const [contributions, setContributions] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

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
        getAllContributions().then((response) => {
            setContributions(response.data.data);
        });
    }, []);
    return (
        <Box mt={10} ml={2}>
            <Box>
                <Typography variant="h4">Gestion des cotisations</Typography>
            </Box>
            <Grid container columnSpacing={3}>
                <Grid item xs={12} md={4}>
                    <Button
                        variant={selected ? "outlined" : "contained"}
                        color="primary"
                        onClick={() => {
                            setSetSelected(null)
                            setSearchParams({})
                        }}
                        startIcon={<AddIcon />}
                    >
                        Creer une nouvelle cotisation
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
                                    onClick={() => {
                                        setSetSelected(item.id)
                                         setSearchParams({selected_id: item.id})
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
                                    <ListItemText>{item.name}</ListItemText>
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
    const [exp, setExp] = useState({ info: true, members: false });
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
                    console.log(response.data.specials_members);
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

    const membershipsCount = useCallback(() => {
        return selectedContribution?.membership_requests?.filter(
            (i) => !i.is_accepted
        ).length;
    }, [selectedContribution]);

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
    const { user } = useContext(AuthContext);
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
                        <Button
                            component={Link}
                            to={`/admin/contributions/${selectedContribution?.id}/adhesions`}
                            sx={{ mr: 1 }}
                            title={`${membershipsCount()} Demande${
                                membershipsCount() != 1 ? "s" : ""
                            } d'hadesion`}
                        >
                            <Badge badgeContent={membershipsCount()}>
                                <Icon sx={{ fontSize: 30 }}>person_add</Icon>
                            </Badge>
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
                <>
                    <Accordion>
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
                                                <TableCell>
                                                    {m.firstname}
                                                </TableCell>
                                                <TableCell>
                                                    {m.lastname}
                                                </TableCell>
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
                                                                isSpecialMember(
                                                                    m
                                                                )
                                                            ) {
                                                                setChecking(
                                                                    true
                                                                );
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
                                                                    .catch(
                                                                        () => {
                                                                            setChecking(
                                                                                false
                                                                            );
                                                                        }
                                                                    );
                                                            } else {
                                                                setChecking(
                                                                    true
                                                                );
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
                                                                    .catch(
                                                                        () => {
                                                                            setChecking(
                                                                                false
                                                                            );
                                                                        }
                                                                    );
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
                                count={selectedContribution?.members?.length}
                                variant="outlined"
                                shape="rounded"
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography mb={1} component="h4" variant="h5">
                                Les reglements
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatem temporibus nihil, error
                            reprehenderit veniam nam quis mollitia. Incidunt
                            explicabo sed nam, sequi aliquid omnis atque
                            accusantium exercitationem, nostrum quasi debitis!
                        </AccordionDetails>
                    </Accordion>
                </>
            )}
        </Box>
    );
};

export default AdminContributionsPage;
