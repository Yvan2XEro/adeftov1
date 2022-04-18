import ImageTheme from "../components/ImageTheme";
import React, { useContext, useEffect } from "react";
import { Box } from "@mui/system";
import {
    Avatar,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../components/Copyright";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import auth from "../services/auth";
import { AuthContext } from "../contexts/AuthContextProvider";
import { LoadingButton } from "@mui/lab";

function RegisterPage() {
    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <ImageTheme />
            <RegisterForm />
        </Grid>
    );
}
export default RegisterPage;

const shema = yup.object().shape({
    email: yup.string().email().required(),
    firstname: yup.string().min(3).required(),
    lastname: yup.string().min(3).required(),
    phone: yup.string().required(),
    password: yup.string().min(6).required(),
});

function RegisterForm() {
    const navigate = useNavigate();
    const {setIsAuthenticated, isAuthenticated} = useContext(AuthContext);
    const submit = async (data) => {
        await auth.register(data)
            .then(() => {
                toast.success("Register success!");
                setIsAuthenticated(true);
                navigate("/contributions");
            })
            .catch((err) => {
                if(!err.response) {
                    toast.error("Server error! Please try later!", {autoClose: false})
                }
                else if(err.response.status >=400 && err.response.status<500) {
                    console.log(err.response.data);
                    toast.error('Wrong credentials!', {autoClose: false})
                }
            });
    };
    useEffect(() => {
        if(isAuthenticated) {
            navigate("/contributions");
        }
    }, [isAuthenticated]);
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid },  } = useForm({
        resolver: yupResolver(shema),
        mode: 'onChange'
    });
    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(submit)}
                    sx={{ mt: 1 }}
                >
                    <FormControl fullWidth>
                        <TextField
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            {...register("firstname")}
                            required
                            fullWidth
                            id="firstname"
                            label="Firstname"
                            name="firstname"
                            error={!!errors.firstname?.message}
                            autoComplete="firstname"
                            variant="standard"
                            autoFocus
                        />
                        {!!errors.firstname && (
                            <Typography
                                color="error"
                                component="span"
                                variant="caption"
                            >
                                {errors.firstname?.message}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            margin="normal"
                            {...register("lastname")}
                            required
                            fullWidth
                            id="lastname"
                            label="Lastname"
                            name="lastname"
                            error={!!errors.lastname?.message}
                            autoComplete="lastname"
                            variant="standard"
                        />
                        {!!errors.lastname && (
                            <Typography
                                color="error"
                                component="span"
                                variant="caption"
                            >
                                {errors.lastname?.message}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            {...register("email")}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            error={!!errors.email?.message}
                            autoComplete="email"
                            variant="standard"
                        />
                        {!!errors.email && (
                            <Typography
                                color="error"
                                component="span"
                                variant="caption"
                            >
                                {errors.email?.message}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            margin="normal"
                            {...register("phone")}
                            required
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            error={!!errors.email?.message}
                            variant="standard"
                        />
                        {!!errors.phone && (
                            <Typography
                                color="error"
                                component="span"
                                variant="caption"
                            >
                                {errors.phone?.message}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            margin="normal"
                            {...register("password")}
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            error={!!errors.email?.message}
                            variant="standard"
                        />
                        {!!errors.password && (
                            <Typography
                                color="error"
                                component="span"
                                variant="caption"
                            >
                                {errors.password?.message}
                            </Typography>
                        )}
                    </FormControl>
                    <LoadingButton
                        loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </LoadingButton>
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Box>
        </Grid>
    );
}
