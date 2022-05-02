import { createTheme, ThemeProvider } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import reactDom from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "../components/AppRoutes";
import Header from "../components/Header";
import AuthContextProvider from "../contexts/AuthContextProvider";
import auth from "../services/auth";
import "./styles.css";

auth.setup();

function App() {
    const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
    const onToggleDarkTheme = () => {
        localStorage.setItem("theme", mode === "dark" ? "light" : "dark");
        setMode(mode === "dark" ? "light" : "dark");
    };

    const theme = createTheme({
        palette: { mode, secondary: {
            main: "#1976d2"
        }},
        typography: {
            fontFamily: ['"Montserrat"', "Open Sans"].join(","),
        },
    });
    useEffect(() => {}, []);
    return (
        <ThemeProvider theme={theme}>
            <HashRouter>
                <Fragment>
                    <AuthContextProvider>
                        <Header
                            isDarkTheme={mode === "dark"}
                            onToggleDarkTheme={onToggleDarkTheme}
                        />
                        <AppRoutes />
                        <ToastContainer position="bottom-right" />
                    </AuthContextProvider>
                </Fragment>
            </HashRouter>
        </ThemeProvider>
    );
}

const root = reactDom.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
