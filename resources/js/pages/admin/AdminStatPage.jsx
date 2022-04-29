import {
    Box,
    Button,
    Grid,
    Typography,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    Tab,
    Tabs,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GridOnIcon from "@mui/icons-material/GridOn";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Chart from "../../components/Chart";


const chartData = [
    {
        label: "Janvier",
        value: "290",
    },
    {
        label: "Fevrier",
        value: "260",
    },
    {
        label: "Mars",
        value: "180",
    },
    {
        label: "Avril",
        value: "140",
    },
    {
        label: "Mai",
        value: "115",
    },
    {
        label: "Juin",
        value: "100",
    },
    {
        label: "Juillet",
        value: "30",
    },
    {
        label: "Aout",
        value: "30",
    },
    {
        label: "Septembre",
        value: "300",
    },
    {
        label: "Octobre",
        value: "4000",
    },
     {
        label: "Novembre",
        value: "500",
    },
     {
        label: "Decembre",
        value: "200",
    },
];
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
function AdminStatPage() {
    const [annee, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const [value, setValue] = React.useState(0);
    const handleChange1 = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box mt={10} ml={2}>
            <Box>
                <Typography variant="h4">Statistiques</Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange1}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Cotisations" {...a11yProps(0)} />
                        <Tab label="Utilisateurs " {...a11yProps(1)} />
                        <Tab label="Repartitions" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Grid container md={12} xs={12}>
                        <Grid item md={4} xs={12} elevate={6}>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Evolution des Cotisations{" "}
                            </Typography>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl sx={{mt: 1}} fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Année
                                    </InputLabel>
                                    <Select
                                        labelId="year-selection"
                                        id="year-selection"
                                        value={annee}
                                        label="Année"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={2020}>2020</MenuItem>
                                        <MenuItem value={2021}>2021</MenuItem>
                                        <MenuItem value={2022}>2022</MenuItem>
                                    </Select>
                                </FormControl>
                                 <FormControl sx={{mt: 1}} fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Ville
                                    </InputLabel>
                                    <Select
                                        labelId="year-selection"
                                        id="year-selection"
                                        value={annee}
                                        label="Année"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"Dschang"}>Dschang</MenuItem>
                                        <MenuItem value={"Yaounde"}>Yaounde</MenuItem>
                                        <MenuItem value={"Douala"}>Douala</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid md={8} xs={12} elevate={6}>
                            <Chart/>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                   Item two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
        </Box>
    );
}
export default AdminStatPage;
