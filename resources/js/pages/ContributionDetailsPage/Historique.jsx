import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "month", headerName: "Mois/Annee", width: 130 },
    {
        field: "particCount ",
        headerName: "Personnes ayant cautises a temps",
        width: 200,
        type: 'number',
    },
    {
        field: "particLateCount ",
        headerName: "Personnes ayant cautises en retard",
        width: 200,
        type: 'number'
    },
    {
        field: "totalPartic ",
        headerName: "Total personnes ayant cautises",
        width: 200,
        type: 'number'
    },
    {
        field: "particLeftCount ",
        headerName: `Personnes n' ayant cautises`,
        width: 200,
        type: 'number'
    },
];

function Historique() {
    const rows = [
    {
        id: 1,
        month: "Janvier 2020",
        particCount: 10,
        particLateCount: 5,
        totalPartic: "15",
        particLeftCount: 5,
    },
    {
        id: 2,
        month: "Janvier 2020",
        particCount: 10,
        particLateCount: 5,
        totalPartic: "15",
        particLeftCount: 5,
    },
    {
        id: 3,
        month: "Janvier 2020",
        particCount: 10,
        particLateCount: 5,
        totalPartic: "15",
        particLeftCount: 5,
    },
    {
        id: 4,
        month: "Janvier 2020",
        particCount: 10,
        particLateCount: 5,
        totalPartic: "15",
        particLeftCount: 5,
    },
    {
        id: 5,
        month: "Janvier 2020",
        particCount: 10,
        particLateCount: 5,
        totalPartic: "15",
        particLeftCount: 5,
    },
    {
        id: 6,
        month: "Janvier 2020",
        particCount: 10,
        particLateCount: 5,
        totalPartic: "15",
        particLeftCount: 5,
    },
];
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

export default Historique;
