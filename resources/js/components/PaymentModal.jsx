import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Modal,
    Paper,
    Radio,
    RadioGroup,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    fetchNextSession,
    mesombPayment,
} from "../services/contributionsServices";
import moment from "moment";
import { AuthContext } from "../contexts/AuthContextProvider";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const style = {
    position: "absolute",
    top: {
        md: "50%",
    },
    left: {
        md: "50%",
    },
    transform: {
        md: "translate(-50%, -50%)",
    },
    bgcolor: {
        md: "background.paper",
    },
    boxShadow: 24,
    p: {
        md: 4,
        xs: 0.5,
    },
};

function PaymentModal({ onSuccess, contribution, open, onClose }) {
    const [amount, setAmount] = useState(500);
    const [pending, setPending] = useState(false);
    const { user } = useContext(AuthContext);
    const [selectedSession, setSelectedSession] = useState(null);
    const [phone, setPhone] = useState(user?.phone);
    const [method, setMethod] = useState("momo");
    useEffect(() => {
        setPhone(user?.phone);
    }, [user]);
    useEffect(() => {
        if (contribution !== null) {
            fetchNextSession(contribution.id).then((response) => {
                setSelectedSession(response.data);
                console.log("YO", response.data);
            });
        }
    }, [contribution]);

    const processPayment = useCallback(async () => {
        if (selectedSession) {
            setPending(true);
            toast.info("Veuillez conulter votre téléphone pour continuer", {
                autoClose: false,
            });
            if (phone.indexOf("+237") === -1) {
                setPhone(`+237${phone}`);
            }
            await mesombPayment({
                amount: 100,
                phone: phone.trim(),
                session_id: selectedSession.id,
            })
                .then(() => {
                    toast.success("Paiement effectué avec succès");
                    onSuccess();
                    setPending(false);
                })
                .catch((err) => {
                    setPending(false);
                    if (err.response)
                        toast.error(
                            "Erreur lors du paiement. Veillez réessayer SVP"
                        );
                });
        }
    }, [selectedSession, phone]);
    return (
        <Modal
            sx={{ border: "none" }}
            closeAfterTransition={true}
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component={Paper}>
                <Typography sx={{ mt: 2 }} xs={12} component="h4" variant="h5">
                    Payer votre cotisations
                </Typography>
                {selectedSession && (
                    <Typography sx={{ mt: 2 }} component="p" variant="p">
                        <Typography component="span" variant="srong">
                            Mois de:
                        </Typography>{" "}
                        {moment(selectedSession?.date).format("MMMM  YYYY")}
                    </Typography>
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
                        Deffinissez la somme que vous voulez payer (FCFA)
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
                            value={amount}
                            onChange={(_, value) => setAmount(value)}
                            step={500}
                            min={500}
                            max={500000}
                            valueLabelDisplay="auto"
                        />
                    </FormControl>
                </Box>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <FormControlLabel
                            control={<Radio />}
                            value="momo"
                            label="Mobile/Orange money"
                        />
                        <FormControlLabel
                            control={<Radio />}
                            value="paypal"
                            label="PayPal"
                        />
                    </RadioGroup>
                </FormControl>
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
                        <LoadingButton
                            loading={pending}
                            onClick={processPayment}
                            variant="contained"
                            size="medium"
                            fullWidth
                            disabled={amount < 100 || phone?.lenght < 9}
                        >
                            Proceder
                        </LoadingButton>
                    </Box>
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            color="error"
                            disabled={pending}
                            fullWidth
                            size="medium"
                        >
                            Annuler
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default PaymentModal;
