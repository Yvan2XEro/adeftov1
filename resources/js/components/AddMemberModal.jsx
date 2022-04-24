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
import AddIcon from "@mui/icons-material/Add";

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

function AddMemberModal({ onSuccess, onFailure, open, onClose }) {
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
                <Typography sx={{ mt: 2, ml: 1, mr: 1 }} component="h4" variant="h4">
                    Ajouter un nouvel User au systeme
                </Typography>
                
                    <TextField
                        required
                        id="filled-required"
                        label="Firstname"
                        variant="filled"
                        fullWidth
                        sx={{mt:2}}
                    />

                
                <TextField
                    required
                    id="filled-required"
                    label="Lasttname"
                    variant="filled"
                    fullWidth
                    sx={{mt:2}}
                />
                <TextField
                    required
                    id="filled-required"
                    label="Email"
                    variant="filled"
                    fullWidth
                    sx={{mt:2}}
                />
                <TextField
                required
                id="filled-required"
                label="Phone"
                variant="filled"
                type="number"
                fullWidth
                sx={{mt:2}}
            />
            <TextField
            required
            id="filled-required"
            label="Password"
            variant="filled"
            type="password"
            fullWidth
            sx={{mt:2}}
        />
            
                <Box mt={2} flexDirection="row" justifyContent="space-between">
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <Button variant="contained" size="medium" fullWidth
                            startIcon={<AddIcon />}>
                            {" "}
                            Ajouter{" "}
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

export default AddMemberModal;
