import * as React from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Grid,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import PaymentModal from "../components/PaymentModal";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import { getAllContributions } from "../services/contributionsServices";
import Spinner from "../components/Spinner";

function ContributionsPage() {
    const [contributions, setContributions] = React.useState([])
    const [loading, setLoading] = React.useState(false);
    const fetchContributions = React.useCallback( () => {
        (async () => {
            setLoading(true);
            await getAllContributions().then((response) => {
            setContributions(response.data.data);
            setLoading(false);
        }).catch(()=>{
            setLoading(false);
        })})();
    }, []);
    React.useEffect(() => {
        fetchContributions();
    }, []);
    return (
        <Box flex={1} mt={10}>
            {!loading?<>
                {contributions.map((item, i)=><ContributionItem key={item.id} index={i} data={item} />)}
            </>:<Spinner />}
        </Box>
    );
}

export default ContributionsPage;

function ContributionItem({ data, index }) {
    const [expanded, setExpanded] = React.useState(index===0);
    const [selected, setSelected] = React.useState(null);
    const {user} = React.useContext(AuthContext);
    const iamMember = React.useCallback(()=> {
        return data?.members.find((member) => member.id === user?.id);
    },[data, user]);

    return (
        <Box sx={{padding:3 , boxShadow: 0}}>
            <Accordion expanded={expanded} sx={{boxShadow: 5}}>
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
                <Container>
                    <Grid container columnSpacing={{ md: 3 }}>
                    <Grid item xs={6} md={6} sx={{ boxShadow: 3, padding:2 }}>
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
                                disabled={!data.is_active|| !iamMember()}
                                fullWidth
                                onClick={() => {
                                    setSelected(data);
                                }}
                            >
                                Payer ma cotisation
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
                                {!iamMember()?<Button
                                    color="success"
                                    variant="contained"
                                    to={`/contributions/${data.id}/new-member`}
                                    component={Link}
                                    fullWidth
                                    startIcon={<AddCardIcon />}
                                >
                                    Rejoindre la cotisation
                                </Button>:

                                    <Button
                                        color="error"
                                        variant="contained"
                                        fullWidth
                                        disabled={data?.user_id===user?.id}
                                        startIcon={<PersonRemoveIcon />}
                                    >
                                        Quitter la cotisation
                                    </Button>}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                </Container>
                </AccordionDetails>
            </Accordion>
            <PaymentModal
                open={selected!==null}
                contribution={selected}
                onClose={() => setSelected(null)}
            />
        </Box>
    );
}
