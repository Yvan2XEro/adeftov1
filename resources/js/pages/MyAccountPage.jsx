import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Close, Download } from "@mui/icons-material";
import { allMyPayments } from "../services/contributionsServices";
import { AuthContext } from "../contexts/AuthContextProvider";
import Spinner from "../components/Spinner";
import moment from "moment";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ITEMS_PER_PAGE = 15;

function MyAccountPage() {
    const [selected, setSelected] = useState(null);
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const fetchPayments = useCallback(() => {
        setLoading(true);
        allMyPayments()
            .then((response) => {
                setPayments(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [user]);
    useEffect(() => {
        fetchPayments();
    }, []);
    return (
        <Box mt={10}>
            {!loading ? (
                <>
                    <Typography component="h3" variant="h4">
                        Liste des paiements
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Mois</TableCell>
                                <TableCell>Montant</TableCell>
                                <TableCell>Méthode</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments
                                .slice(
                                    (page - 1) * ITEMS_PER_PAGE,
                                    (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                                )
                                .map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell>
                                            {moment(
                                                p.session?.created_at
                                            ).format("MMMM YYYY")}
                                        </TableCell>
                                        <TableCell>{p.amount} FCFA</TableCell>
                                        <TableCell>
                                            {paymentMethod(p?.method)}
                                        </TableCell>
                                        <TableCell>
                                            {moment(p.updated_at).format(
                                                "DD/MMMM/YYYY"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {getStatus(p.status)}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => setSelected(p)}
                                            >
                                                Voir
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <Pagination
                        sx={{ mt: 1 }}
                        page={page}
                        onChange={(_, page) => {
                            setPage(page);
                        }}
                        count={Math.ceil(
                            payments.length / ITEMS_PER_PAGE
                        )}
                        variant="outlined"
                        shape="rounded"
                    />
                    <DetailsModal
                        selected={selected}
                        onClose={() => setSelected(null)}
                    />
                </>
            ) : (
                <Spinner />
            )}
        </Box>
    );
}

const getStatus = (status) => {
    switch (status) {
        case "paid":
            return "Payé";
        case "pending":
            return "En cours";
        case "cancelled":
            return "Annulé";
        default:
            return status;
    }
};

export default MyAccountPage;

const paymentMethod = (m = "") => {
    if (m.toLowerCase() === "paypal") return "PayPal";
    return "MTN Mobile/Orange money";
};
export const DetailsModal = ({ selected, onClose }) => {
    const download = useCallback(() => {
        let pdf = new jsPDF();
        let data = document.getElementById("invoice_pdf");
        const lines = data.querySelectorAll(".pdf_line").forEach((e) => {
            e.classList.add("p-2");
        });
        html2canvas(data, {
            allowTaint: true,
            useCORS: true,
        }).then((canvas) => {
            let imgdata = canvas.toDataURL("image/image.png");
            pdf.addImage(imgdata, "PNG", 30, 10, 150, 95);
            pdf.save(`recu-payment-id${selected?.id}.pdf`);
        });
    }, [selected]);

    return (
        <Dialog
            sx={{
                "& .MuiDialog-container": {
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                },
            }}
            open={selected !== null}
            onClose={onClose}
            PaperProps={{
                sx: {
                    m: 0,
                    top: 0,
                    left: 0,
                    height: "100%",
                    position: "relative",
                    margin: 0,
                    minWidth: { md: 400 },
                },
            }}
        >
            <Box sx={{ p: { md: 2 } }}>
                <Close
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 2,
                        top: 2,
                        cursor: "pointer",
                    }}
                    color="error"
                />
                <Box
                    id="invoice_pdf"
                    mt={4}
                    p={2}
                    sx={{ backgroundColor: "white", color: "black" }}
                >
                    <Typography component="h3" variant="h5">
                        Recu de paiement:
                    </Typography>
                    <Table sx={{ backgroundColor: "white", color: "black" }}>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    variant="strong"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {selected?.session.contribution?.name}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    variant="strong"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Nom et prénom:
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">
                                    {selected?.user?.firstname}{" "}
                                    {selected?.user?.lastname}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    variant="strong"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Mode de paiement:
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">
                                    {paymentMethod(selected?.method)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    variant="strong"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Date de paiement:
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {moment(selected?.updated_at).format(
                                        "DD/MMMM/YYYY"
                                    )}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    variant="strong"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Montant:
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{selected?.amount} FCFA</Typography>
                            </TableCell>
                        </TableRow>
                    </Table>
                </Box>
                <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                    <Button
                        onClick={download}
                        variant="contained"
                        startIcon={<Download />}
                    >
                        Télécharger
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};
