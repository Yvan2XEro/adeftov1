import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Drawer as MuiDrawer } from "@mui/material";

function Drawer({ openDrawer, setOpenDrawer }) {
    return (
        <MuiDrawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Box onClick={() => setOpenDrawer(false)}>
                <Link to="/">Home</Link>
            </Box>
            <Box onClick={() => setOpenDrawer(false)}>
                <Link to="/">Home</Link>
            </Box>
            <Box onClick={() => setOpenDrawer(false)}>
                <Link to="/">Home</Link>
            </Box>
            <Box onClick={() => setOpenDrawer(false)}>
                <Link to="/">Home</Link>
            </Box>
        </MuiDrawer>
    );
}
export default Drawer;
