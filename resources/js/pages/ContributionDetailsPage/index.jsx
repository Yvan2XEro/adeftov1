import { Settings } from "@mui/icons-material";
import { AppBar, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { getContribution } from "../../services/contributionsServices";
import Historique from "./Historique";
import Infos from "./Infos";

function ContributionDetailsPage() {
    const { id } = useParams();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const navigate = useNavigate();
    const { isAuthenticated, user } = React.useContext(AuthContext);
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const [contribution, setContribution] = React.useState(null);
    React.useEffect(() => {
        retriveContribution();
    }, []);
    const retriveContribution = React.useCallback(() => {
        setLoading(true);
        getContribution(id)
            .then((response) => {
                setContribution(response.data);
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Erreur lors de la connection au serveur!");
                setLoading(false);
            });
    }, [id]);
    return (
        <Box mt={8} sx={{ bgcolor: "background.paper" }}>
            {!loading ? (
                <>
                    <AppBar position="static" color="inherit">
                        <Box ml={1}>
                            <Typography pt={1} component="h3" variant="h4">
                                {contribution?.name}
                            </Typography>
                            <Box
                                display="flex"
                                flexWrap="wrap"
                                pr={2}
                                justifyContent="space-between"
                                flexDirection="row"
                                mt={2}
                            >
                                <Box>
                                    <Typography component="p" variant="p">
                                        Contributeurs :
                                    </Typography>
                                    <Button size="large">
                                        <Typography
                                            className="text_green"
                                            component="p"
                                            variant="h5"
                                        >
                                            {contribution?.members.length}
                                        </Typography>
                                    </Button>
                                </Box>
                                <Box>
                                    <Typography component="p" variant="p">
                                        Solde :
                                    </Typography>
                                    <Button size="large">
                                        <Typography
                                            className="text_green"
                                            component="p"
                                            variant="h5"
                                        >
                                            {contribution?.balance} FCFA
                                        </Typography>
                                    </Button>
                                </Box>
                                {user?.id === contribution?.user_id && (
                                    <Button
                                        sx={{ ml: 10 }}
                                        variant="outlined"
                                        component={Link}
                                        to={
                                            "/admin/contributions?selected_id=" +
                                            contribution?.id
                                        }
                                        title="Parametres de la cotisation"
                                    >
                                        <Settings />
                                    </Button>
                                )}
                            </Box>
                        </Box>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Informations" {...a11yProps(0)} />
                            <Tab label="Historique" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <Infos contribution={contribution} refetch={retriveContribution} />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <Historique contribution={contribution} />
                        </TabPanel>
                    </SwipeableViews>
                </>
            ) : (
                <Spinner />
            )}
        </Box>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

export default ContributionDetailsPage;
