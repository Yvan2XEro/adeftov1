import { createTheme, ThemeProvider } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import reactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "../components/AppRoutes";
import Header from "../components/Header";

function App() {
    const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
    const onToggleDarkTheme = () => {
        localStorage.setItem("theme", mode === "dark" ? "light" : "dark");
        setMode(mode === "dark" ? "light" : "dark");
    };

    const theme = createTheme({ palette: { mode } });
    useEffect(() => {

    }, []);
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Fragment>
                    <Header
                        isDarkTheme={mode === "dark"}
                        onToggleDarkTheme={onToggleDarkTheme}
                    />
                    <AppRoutes />
                    <ToastContainer position="bottom-right" />
                </Fragment>
            </BrowserRouter>
        </ThemeProvider>
    );
}

const root = reactDom.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
