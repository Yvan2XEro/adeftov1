import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Drawer as MuiDrawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Drawer({ openDrawer, setOpenDrawer }) {
    return (
        <MuiDrawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Box
                ml={2}
                sx={{ minWidth: 200, width: 200, position: "relative" }}
            >
                <Button onClick={()=>setOpenDrawer(false)} color="inherit" sx={{ position: "absolute", right: 5, top: 5 }}>
                    <CloseIcon  />
                </Button>
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
                    <Box>
                        <Button
                            to="/"
                            component={Link}
                            onClick={() => setOpenDrawer(false)}
                        >
                            Cotisations
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Button
                            to="/login"
                            size="small"
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
                            component={Link}
                            onClick={() => setOpenDrawer(false)}
                        >
                            Register
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Button
                            variant="outlined"
                            to="/register"
                            color="error"
                            size="small"
                            component={Link}
                            onClick={() => setOpenDrawer(false)}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Box>
        </MuiDrawer>
    );
}
export default Drawer;
