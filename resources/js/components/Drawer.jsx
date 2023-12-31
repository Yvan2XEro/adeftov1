import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Drawer as MuiDrawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../contexts/AuthContextProvider";
import UserMenu from "./UserMenu";

function Drawer({ openDrawer, setOpenDrawer, switchTheme }) {
    const { isAdmin, user, isAuthenticated, logout } = useContext(AuthContext);
    return (
        <MuiDrawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Box
                ml={2}
                sx={{ minWidth: 200, width: 200, position: "relative", pr: 2 }}
            >
                <Button
                    onClick={() => setOpenDrawer(false)}
                    color="inherit"
                    sx={{ position: "absolute", right: 5, top: 5 }}
                >
                    <CloseIcon />
                </Button>
                {isAuthenticated && (
                    <Box>
                        <UserMenu onSelectItem={() => setOpenDrawer(false)} />
                    </Box>
                )}
                <Box mt={3}>
                    <Box>
                        <Button
                            to="/"
                            component={Link}
                            onClick={() => setOpenDrawer(false)}
                        >
                            Acceuil
                        </Button>
                    </Box>
                    
                    {isAuthenticated ? (
                        <Box>
                            {isAdmin && (
                                <Button
                                    component={NavLink}
                                    to="/admin"
                                    activeclassname="paper.primary"
                                >
                                    administration
                                </Button>
                            )}
                            <Button
                                to="/contributions"
                                component={Link}
                                onClick={() => setOpenDrawer(false)}
                            >
                                Cotisations
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Box mt={2}>
                                <Button
                                    to="/login"
                                    size="small"
                                    sx={{width: "100%"}}
                                    variant="contained"
                                    component={Link}
                                    onClick={() => setOpenDrawer(false)}
                                >
                                    Login
                                </Button>
                            </Box>
                            <Box mt={2}>
                                <Button
                                    variant="outlined"
                                    to="/register"
                                    size="small"
                                    sx={{width: "100%"}}
                                    component={Link}
                                    onClick={() => setOpenDrawer(false)}
                                >
                                    Register
                                </Button>
                            </Box>
                        </>
                    )}
                    {isAuthenticated && (
                        <Box mt={2}>
                            <Button
                                variant="outlined"
                                to="/register"
                                color="error"
                                size="small"
                                sx={{width: "100%"}}
                                component={Link}
                                onClick={() => {
                                    logout();
                                    setOpenDrawer(false);
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    )}
                    <Box>
                        {switchTheme}
                    </Box>
                </Box>
            </Box>
        </MuiDrawer>
    );
}
export default Drawer;
