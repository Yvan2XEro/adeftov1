import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "month", headerName: "Mois/Annee", width: 130 },
    {
        field: "particCount",
        headerName: "Personnes ayant cotises a temps",
        width: 200,
        type: 'number',
    },
    {
        field: "particLateCount",
        headerName: "Personnes ayant cotises en retard",
        width: 200,
        type: 'number'
    },
    {
        field: "totalPartic",
        headerName: "Total personnes ayant cotises",
        width: 200,
        type: 'number'
    },
    {
        field: "particLeftCount",
        headerName: `Personnes n' ayant cotises`,
        width: 200,
        type: 'number'
    },
];

function Historique({contribution}) {
    const [rows, setRows] = React.useState([])
React.useEffect(() => {
    const r = contribution?.sessions.map(session=>{
        const totalPartic = session.payments.filter(p=>p.status === 'paid').length
        const particLateCount = session.payments.filter(p=>(p.status === 'paid' && (new Date(p.created_at)>new Date(session.date)))).length
        return {
            id: session.id,
            month: moment(session.date).format('MMMM YYYY'),
            particCount: totalPartic - particLateCount,
            particLateCount,
            totalPartic,
            particLeftCount: contribution?.members.length - totalPartic
        }
    })
    setRows(r)
}, [contribution]);
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
