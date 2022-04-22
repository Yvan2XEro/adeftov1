import React, { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

function UserMenu({onSelectItem}) {
        const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        if(onSelectItem) {
            onSelectItem()
        }
    };
    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Button size="small" component={Link} to="/profile">
                        Mon profile
                    </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button size="small" component={Link} to="/account">
                        Mon compte
                    </Button>
                </MenuItem>
            </Menu>
        </>
    );
}

export default UserMenu;
