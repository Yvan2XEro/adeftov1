import { ChevronRight } from "@mui/icons-material";
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
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import Chart from "../../components/Chart";
import Spinner from "../../components/Spinner";
import { getAllContributions } from "../../services/contributionsServices";

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
    const [loading, setLoading] = React.useState(false);
    const [contributions, setContributions] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [chartData, setChartData] = React.useState([]);
    const [year, setYear] = React.useState("");
    const [town, setTown] = React.useState("");

    const fetchData = React.useCallback(() => {
        setLoading(true);
        getAllContributions()
            .then((response) => {
                setContributions(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    React.useEffect(() => {
        fetchData();
    }, []);
    React.useEffect(() => {
        if (contributions.length > 0) {
            setSelected(contributions[0]);
            setChartData(
                selected?.sessions
                    .filter((s) => s.date.includes(year))
                    .map((s) => {
                        let amount = 0;
                        s.payments
                            ?.filter((p) => p.status === "paid")
                            .forEach((p) => {
                                amount += p.amount;
                            });
                        return {
                            value: amount,
                            label: moment(s.date).format("MMMM YYYY"),
                        };
                    })
            );
        }
    }, [contributions, year, town]);

    const [value, setValue] = React.useState(0);
    return (
        <Box mt={10} ml={2}>
            <Box>
                <Typography variant="h4">Statistiques</Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={(_, newValue) => {
                            setValue(newValue);
                        }}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Cotisations" {...a11yProps(0)} />
                        <Tab label="Utilisateurs " {...a11yProps(1)} />
                        <Tab label="Repartitions" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {!loading ? (
                        <Grid container md={12} xs={12}>
                            <Grid item md={4} xs={12} elevate={6}>
                                {!!selected && (
                                    <Box
                                        alignItems="center"
                                        flexDirection="row"
                                        display="flex"
                                    >
                                        <ChevronRight />
                                        <Typography component="h4">
                                            {selected?.name}
                                        </Typography>
                                    </Box>
                                )}
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Evolution des Cotisations{" "}
                                </Typography>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl sx={{ mt: 1 }} fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Cotisation
                                        </InputLabel>
                                        <Select
                                            labelId="year-selection"
                                            id="year-selection"
                                            value={selected?.id}
                                            label="Année"
                                        >
                                            {contributions.map((c) => (
                                                <MenuItem
                                                    onClick={() =>
                                                        setSelected(c)
                                                    }
                                                    value={c.id}
                                                    key={c.id}
                                                >
                                                    {c.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ mt: 1 }} fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Année
                                        </InputLabel>
                                        <Select
                                            labelId="year-selection"
                                            id="year-selection"
                                            value={year}
                                            label="Année"
                                        >
                                            <MenuItem
                                                onClick={() =>
                                                    setYear("" + 2020)
                                                }
                                                value={2020}
                                            >
                                                2020
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setYear("" + 2021)
                                                }
                                                value={2021}
                                            >
                                                2021
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setYear("" + 2022)
                                                }
                                                value={2022}
                                            >
                                                2022
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ mt: 1 }} fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Ville
                                        </InputLabel>
                                        <Select
                                            labelId="year-selection"
                                            id="year-selection"
                                            value={town}
                                            label="Année"
                                        >
                                            <MenuItem
                                                onClick={() =>
                                                    setTown("Dschang")
                                                }
                                                value={"Dschang"}
                                            >
                                                Dschang
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setTown("Yaounde")
                                                }
                                                value={"Yaounde"}
                                            >
                                                Yaounde
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setTown("Douala")
                                                }
                                                value={"Douala"}
                                            >
                                                Douala
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid md={8} xs={12} elevate={6}>
                                <Chart data={chartData} />
                            </Grid>
                        </Grid>
                    ) : (
                        <Spinner />
                    )}
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
