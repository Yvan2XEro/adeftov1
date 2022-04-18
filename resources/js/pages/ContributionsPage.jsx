import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddCardIcon from '@mui/icons-material/AddCard';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import PaymentModal from "../components/PaymentModal";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import { toast } from "react-toastify";

function ContributionsPage() {
    const navigate = useNavigate();
    const { isAuthenticated} = React.useContext(AuthContext);
    React.useEffect(() => {
        if(!isAuthenticated) {
            toast.error("Vous devez être connecté pour accéder à cette page");
            navigate("/login");
        }
    }, [isAuthenticated]);
    return (
        <Box mt={10}>
            <ContributionItem expanded={true} />
            <ContributionItem />
            <ContributionItem />
            <ContributionItem />
        </Box>
    );
}

export default ContributionsPage;

function ContributionItem({ expanded = undefined }) {
    const [openModal, setOpenModal] = React.useState(false)
    return (
        <Box sx={{ borderColor: "grey.500", padding: 2 }}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography component="h3" variant="h4">
                        Accordion 1
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                                        <TableCell>Date de debut</TableCell>
                                        <TableCell>22/32/2332</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Date de fin</TableCell>
                                        <TableCell>22/32/2332</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Box mt={1}>
                                <Button startIcon={<AttachMoneyIcon />} variant="contained" fullWidth>
                                    Payer ma cautisation
                                </Button>
                            </Box>
                            <Box mt={1}>
                                <Button
                                    color="success"
                                    variant="outlined"
                                    onClick={() => {
                                        setOpenModal(true)
                                    }}
                                    fullWidth
                                    startIcon={<AccessTimeIcon />}
                                >
                                    Payer une ancienne cautisation
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
                                                Lorem, ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Fuga minima numquam odio,
                                                officia alias, excepturi
                                                molestiae autem error quasi
                                                labore at nesciunt amet, iste
                                                reiciendis rerum cum aut quae
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
                                        color="primary"
                                        variant="outlined"
                                        component={Link}
                                        to="/contributions/1/details"
                                        fullWidth
                                        startIcon={<AddIcon />}
                                    >
                                        Plus de details
                                    </Button>
                                </Box>
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
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <PaymentModal open={openModal} onClose={()=>setOpenModal(false)}/>
        </Box>
    );
}
