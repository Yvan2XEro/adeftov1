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
    getUsdVal,
    initPaypalPayment,
    mesombPayment,
} from "../services/contributionsServices";
import moment from "moment";
import { AuthContext } from "../contexts/AuthContextProvider";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import paypal from "../assets/images/paypal.png";

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
    const [amountUSD, setAmountUSD] = useState(1);
    const [pending, setPending] = useState(false);
    const [paypalLoading, setPaypalLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [selectedSession, setSelectedSession] = useState(null);
    const [phone, setPhone] = useState(user?.phone);
    const [method, setMethod] = useState("momo");
    const [usdVal, setUsdVal] = useState(621.61)
    useEffect(() => {
        setPhone(user?.phone);
        (async()=>{
            await getUsdVal().then(response=>{
                setUsdVal(response.data)
            })
        })()
    }, [selectedSession]);
    useEffect(() => {
        if (contribution !== null) {
            fetchNextSession(contribution.id).then((response) => {
                setSelectedSession(response.data);
            });
        }
    }, [contribution]);

    const paypalPayment = useCallback(async () => {
        if (selectedSession) {
            setPaypalLoading(true);
            await initPaypalPayment({
                amount: amountUSD*usdVal,
                session_id: selectedSession.id,
            }).then(response=>{
                setPaypalLoading(false);
                if(response.data.link)
                    window.location.replace(response.data.link)
                else
                    toast.error("Veillez reessayer")
            }).catch(err=>{
                setPaypalLoading(false);
            });
        }
    }, [selectedSession, amount]);

    const processPayment = useCallback(async () => {
        if (selectedSession) {
            setPending(true);
            toast.info("Veuillez conulter votre téléphone pour continuer", {
                closeButton: true,
                autoClose: false
            });
            if (phone.indexOf("+237") === -1) {
                setPhone(`+237${phone}`);
            }
            await mesombPayment({
                amount,
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
                    if(err.response?.status===503) {
                        toast.error(
                            "Service de payement mobile momentannement indisponnible!"
                        );
                    }else if (err.response)
                        toast.error(
                            "Erreur lors du paiement. Veillez réessayer SVP"
                        );
                });
        }
    }, [selectedSession, phone, amount]);
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
                <Typography sx={{ mt: 2 }} xs={12} component="h4" variant="h4">
                    Payer votre cotisations
                </Typography>
                {selectedSession && (
                   <Box>
                        <Typography sx={{ mt: 2 }} component="span" variant="small">
                            (Mois de: {moment(selectedSession?.date).format("MMMM  YYYY")})
                    </Typography>
                   </Box>
                )}
                <FormControl sx={{mt: 2.5}}>
                    <Typography component="p" variant="strong">
                        Mode de paiement:
                    </Typography>
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
                {method==="momo"?<Box
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
                            step={usdVal}
                            min={usdVal}
                            max={500000}
                            valueLabelDisplay="auto"
                        />
                    </FormControl>
                </Box>:
                <Box
                    sx={{
                        border: 0.4,
                        borderColor: "grey.500",
                        padding: 1,
                        borderRadius: 1.5,
                    }}
                >
                    <Typography component="p" variant="p">
                        Deffinissez la somme que vous voulez payer (USD)
                    </Typography>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <TextField
                            label="Somme a payer"
                            type="number"
                            value={amountUSD}
                            onChange={({ target }) => setAmountUSD(target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Slider
                            aria-label="Restricted values"
                            value={amountUSD}
                            onChange={(_, value) => setAmountUSD(value)}
                            step={10}
                            min={1}
                            max={10000}
                            valueLabelDisplay="auto"
                        />
                    </FormControl>
                </Box>}
                {method === "momo" && <FormControl fullWidth sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Numero de telephone pour le paiement"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </FormControl>}
                <Box mt={2} flexDirection="row" justifyContent="space-between">
                    <Box sx={{ mb: 2, mt: 2 }}>
                        {method === "momo" ? (
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
                        ) : (
                            <LoadingButton
                                loading={paypalLoading}
                                onClick={paypalPayment}
                                fullWidth
                                variant="contained"
                            >
                                <Typography
                                    sx={{ maxWidth: 100, maxHeight: 30 }}
                                    component="img"
                                    src={paypal}
                                    alt="Paypal Logo"
                                />
                            </LoadingButton>
                        )}
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
