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
import SearchIcon from '@mui/icons-material/Search';

const ITEMS_PER_PAGE = 5;
function AdminStatPage() {
    return (
        <>
        </>
    );

}
export default AdminStatPage;