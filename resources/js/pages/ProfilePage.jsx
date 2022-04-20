import {
    Avatar,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputLabel,
    Table,
    TableCell,
    TableHead,
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
import DeleteIcon from '@mui/icons-material/Delete';

function ProfilePage() {
    const navigate = useNavigate();
    const { isAuthenticated, user, setUser } = React.useContext(AuthContext);
    React.useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Vous devez être connecté pour accéder à cette page");
            navigate("/login");
        }
    }, [isAuthenticated]);
    React.useEffect(() => {}, [user]);

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
                    src="https://cdn.pixabay.com/photo/2017/02/04/12/25/man-2037255__340.jpg"
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
    email: yup.string().email().required(),
    firstname: yup.string().min(3).required(),
    lastname: yup.string().min(3).required(),
    phone: yup.string().required(),
    num_cni: yup.string(),
});

function ProfileForm({ data, onChange }) {
    const [avatar, setAvatar] = React.useState(null);
    const [avatarUrl, setAvatarUrl] = React.useState(null);
    const [user, setUser] = React.useState(data);
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors, isValid },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(shema),
    });
    React.useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data]);

    const submit = async (data) => {
        await auth
            .updateUser(data)
            .then((response) => {
                onChange(response.data);
                toast.success("Modification effectuée avec succès");
            })
            .catch((error) => {
                toast.error("Une erreur est survenue");
            });
    };

    return (
        <Box
            mt={10}
            component="form"
            onSubmit={handleSubmit(submit)}
        >
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
                                        : "https://cdn.pixabay.com/photo/2017/02/04/12/25/man-2037255__340.jpg"
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

                            {avatarUrl&&<Button
                                sx={{ mx: "auto" }}
                                onClick={() => {
                                    setAvatarUrl(null);
                                    setAvatar(null);
                                }}
                                color="error"
                                aria-label="upload picture"
                                component="span"
                                size="large"
                            >
                                <DeleteIcon />
                            </Button>}
                    </Box>
                </FormControl>
            </Box>

            <FormControl sx={{ mt: 1 }} fullWidth>
                <TextField
                    label="Nom"
                    multiline
                    error={!!errors.firstname?.message}
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
                    defaultValue={user?.lastname}
                    error={!!errors.lastname?.message}
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
                    error={!!errors.email?.message}
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
                    error={!!errors.phone?.message}
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
                    error={!!errors.num_cni?.message}
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
                fullWidth
                color="primary"
                loading={isSubmitting}
                variant="contained"
                disabled={!isValid}
            >
                <Typography variant="h6">Enregistrer</Typography>
            </LoadingButton>
        </Box>
    );
}

export default ProfilePage;
