import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Modal,
    Paper,
    Select,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

function PaymentModal({ onSuccess, onFailure, open, onClose }) {
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
                    ></Select>
                </FormControl>
                {/* <Typography sx={{ mt: 2 }} component="p" variant="p">
                    Seance du: 12/12/1212
                </Typography> */}
                <Typography sx={{ mt: 2 }} component="p" variant="p">
                    Statut: Non paye
                </Typography>
                <Box
                    sx={{
                        border: 0.4,
                        borderColor: "grey.500",
                        padding: 1,
                        borderRadius: 1.5
                    }}
                >
                    <Typography component="p" variant="p">
                        Deffinissez la somme que vous voulez payer!
                    </Typography>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <TextField label="Somme a payer" type="number" />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Slider
                            aria-label="Restricted values"
                            defaultValue={500}
                            // valueLabelFormat={valueLabelFormat}
                            // getAriaValueText={valuetext}
                            step={500}
                            min={500}
                            max={200000}
                            valueLabelDisplay="auto"
                        />
                    </FormControl>
                </Box>
                <Box mt={2} flexDirection="row" justifyContent="space-between">
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <Button variant="contained" size="medium" fullWidth>
                            {" "}
                            Proceder{" "}
                        </Button>
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
