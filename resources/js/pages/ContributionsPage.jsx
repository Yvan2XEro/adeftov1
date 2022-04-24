import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddCardIcon from "@mui/icons-material/AddCard";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
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
import { getAllContributions } from "../services/contributionsServices";

function ContributionsPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = React.useContext(AuthContext);
    const [contributions, setContributions] = React.useState([])

    React.useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Vous devez être connecté pour accéder à cette page");
            navigate("/login");
        }
    }, [isAuthenticated]);
    const fetchContributions = React.useCallback( () => {
        (async () => {
            await getAllContributions().then((response) => {
            setContributions(response.data.data);
        })})();
    }, []);
    React.useEffect(() => {
        fetchContributions();
    }, []);
    return (
        <Box mt={10}>
            {contributions.map((item, i)=><ContributionItem key={item.id} index={i} data={item} />)}
        </Box>
    );
}

export default ContributionsPage;

function ContributionItem({ data, index }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [expanded, setExpanded] = React.useState(index===0);
    return (
        <Box sx={{ borderColor: "grey.500", padding: 2 }}>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={()=>setExpanded(v=>!v)}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography component="h3" variant="h4">
                        {data.name}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container columnSpacing={{ md: 3 }}>
                        <Grid item xs={6} md={6}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Coordonateur</TableCell>
                                        <TableCell>{data.user.firstname+' '+data.user.lastname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Date limite pour prochaine cotisation</TableCell>
                                        <TableCell>02/02/2020</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Nombre de membres</TableCell>
                                        <TableCell>{data.members.length}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Etat</TableCell>
                                        <TableCell>
                                            <Button size="small" color={!data.is_active?'warning': 'success'}>
                                                {!data.is_active?"En pause":"En cours"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
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
                                    color="success"
                                    variant="outlined"
                                    onClick={() => {
                                        setOpenModal(true);
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


                                <Box mt={1}>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        component={Link}
                                        to={`/contributions/${data.id}/details`}
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
                                        to={`/contributions/${data.id}/new-member`}
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
            <PaymentModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </Box>
    );
}
