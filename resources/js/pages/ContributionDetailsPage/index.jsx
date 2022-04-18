import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews";
import { AuthContext } from "../../contexts/AuthContextProvider";
import Historique from "./Historique";
import Infos from "./Infos";
import Transactions from "./Transactions";

function ContributionDetailsPage() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const navigate = useNavigate();
    const { isAuthenticated} = React.useContext(AuthContext);
    React.useEffect(() => {
        if(!isAuthenticated) {
            toast.error("Vous devez être connecté pour accéder à cette page");
            navigate("/login");
        }
    }, [isAuthenticated]);

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <Box mt={8} sx={{ bgcolor: "background.paper" }}>
            <AppBar position="static" color="inherit">
                <Box ml={1} >
                    <Typography pt={1} component="h3" variant="h4">
                        Cautisation des supers gens
                    </Typography>
                    <Box flexDirection="row" mt={2}>
                        <Typography component="span" variant="p">
                            3245 Contributeurs,
                        </Typography>
                        <Typography component="span" ml={2} variant="p">
                            solde: 2332323 FCFA
                        </Typography>
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
                    <Tab label="Transactions" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Infos />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Historique />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Transactions />
                </TabPanel>
            </SwipeableViews>
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
