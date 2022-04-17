import { Box, Table, TableCell, TableHead, TableRow } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    {
        field: "amount",
        headerName: "Montant retire",
        width: 200,
        type: "number",
    },
    {
        field: "user",
        headerName: "Retire par",
        width: 200,
        type: "number",
    },
];
const rows = [
    {
        id: 1,
        date: "Janvier 2020",
        amount: 10,
        user: "Jean Robet",
    },
    {
        id: 2,
        date: "Janvier 2020",
        amount: 10,
        user: "Jean Robet",
    },
    {
        id: 3,
        date: "Janvier 2020",
        amount: 10,
        user: "Jean Robet",
    },
];

function Transactions() {
    return (
        <Box sx={{ width: "100%", height: "500px" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </Box>
    );
}

export default Transactions;
