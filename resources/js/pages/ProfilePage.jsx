import {
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
import auth from "../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { imagePath, defaultImage } from "../services/htt";

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
        <Container mt={10}>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Box sx={{ borderColor: "grey.500", mx: 1 }}>
                        <Profile data={user} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ borderColor: "grey.500", mx: 1 }}>
                        <ProfileForm data={user} onChange={setUser} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

const Profile = ({ data }) => {
    return (
        <Box mt={10}>
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
                </Table>
            </Box>
        </Box>
    );
};

const shema = yup.object().shape({
    email: yup.string().email(),
    firstname: yup.string().min(3),
    lastname: yup.string().min(3),
    phone: yup.string(),
    num_cni: yup.string(),
});

function ProfileForm({ data, onChange }) {
    const [avatar, setAvatar] = React.useState(null);
    const [avatarUrl, setAvatarUrl] = React.useState(null);
    const [user, setUser] = React.useState(data);
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors, isValid },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(shema),
        defaultValues: React.useMemo(() => {
            return user;
        }, [user]),
    });
    React.useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data]);

    const submit = async (data) => {
        await auth
            .updateUser({ ...data, phone: data.phone ? data.phone : "" })
            .then((response) => {
                onChange(response.data);
                toast.success("Modification effectuée avec succès");
            })
            .catch((error) => {
                toast.error("Une erreur est survenue");
            })
            .finally(() => {
                reset();
            });
    };

    const updateAvatar = async () => {
        const fd = new FormData();
        fd.append("image", avatar, avatar.name);
        await auth
            .setAvatar(fd)
            .then((response) => {
                onChange(response.data.user);
                toast.success("Modification effectuée avec succès");
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    return (
        <Box>
            <Box mt={10} component="form" onSubmit={handleSubmit(submit)}>
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
                                        onClick={() => {
                                            setAvatarUrl(null);
                                            setAvatar(null);
                                        }}
                                        color="error"
                                        aria-label="upload picture"
                                        size="large"
                                    >
                                        <DeleteIcon />
                                    </Button>
                                    <Button
                                        sx={{ mx: "auto" }}
                                        onClick={updateAvatar}
                                        color="success"
                                        variant="outlined"
                                        aria-label="upload picture"
                                        title="Appliquer la photo de profil"
                                        size="large"
                                    >
                                        <FileUploadIcon />
                                    </Button>
                                </>
                            )}
                        </Box>
                    </FormControl>
                </Box>

                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        label="Nom"
                        multiline
                        maxRows={1}
                        error={!!errors.firstname}
                        fullWidth
                        {...register("firstname")}
                        defaultValue={user?.firstname}
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
                        defaultValue={user?.lastname}
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
                        defaultValue={user?.email}
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
                        defaultValue={user?.phone}
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
                        defaultValue={user?.num_cni}
                        label="Numero de CNI"
                        fullWidth
                    />
                    {errors.num_cni?.message && (
                        <Typography variant="caption" color="error">
                            {errors.num_cni?.message}
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
