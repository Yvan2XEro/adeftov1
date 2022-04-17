import { createTheme, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom/client";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
    const onToggleDarkTheme = () => {
        localStorage.setItem("theme", mode === "dark" ? "light" : "dark");
        setMode(mode === "dark" ? "light" : "dark");
    };

    const theme = createTheme({ palette: { mode } });
    useEffect(() => {
        toast.success("Welcome to React-Toastify!");
        }, []);
    return (
        <ThemeProvider theme={theme}>
            <div>uewuieuiefuie</div>
            <ToastContainer position="bottom-right" />
        </ThemeProvider>
    );
}

const root = reactDom.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
