import React, { useContext, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
    Box,
    Button,
    Switch,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "./Drawer";
import { AuthContext } from "../contexts/AuthContextProvider";
import UserMenu from "./UserMenu";

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
                    <Button sx={{ mr: 2 }} component={NavLink} to="/" color="inherit">
                        {/* <NavLink
                            to="/"
                            className="nav-link"
                            activeclassname="active"
                        > */}
                            <HomeIcon />
                        {/* </NavLink> */}
                    </Button>
                    <Box ml="auto">
                        {!isMobile && (
                            <>
                                {!isAuthenticated ? (
                                    <>
                                        <Button
                                            size="small"
                                            edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            sx={{ mr: 2 }}
                                        >
                                            <NavLink
                                                className="nav-link"
                                                activeclassname="active"
                                                to="login"
                                            >
                                                <LoginIcon
                                                    size="large"
                                                    edge="start"
                                                    color="inherit"
                                                />
                                            </NavLink>
                                        </Button>
                                        <IconButton
                                            size="small"
                                            edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            sx={{ mr: 2 }}
                                        >
                                            <NavLink
                                                className="nav-link"
                                                activeclassname="active"
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
                                            component={NavLink}
                                            to="/contributions"
                                            activeclassname="paper.primary"
                                            sx={{ flexGrow: 1 }}
                                        >
                                            cotisations
                                        </Button>
                                        {isAdmin && (
                                            <Button
                                                variant="h6"
                                                component={NavLink}
                                                to="/admin"
                                                activeclassname="paper.primary"
                                                sx={{ flexGrow: 1 }}
                                            >
                                                administration
                                            </Button>
                                        )}
                                        <Button
                                            className="nav-link"
                                            edge="start"
                                            color="inherit"
                                            title="Se deconnecter"
                                            onClick={() => logout()}
                                        >
                                            <ExitToAppIcon size="small" />
                                        </Button>
                                        <UserMenu />
                                    </>
                                )}
                            </>
                        )}

                        <Switch
                            checked={isDarkTheme}
                            icon={<DarkModeIcon color="primary" />}
                            onChange={onToggleDarkTheme}
                            inputProps={{ "aria-label": "controlled" }}
                            title="Changer de theme d'affichage"
                        />

                        {isMobile && (
                            <Button
                                sx={{ ml: "auto" }}
                                onClick={() => setOpenDrawer(!openDrawer)}
                            >
                                <MenuIcon />
                            </Button>
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

