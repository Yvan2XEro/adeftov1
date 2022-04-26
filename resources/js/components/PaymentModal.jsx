import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { fetchMyUnpaidSessions, mesombPayment } from "../services/contributionsServices";
import moment from "moment";
import { AuthContext } from "../contexts/AuthContextProvider";
import {toast} from "react-toastify"
import { LoadingButton } from "@mui/lab";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

function PaymentModal({ onSuccess, contribution, open, onClose }) {
    const [amount, setAmount] = useState(500);
    const [pending, setPending] = useState(false);
    const { user } = useContext(AuthContext);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [phone, setPhone] = useState(user?.phone);
    useEffect(() => {
        setPhone(user?.phone);
    }, [user]);
    useEffect(() => {
        if (contribution !== null) {
            fetchMyUnpaidSessions(contribution.id).then((response) => {
                setSessions(response.data.reverse());
                setSelectedSession(response.data.reverse()[0] || null);
            });
        }
    }, [contribution]);

    const processPayment = useCallback(async() => {
        if (selectedSession) {
            setPending(true);
            toast.info("Veuillez conulter votre téléphone pour continuer", {autoClose: false});
            if(phone.indexOf("+237") === -1) {
                setPhone(`+237${phone}`);
            }
            await mesombPayment({
                amount,
                phone: phone.trim(),
                session_id: selectedSession.id,
            }).then(()=>{
                toast.success("Paiement effectué avec succès");
                onSuccess();
                setPending(false);
            }).catch(()=>{
                setPending(false);
                toast.error("Erreur lors du paiement. Veillez réessayer SVP");
            })
        }
    }, [selectedSession, phone]);

    return (
        <Modal
            sx={{ border: "none" }}
            closeAfterTransition={true}
            open={open}
            onClose={onSuccess}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component={Paper}>
                <Typography sx={{ mt: 2 }} component="h4" variant="h4">
                    Payer une ancienne cotisations
                </Typography>
                <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Seance
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={selectedSession?.id}
                        onChange={(e) => {
                            setSelectedSession(
                                sessions.find(
                                    (session) => session.id === e.target.value
                                )
                            );
                        }}
                    >
                        {sessions.map((item, i) => (
                            <MenuItem
                                selected={i === 0}
                                key={item.id}
                                value={item.id}
                            >
                                {moment(item.date).format("MMMM  YYYY")}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedSession && (
                    <>
                        <Typography sx={{ mt: 2 }} component="p" variant="p">
                            <Typography component="span" variant="srong">
                                Mois de:
                            </Typography>{" "}
                            {moment(selectedSession?.date).format("MMMM  YYYY")}
                            <br />
                            <Typography component="span" variant="srong">
                                Date limite:
                            </Typography>{" "}
                            {moment(selectedSession?.date).format(
                                "DD MMMM YYYY"
                            )}
                        </Typography>
                        <Typography component="p" variant="p">
                            Statut: Non paye
                        </Typography>
                    </>
                )}
                <Box
                    sx={{
                        border: 0.4,
                        borderColor: "grey.500",
                        padding: 1,
                        borderRadius: 1.5,
                    }}
                >
                    <Typography component="p" variant="p">
                        Deffinissez la somme que vous voulez payer!
                    </Typography>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <TextField
                            label="Somme a payer"
                            type="number"
                            value={amount}
                            onChange={({ target }) => setAmount(target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Slider
                            aria-label="Restricted values"
                            // defaultValue={amount}
                            value={amount}
                            onChange={(_, value) => setAmount(value)}
                            step={500}
                            min={500}
                            max={500000}
                            valueLabelDisplay="auto"
                        />
                    </FormControl>
                </Box>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Numero de telephone pour le paiement"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </FormControl>
                <Box mt={2} flexDirection="row" justifyContent="space-between">
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <LoadingButton loading={pending} onClick={processPayment} variant="contained" size="medium" fullWidth disabled={amount<500 || phone?.lenght<9}>
                            {" "}
                            Proceder{" "}
                        </LoadingButton>
                    </Box>
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            color="error"
                            fullWidth
                            size="medium"
                        >
                            {" "}
                            Annuler{" "}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default PaymentModal;
