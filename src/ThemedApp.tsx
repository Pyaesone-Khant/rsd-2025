import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import App from "./App";

interface AppContextType {
    // mode: string
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const theme = createTheme({
    palette: {
        mode: "dark"
    }
})

export const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
    return useContext(AppContext) as AppContextType;
}

const ThemedApp = () => {

    const [showForm, setShowForm] = useState(false)

    return <ThemeProvider theme={theme}>
        <AppContext.Provider value={{ showForm, setShowForm }}>
            <App />
            <CssBaseline />
        </AppContext.Provider>
    </ThemeProvider>
}

export default ThemedApp
