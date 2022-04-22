import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    Container,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deleteMembership, getMembershipsByContribution } from "../../services/contributionsServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AdminAdhesionsPage() {
    const [memberships, setMemberships] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        fetchMemberships();
    }, []);
    const fetchMemberships = React.useCallback(() => {
        getMembershipsByContribution(id).then((response) => {
            setMemberships(response.data);
        });
    }, []);
    const accept = React.useCallback(async(id) => {
        await acceptMembership(id).then((response) => {
            toast.success("Adhésion acceptée");
            fetchMemberships();
        }).catch((error) => {
            toast.error("Une erreur est survenue");
        });
    }, []);

    return (
        <Container sx={{ mt: 10 }}>
            <Typography component="h1" variant="h4">
                Demande d'hadesion a la cotisation 'Test de cotisation'
            </Typography>
            <Box flexDirection="row">
                <Button>Tout accepter</Button>
                <Button color="error">Tout refuser</Button>
            </Box>
            {memberships.map(m=><Accordion key={m.id}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Box>
                        <Avatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" />
                    </Box>
                    <Box>
                        <Typography sx={{ ml: 1 }} component="h3" variant="h4">
                            {m.user.firstname} {m.user.lastname}
                        </Typography>
                        <Typography sx={{ mt: 1 }} component="p" variant="span">
                            tel: {m.user.phone}
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="h4" variant="h4">
                        Message de motivation:
                    </Typography>
                    {m.message?<Typography component="p">
                        {m.message}
                    </Typography>:<Typography component="p">
                        Aucun message!
                        </Typography>}
                </AccordionDetails>
                <AccordionActions>
                    <Button onClick={()=>accept(m.id)} variant="contained">Acepter</Button>
                    <Button ocnClick={()=>deleteMembership(m.id).then(_=>fetchMemberships())} color="error" variant="outlined">
                        Refuser
                    </Button>
                </AccordionActions>
            </Accordion>)}
        </Container>
    );
}

export default AdminAdhesionsPage;
