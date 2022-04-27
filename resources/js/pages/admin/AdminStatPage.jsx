import {
    Box,
    Button,
    Grid,
    Icon,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Autocomplete,
    Stack,
    Pagination,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    Tab,
    Tabs,
} from "@mui/material";
import PropTypes from "prop-types";
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnTotalSilenceIcon from "@mui/icons-material/DoNotDisturbOnTotalSilence";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import EditUserModal from "../../components/EditUserModal";
import { allUsers } from "../../services/usersServices";
import Spinner from "../../components/Spinner";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GridOnIcon from "@mui/icons-material/GridOn";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Chart from "../../components/Chart";
// DataGrid Test Elts

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "firstName",
        headerName: "First name",
        width: 150,
        editable: true,
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
        editable: true,
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 110,
        editable: true,
    },
    {
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
];

const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
//End DataGrid Test Elts
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
                        <Tab label="Utilisateurs" {...a11yProps(0)} />
                        <Tab label=" Cotisations" {...a11yProps(1)} />
                        <Tab label="Repartitions" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Grid container md={12} xs={12}>
                        <Grid item md={6} xs={12} elevate={6}>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Evolution des utilisateurs{" "}
                            </Typography>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
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
                            </Box>
                            <Chart />
                            <Box>
                                <Button
                                    variant="contained"
                                    sx={{ ml: 2 }}
                                    width="20"
                                >
                                    <InsertDriveFileIcon />
                                    Exporter en XLS
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ ml: 2 }}
                                    width="20"
                                >
                                    <GridOnIcon />
                                    Exporter en CSV
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ ml: 2 }}
                                    width="20"
                                >
                                    <PictureAsPdfIcon />
                                    Imprimer en PDF
                                </Button>
                            </Box>
                        </Grid>
                        <Grid md={6} xs={12} elevate={6} >
                            <div style={{ height: 400, width: "100%" }} sx={{mt:6}}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                />
                            </div>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
        </Box>
    );
}
export default AdminStatPage;
