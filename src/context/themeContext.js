import { createTheme } from "@mui/material";
import { themeSettings } from "../styles/theme";
import { createContext, useState } from "react";

export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const toggleColorMode = () => setMode(prev => prev === "light" ? "dark" : "light");

    const theme = createTheme(themeSettings(mode), [mode]);

    return [theme, toggleColorMode]
};