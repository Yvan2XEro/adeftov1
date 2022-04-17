import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import ImageTheme from "../components/ImageTheme";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Copyright from "../components/Copyright";
import { Avatar, Box, Button, Checkbox, FormControlLabel, Link, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


export default function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = () => {
    setIsAuthenticated(true);
    toast.success("Login success!");
    navigate("/posts");
  };
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <ImageTheme />
        <LoginForm
          onSuccess={handleLogin}
          onFailure={() => toast.error("Wrong credentials")}
        />
      </Grid>
    </>
  );
}


const LoginForm = ({ onSuccess, onFailure }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);

  };

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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            variant="standard"
            autoFocus
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            variant="standard"
            name="password"
            label="Password"
            type="password"
            value={password}
            id="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={password === "" || username === ""}
          >
            Sign In
          </Button>
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
}
