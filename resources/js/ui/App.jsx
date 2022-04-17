import { createTheme, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import reactDom from "react-dom/client";

function App() {
    const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
    const onToggleDarkTheme = () => {
        localStorage.setItem("theme", mode === "dark" ? "light" : "dark");
        setMode(mode === "dark" ? "light" : "dark");
    };

    const theme = createTheme({ palette: { mode } });
    return (
        <ThemeProvider theme={theme}>
            <div>uewuieuiefuie</div>
        </ThemeProvider>
    );
}

const root = reactDom.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
