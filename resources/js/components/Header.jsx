import React, { useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, Switch } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { toast } from "react-toastify";

export default function Header({ onToggleDarkTheme, isDarkTheme }) {

  const navigate = useNavigate();

  const handleLogout = () => {
  };

  useEffect(() => {
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="inherit">
        <Toolbar position="static">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <NavLink to="/" className="nav-link" activeClassName="active">
              <HomeIcon />
            </NavLink>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink className="nav-link" activeClassName="active" to="contributions">
              Cautisations
            </NavLink>
          </Typography>
          {(
            <>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="login"
                >
                  <LoginIcon size="large" edge="start" color="inherit" />
                </NavLink>
              </IconButton>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="register"
                >
                  <PersonAddIcon />
                </NavLink>
              </IconButton>
            </>
          )}
          {(
            <>
              <Typography variant="small" component="div">
                Yooo
              </Typography>
              <Button
                className="nav-link"
                edge="start"
                color="inherit"
                onClick={() => handleLogout()}
              >
                <ExitToAppIcon size="small" />
              </Button>
            </>
          )}

          <Switch
            checked={isDarkTheme}
            icon={<DarkModeIcon color="primary" />}
            onChange={onToggleDarkTheme}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Toolbar>
      </AppBar>
    </>
  );
}
