import { ChevronRight } from "@mui/icons-material";
import {
    Box,
    Grid,
    Typography,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
} from "@mui/material";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import Chart from "../../components/Chart";
import Spinner from "../../components/Spinner";
import { getAllContributions } from "../../services/contributionsServices";
import cities from "../../assets/cities.json";

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

    // Get all years from 2022 to current year
    const getYears = React.useCallback(() => {
        const years = [];
        for (let i = 2022; i <= moment().year(); i++) {
            years.push(i);
        }
        return years;
    }, []);
    React.useEffect(() => {
        fetchData();
    }, []);
    React.useEffect(() => {
        if (contributions.length > 0) {
            setSelected(contributions[0]);
            setChartData(
                selected?.sessions
                    .filter((s) => s.date.includes(year)
                        && s.payments.find(p=>p.user.city.includes(town)) )
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

    return (
        <Box mt={10} ml={2}>
            <Box>
                <Typography variant="h4">Statistiques</Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
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
                                            label="Cotisation"
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
                                            {getYears().map(y=><MenuItem
                                                onClick={() => setYear(''+y)}
                                                value={y}
                                                key={y}
                                            >
                                                {y}
                                            </MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ mt: 1 }} fullWidth>
                                          <InputLabel id="demo-simple-select-label">
                                            Arrondissement
                                        </InputLabel>
                                        <Select
                                            labelId="year-selection"
                                            id="year-selection"
                                            value={town}
                                            label="Arrondissement"
                                        >
                                            {cities.map(c =><MenuItem
                                                onClick={() =>
                                                    setTown(c)
                                                }
                                                value={c}
                                                key={c}
                                            >
                                                {c}
                                            </MenuItem>)}
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
            </Box>
        </Box>
    );
}
export default AdminStatPage;
