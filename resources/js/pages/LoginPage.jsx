import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import ImageTheme from "../components/ImageTheme";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Copyright from "../components/Copyright";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import auth from "../services/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function LoginPage() {
    return (
        <>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <ImageTheme />
                <LoginForm />
            </Grid>
        </>
    );
}

const shema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const submit = async (data) => {
        await auth
            .login(data)
            .then(() => {
                toast.success("Login success!");
                navigate("/contributions");
            })
            .catch((err) => {
                if (!err.response) {
                    toast.error("Server error! Please try later!", {
                        autoClose: false,
                    });
                } else if (
                    err.response.status >= 400 &&
                    err.response.status < 500
                ) {
                    toast.error("Wrong credentials!", { autoClose: false });
                }
            });
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm({ mode: "onChange", resolver: yupResolver(shema) });

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
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(submit)}
                    noValidate
                    sx={{ mt: 1 }}
                >
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
                            error={errors.email?.message}
                            autoComplete="email"
                            variant="standard"
                            autoFocus
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
                            required
                            variant="standard"
                            name="password"
                            label="Password"
                            type="password"
                            {...register("password")}
                            error={errors.password?.message}
                            id="password"
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        color="primary"
                        loading={isSubmitting}
                        variant="contained"
                        disabled={!isValid}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Box>
        </Grid>
    );
};
