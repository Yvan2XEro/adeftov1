import {
    Alert,
    Autocomplete,
    Avatar,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    Input,
    Table,
    TableCell,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import * as React from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import auth, { emailRegex } from "../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { imagePath, defaultImage } from "../services/htt";
import cities from "../assets/cities.json";

function ProfilePage() {
    const navigate = useNavigate();
    const { isAuthenticated, user, setUser } = React.useContext(AuthContext);
    React.useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Vous devez être connecté pour accéder à cette page");
            navigate("/login");
        }
    }, [isAuthenticated]);
    return (
        <Box mt={10}>
            <Typography sx={{ mt: 10 }} component="h2" variant="h3">
                Mon Profil
            </Typography>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Box sx={{ mx: 1, boxShadow: 5, p: 2 }}>
                        <Profile data={user} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ mx: 1, boxShadow: 5, p: 2 }}>
                        <ProfileForm data={user} onChange={setUser} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export const Profile = ({ data }) => {
    return (
        <Box>
            <Box>
                <Avatar
                    sx={{ width: 100, height: 100, mx: "auto" }}
                    alt="Cindy Baker"
                    src={data?.avatar ? imagePath(data?.avatar) : defaultImage}
                />
            </Box>
            <Box>
                <Table>
                    <TableRow>
                        <TableCell>
                            <Typography
                                sx={{ fontWeight: "bold" }}
                                variant="h6"
                            >
                                Nom
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="p">
                                {data?.firstname}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography
                                sx={{ fontWeight: "bold" }}
                                variant="h6"
                            >
                                Prenom
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="p">
                                {data?.lastname}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography
                                sx={{ fontWeight: "bold" }}
                                variant="h6"
                            >
                                Email
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="p">{data?.email}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography
                                sx={{ fontWeight: "bold" }}
                                variant="h6"
                            >
                                Phone
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="p">{data?.phone}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography
                                sx={{ fontWeight: "bold" }}
                                variant="h6"
                            >
                                Num CNI
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="p">{data?.num_cni}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography
                                sx={{ fontWeight: "bold" }}
                                variant="h6"
                            >
                                Arrondissement
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="p">{data?.city}</Typography>
                        </TableCell>
                    </TableRow>
                </Table>
            </Box>
        </Box>
    );
};

function ProfileForm({ data, onChange }) {
    const [avatar, setAvatar] = React.useState(null);
    const [avatarUrl, setAvatarUrl] = React.useState(null);
    const [user, setUser] = React.useState(data);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    React.useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data]);

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await auth
            .updateUser(user)
            .then((response) => {
                onChange(response.data);
                setIsSubmitting(false);
                toast.success("Modification effectuée avec succès");
            })
            .catch((error) => {
                if (typeof error.response !== "undefined")
                    toast.error("Une erreur est survenue");
                setIsSubmitting(false);
            });
    };
    const [loadingAvatar, setLoadingAvatar] = React.useState(false);
    const [apiError, setApiError] = React.useState("");
    const updateAvatar = async () => {
        const fd = new FormData();
        fd.append("image", avatar, avatar.name);
        setLoadingAvatar(true);
        setApiError("");
        await auth
            .setAvatar(fd)
            .then((response) => {
                clearUploadedAvatar();
                onChange(response.data.user);
                setLoadingAvatar(false);
            })
            .catch((error) => {
                if (error.response.status < 500)
                    setApiError(error.response.data.errors);
                setLoadingAvatar(false);
            })
            .finally(() => setLoadingAvatar(false));
    };
    const clearUploadedAvatar = () => {
        setAvatar(null);
        setAvatarUrl(null);
    };
    return (
        <Box>
            <Box component="form" onSubmit={submit}>
                <Box textAlign="center">
                    <FormControl
                        sx={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Input
                                id="avatar"
                                type="file"
                                sx={{ display: "none" }}
                                accept="image/gif, image/jpeg, image/png"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setAvatar(file);
                                    var reader = new FileReader();
                                    reader.onload = (e) => {
                                        if (reader.readyState == 2) {
                                            setAvatarUrl(reader.result);
                                        }
                                    };
                                    reader.readAsDataURL(file);
                                }}
                            />
                            <label htmlFor="avatar">
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        mx: "auto",
                                        cursor: "pointer",
                                    }}
                                    alt="Cindy Baker"
                                    src={
                                        avatarUrl
                                            ? avatarUrl
                                            : data?.avatar
                                            ? imagePath(data?.avatar)
                                            : defaultImage
                                    }
                                />
                                <IconButton
                                    sx={{ mx: "auto" }}
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                    size="large"
                                >
                                    <PhotoCameraIcon />
                                </IconButton>
                            </label>

                            {avatarUrl && (
                                <>
                                    <Button
                                        sx={{ mx: "auto" }}
                                        onClick={clearUploadedAvatar}
                                        color="error"
                                        aria-label="upload picture"
                                        size="large"
                                    >
                                        <DeleteIcon />
                                    </Button>
                                    <LoadingButton
                                        sx={{ mx: "auto" }}
                                        onClick={updateAvatar}
                                        loading={loadingAvatar === true}
                                        color="success"
                                        variant="outlined"
                                        aria-label="upload picture"
                                        title="Appliquer la photo de profil"
                                        size="large"
                                    >
                                        <FileUploadIcon />
                                    </LoadingButton>
                                </>
                            )}
                            {apiError && (
                                <Alert severity="error">{apiError}</Alert>
                            )}
                        </Box>
                    </FormControl>
                </Box>

                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        label="Nom"
                        error={user?.firstname?.length < 3}
                        fullWidth
                        value={user?.firstname}
                        onChange={(e) =>
                            setUser({ ...user, firstname: e.target.value })
                        }
                    />
                    {user?.firstname?.length < 3 && (
                        <Typography variant="caption" color="error">
                            Le nom doit contenir au moins 3 caracteres
                        </Typography>
                    )}
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        error={user?.lastname?.length < 3}
                        label="Prenom"
                        fullWidth
                        value={user?.lastname}
                        onChange={(e) =>
                            setUser({ ...user, lastname: e.target.value })
                        }
                    />
                    {user?.lastname?.length < 3 && (
                        <Typography variant="caption" color="error">
                            {errors.lastname?.message}
                        </Typography>
                    )}
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        error={!emailRegex.test(user?.email)}
                        label="Email"
                        fullWidth
                        value={user?.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                    {!emailRegex.test(user?.email) && (
                        <Typography variant="caption" color="error">
                            Veillez entrer un email valide
                        </Typography>
                    )}
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        label="Numero de telephone"
                        fullWidth
                        type="tel"
                        value={user?.phone}
                        onChange={(e) =>
                            setUser({ ...user, phone: e.target.value })
                        }
                    />
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        error={user?.num_cni?.length < 3}
                        label="Numero de CNI"
                        fullWidth
                        value={user?.num_cni}
                        onChange={(e) =>
                            setUser({ ...user, num_cni: e.target.value })
                        }
                    />
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <Autocomplete
                        id="virtualize-demo"
                        options={[...cities]}
                        label="Arrondissement"
                        fullWidth
                        value={user?.city}
                        onChange={(e, value) =>
                            setUser({ ...user, city: value })
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Arrondissement" />
                        )}
                    />
                    {cities.indexOf(user?.city) < 0 && (
                        <Typography variant="caption" color="error">
                            Veillez selectionner un arrondissement
                        </Typography>
                    )}
                </FormControl>
                <LoadingButton
                    type="submit"
                    sx={{ mt: 1 }}
                    fullWidth
                    color="primary"
                    loading={isSubmitting}
                    variant="contained"
                >
                    <Typography variant="h6">Enregistrer</Typography>
                </LoadingButton>
            </Box>
            <Box>
                <ChangePasswordFrom user={user} />
            </Box>
        </Box>
    );
}

export default ProfilePage;

const pwShema = yup.object().shape({
    oldPassword: yup.string().min(6, "Au moins 6 caracteres").required(),
    newPassword: yup.string().min(6, "Au moins 6 caracteres").required(),
});
const ChangePasswordFrom = ({ user }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        resolver: yupResolver(pwShema),
        mode: "onChange",
    });
    const submit = async (data) => {
        auth.updatePassword({
            ...data,
            oldPassword: data.oldPassword.trim(),
            newPassword: data.newPassword.trim(),
        })
            .then(() => {
                toast.success("Le mot de passe a été modifié avec succès");
                reset();
            })
            .catch((e) => {
                if (e.response.status === 422)
                    toast.error("Ancien mot de passe incorrect", {
                        autoClose: false,
                    });
                else {
                    toast.error("Une erreur est survenue");
                }
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit(submit)} mt={3}>
            <Typography variant="h6">Changer le mot de passe</Typography>
            <FormControl sx={{ mt: 1 }} fullWidth>
                <TextField
                    {...register("oldPassword")}
                    type="password"
                    multiline
                    maxRows={1}
                    id="oldPassword"
                    name="oldPassword"
                    error={!!errors.oldPassword}
                    label="Ancien mot de passe"
                    fullWidth
                />
                {errors.oldPassword?.message && (
                    <Typography variant="caption" color="error">
                        {errors.oldPassword?.message}
                    </Typography>
                )}
            </FormControl>
            <FormControl sx={{ mt: 1 }} fullWidth>
                <TextField
                    {...register("newPassword")}
                    type="password"
                    multiline
                    maxRows={1}
                    id="newPassword"
                    name="newPassword"
                    error={!!errors.newPassword}
                    label="Nouveau mot de passe"
                    fullWidth
                />
                {errors.newPassword?.message && (
                    <Typography variant="caption" color="error">
                        {errors.newPassword?.message}
                    </Typography>
                )}
            </FormControl>
            <LoadingButton
                type="submit"
                sx={{ mt: 1 }}
                fullWidth
                color="primary"
                loading={isSubmitting}
                variant="contained"
                disabled={!isValid}
            >
                <Typography variant="h6">Changer mon mot de passe</Typography>
            </LoadingButton>
        </Box>
    );
};
