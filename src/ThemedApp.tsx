import { Alert, AlertColor, createTheme, CssBaseline, PaletteMode, Snackbar, ThemeProvider } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import React, { createContext, useContext, useMemo, useState } from "react";
import App from "./App";
import AppDrawer from "./components/AppDrawer";

declare module '@mui/material/styles' {
    interface Palette {
        banner: string;
    }
    interface PaletteOptions {
        banner?: string;
    }
}

interface AlertType {
    alertType: "success" | "info" | "warning" | "error";
    alertMsg: string
}

interface AppContextType {
    mode: string,
    setMode: React.Dispatch<React.SetStateAction<string>>,
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    showDrawer: boolean;
    setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    auth: boolean
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
    alert: AlertType | null
    setAlert: React.Dispatch<React.SetStateAction<AlertType | null>>
}

export const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
    return useContext(AppContext) as AppContextType;
}

const ThemedApp = () => {
    const [mode, setMode] = useState("dark")
    const [showForm, setShowForm] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [auth, setAuth] = useState<boolean>(false)
    const [alert, setAlert] = useState<AlertType | null>(null);

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: mode as PaletteMode,
                primary: deepPurple,
                banner: mode === "dark" ? grey[900] : grey[100],
                text: {
                    primary: grey[500]
                }
            },
        })
    }, [mode])

    const data = {
        mode,
        setMode,
        showForm,
        setShowForm,
        showDrawer,
        setShowDrawer,
        auth,
        setAuth,
        alert,
        setAlert
    }

    return <ThemeProvider theme={theme}>
        <AppContext.Provider value={data}>
            <AppDrawer />
            <App />

            <Snackbar
                open={Boolean(alert)}
                onClose={() => setAlert(null)}
                autoHideDuration={3000}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'top'
                }}>
                <Alert severity={alert?.alertType as AlertColor} >
                    {alert?.alertMsg}
                </Alert>
            </Snackbar>
            <CssBaseline />
        </AppContext.Provider>
    </ThemeProvider>
}

export default ThemedApp
