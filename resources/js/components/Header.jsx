import React, { useContext, useState } from "react";
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
import { Box, Button, Switch, useMediaQuery, useTheme } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "./Drawer";
import { AuthContext } from "../contexts/AuthContextProvider";

export default function Header({ onToggleDarkTheme, isDarkTheme }) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const { isAdmin, user, isAuthenticated, logout } = useContext(AuthContext);

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
                        <Button>
                            <NavLink
                                to="/"
                                className="nav-link"
                                activeClassName="active"
                            >
                                <HomeIcon />
                            </NavLink>
                        </Button>
                    </IconButton>
                    <Box ml="auto">
                        {!isMobile && (
                            <>
                                {!isAuthenticated ? (
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
                                                <LoginIcon
                                                    size="large"
                                                    edge="start"
                                                    color="inherit"
                                                />
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
                                ) : (
                                    <>
                                        <Button
                                            variant="h6"
                                            component="div"
                                            sx={{ flexGrow: 1 }}
                                        >
                                            <NavLink
                                                className="paper.inherit"
                                                activeClassName="active"
                                                to="contributions"
                                            >
                                                Cautisations
                                            </NavLink>
                                        </Button>
                                        <Button
                                            className="nav-link"
                                            edge="start"
                                            color="inherit"
                                            onClick={() => logout()}
                                        >
                                            <ExitToAppIcon size="small" />
                                        </Button>
                                    </>
                                )}
                            </>
                        )}

                        <Switch
                            checked={isDarkTheme}
                            icon={<DarkModeIcon color="primary" />}
                            onChange={onToggleDarkTheme}
                            inputProps={{ "aria-label": "controlled" }}
                        />

                    {isMobile && (
                        <IconButton
                        sx={{ ml: "auto" }}
                        onClick={() => setOpenDrawer(!openDrawer)}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    </Box>
                </Toolbar>
            </AppBar>
            {isMobile && (
                <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
            )}
        </>
    );
}
