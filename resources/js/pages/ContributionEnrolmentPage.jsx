import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { AuthContext } from "../contexts/AuthContextProvider";
import {
    addMembership,
    deleteMembership,
    getContribution,
    getMembershipByUserAndContribution,
    updateMembership,
} from "../services/contributionsServices";

function ContributionEnrolmentPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [fetching, setFetching] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);
    const [membership, setMembership] = React.useState({
        message: "",
        id: null,
    });
    const { id } = useParams();
    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        if(membership.id===null) {
             addMembership(id, {message: membership.message})
            .then((response) => {
                setMembership(response.data);
                setLoading(false);
                toast.success("Votre demande a bien été enregistrée.");
            })
            .catch((errr) => {
                setLoading(false);
                if (errr.response.status >= 500) {
                    toast.error(
                        "Une erreur s'est produite! veillez reessayer plus tard!"
                    );
                }
            });
        } else {
            updateMembership(membership.id, {message: membership.message||''})
            .then(() => {
                setLoading(false);
                toast.success("Votre demande a bien été modifiée");
            }).catch((errr) => {
                setLoading(false);
                if (errr.response.status >= 500) {
                    toast.error(
                        "Une erreur s'est produite! veillez reessayer plus tard!"
                    );
                }
            });
        }
    };
    const fetchMembership = async() => {
        setFetching(true);
        await getMembershipByUserAndContribution(id)
            .then((response) => {
                setFetching(false);
                setMembership(response.data);
                if(response.data.is_accepted) {
                    toast.success("Vous êtes déjà inscrit à cette cotisation");
                    navigate(`/contributions/${id}/details`);
                }
            })
            .catch((err) => {
                setFetching(false);
                if (err.response.status >= 500) {
                    setMessage(
                        "Une erreur s'est produite! veillez reessayer plus tard!"
                    );
                }
            });
    };
    const [contribution, setContribution] = React.useState(null);
    React.useEffect(() => {
        fetchMembership();
        getContribution(id).then((response) => {
            setContribution(response.data);
        }).catch((err) => {
            if (err.response.status >= 500) {
                toast.error("Une erreur s'est produite! veillez reessayer plus tard!");
            }else{
                toast.error("Cette cotisation n'existe pas");
            }
        });

    }, []);

    return (
        <Container sx={{pt: 10}}>
            {!fetching?<Box mt={10} ml={1} component="form" onSubmit={submit}>
                <Typography component="h1" variant="h4">
                    {membership.id===null?"Demande d'inscription": "Modifier ma demande"}
                </Typography>
                <Typography component="h3" mt={1} variant="h5">
                    {contribution?.name}
                </Typography>
                <Grid container>
                    <Grid item xs={12} md={6} borderTop={0.3}>
                        <Typography component="form">
                            <FormControl sx={{ mt: 2 }} fullWidth>
                                <FormLabel>Message de motivation</FormLabel>
                                <TextField
                                    multiline
                                    value={membership.message}
                                    onChange={(e) =>
                                        setMembership({
                                            ...membership,
                                            message: e.target.value,
                                        })
                                    }
                                    rows={6}
                                    label="Message de motivation"
                                />
                            </FormControl>
                        </Typography>
                    </Grid>
                </Grid>
                <Box mt={1}>
                    <LoadingButton
                        loading={loading}
                        type="submit"
                        variant="contained"
                    >
                        {membership.id===null?"Envoyer ma demande": "Modifier ma demande"}
                    </LoadingButton>
                    {membership.id!=null &&<LoadingButton
                        loading={deleting}
                        onClick={() => {
                           if(window.confirm("Voulez-vous vraiment supprimer votre demande?")) {
                               setDeleting(true);
                               deleteMembership(membership.id)
                               .then(() => {
                                   setDeleting(false);
                                   setMembership({
                                       message: "",
                                       id: null,
                                   });
                                   toast.success("Votre demande a bien été supprimée");
                               }).catch((errr) => {
                                   setDeleting(false);
                                   if (errr.response.status >= 500) {
                                       toast.error(
                                           "Une erreur s'est produite! veillez reessayer plus tard!"
                                       );
                                   }
                               });
                           }
                        }}
                        sx={{ ml: 2 }}
                        color="error"
                        variant="outlined"
                    >
                        Supprimer ma demande
                    </LoadingButton>}
                </Box>
            </Box>:<Spinner/>}
        </Container>
    );
}

export default ContributionEnrolmentPage;
