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
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AdminAdhesionsPage() {
    return (
        <Container sx={{ mt: 10 }}>
            <Typography component="h1" variant="h4">
                Demande d'hadesion a la cotisation 'Test de cotisation'
            </Typography>
            <Box flexDirection="row">
                <Button>
                    Tout accepter
                </Button>
                <Button color="error">
                    Tout refuser
                </Button>
            </Box>
            <Accordion>
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
                            Jean Robert
                        </Typography>
                        <Typography sx={{mt: 1}} component="p" variant="span">
                            tel: 2324242424244
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="h4" variant="h4">
                        Message de motivation:
                    </Typography>
                    <Typography component="p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Impedit aut aliquam corporis repellendus, exercitationem
                        non necessitatibus doloribus ipsam, esse ipsa, totam
                        atque alias corrupti qui? Rerum dolor recusandae esse
                        voluptatibus!
                    </Typography>
                </AccordionDetails>
                <AccordionActions>
                    <Button variant="contained">Acepter</Button>
                    <Button color="error" variant="outlined">
                        Refuser
                    </Button>
                </AccordionActions>
            </Accordion>
        </Container>
    );
}

export default AdminAdhesionsPage;
