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
} from "@mui/material";
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
import Chart from "../../components/Chart";

function AdminStatPage() {
    return (
        <Box mt={10} ml={2}>
            <Box>
                <Typography variant="h4">Statistiques</Typography>
            </Box>
            <Grid container md={12} xs={12}>

                <Grid item md={6} xs={12} elevate={6}>
                <Typography variant="h6" sx ={{mt:2}}>Evolution des utilisateurs </Typography>
                    <Chart />
                </Grid>
            </Grid>
        </Box>
    );
}
export default AdminStatPage;
