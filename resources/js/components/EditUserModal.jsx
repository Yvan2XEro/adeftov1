import {
    Alert,
    Box,
    Button,
    FormControl,
    Modal,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { addUser, updateUser } from "../services/usersServices";

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


function EditUserModal({ onSuccess, selected, open, onClose }) {
    const shema = yup.object().shape({
    email: yup.string().email(),
    firstname: yup.string().min(3),
    lastname: yup.string().min(3),
    phone: yup.string(),
    password: selected?undefined:yup.string().min(6).required(),
    num_cni: yup.string(),
});
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors, isValid },
    } = useForm({
        resolver: yupResolver(shema),
        mode: "onChange",
    });
    const submit = async (data) => {
        const d = { ...data, phone: data.phone ? data.phone : "" };
        if (!!selected) {
            await updateUser(selected?.id, d)
                .then((response) => {
                    toast.success("Modification effectuée avec succès");
                    reset();
                    onSuccess();
                    onClose();
                })
                .catch((err) => {
                    if (
                        err.response.status >= 400 &&
                        err.response.status < 500
                    ) {
                        setErrorApiMsg(err.response.data.errors[0]);
                    }
                    toast.error("Une erreur est survenue");
                });
        } else {
            await addUser(d)
                .then((response) => {
                    toast.success("Utilisateur ajouté avec succès");
                    reset();
                    onSuccess();
                    onClose();
                })
                .catch((err) => {
                    if (
                        err.response.status >= 400 &&
                        err.response.status < 500
                    ) {
                        setErrorApiMsg(err.response.data.errors[0]);
                    }
                    toast.error("Une erreur est survenue");
                });
        }
    };
    const [errorApiMsg, setErrorApiMsg] = useState("");
    return (
        <Modal
            sx={{ border: "none" }}
            closeAfterTransition={true}
            open={open}
            onClose={onSuccess}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit(submit)}>
                <Typography
                    sx={{ mt: 2, ml: 1, mr: 1 }}
                    component="h4"
                    variant="h4"
                >
                    {selected
                        ? "Editer les informations de l'utilisateur"
                        : "Ajouter un nouvel User au systeme"}
                </Typography>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        label="Nom"
                        multiline
                        maxRows={1}
                        error={!!errors.firstname}
                        fullWidth
                        {...register("firstname")}
                        defaultValue={selected?.firstname}
                    />
                    {errors.firstname?.message && (
                        <Typography variant="caption" color="error">
                            {errors.firstname?.message}
                        </Typography>
                    )}
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        {...register("lastname")}
                        multiline
                        maxRows={1}
                        defaultValue={selected?.lastname}
                        error={!!errors.lastname}
                        label="Prenom"
                        fullWidth
                    />
                    {errors.lastname?.message && (
                        <Typography variant="caption" color="error">
                            {errors.lastname?.message}
                        </Typography>
                    )}
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        {...register("email")}
                        multiline
                        maxRows={1}
                        error={!!errors.email}
                        defaultValue={selected?.email}
                        label="Email"
                        fullWidth
                    />
                    {errors.email?.message && (
                        <Typography variant="caption" color="error">
                            {errors.email?.message}
                        </Typography>
                    )}
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        {...register("phone")}
                        multiline
                        maxRows={1}
                        error={!!errors.phone}
                        defaultValue={selected?.phone}
                        label="Numero de telephone"
                        fullWidth
                    />
                    {errors.phone?.message && (
                        <Typography variant="caption" color="error">
                            {errors.phone?.message}
                        </Typography>
                    )}
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        {...register("num_cni")}
                        multiline
                        maxRows={1}
                        error={!!errors.num_cni}
                        defaultValue={selected?.num_cni}
                        label="Numero de CNI"
                        fullWidth
                    />
                    {errors.num_cni?.message && (
                        <Typography variant="caption" color="error">
                            {errors.num_cni?.message}
                        </Typography>
                    )}
                </FormControl>
                {!selected&&<FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        {...register("password")}
                        type="password"
                        maxRows={1}
                        error={!!errors.password}
                        label="Mot de passe"
                        fullWidth
                    />
                    {errors.password?.message && (
                        <Typography variant="caption" color="error">
                            {errors.password?.message}
                        </Typography>
                    )}
                </FormControl>}
                {errorApiMsg && <Alert severity="error">{errorApiMsg}</Alert>}
                <LoadingButton
                    type="submit"
                    size="small"
                    sx={{ mt: 1 }}
                    fullWidth
                    color="primary"
                    loading={isSubmitting}
                    variant="contained"
                >
                    <Typography variant="h6">Enregistrer</Typography>
                </LoadingButton>
                <LoadingButton
                    type="submit"
                    size="small"
                    sx={{ mt: 1 }}
                    fullWidth
                    color="error"
                    onClick={onClose}
                    variant="outlined"
                >
                    <Typography variant="h6">Annuler</Typography>
                </LoadingButton>
            </Box>
        </Modal>
    );
}

export default EditUserModal;
