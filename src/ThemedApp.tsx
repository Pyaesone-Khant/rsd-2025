import React, { createContext, useContext, useMemo, useState } from "react";
// colors
import { deepPurple, grey } from "@mui/material/colors";

// mui components
import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";

// components
import { CommentsPage, HomePage, LikesPage, LoginPage, ProfilePage, RegisterPage } from "@src/pages";
import Template from "@src/Template";

// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            },
            {
                path: "/profile/:id",
                element: <ProfilePage />
            },
            {
                path: "/comments/:id",
                element: <CommentsPage />
            },
            {
                path: "/likes/:id",
                element: <LikesPage />
            }
        ]
    }
])

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
                    primary: mode === "dark" ? grey[300] : grey[700]
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
            <RouterProvider router={router} />
            <CssBaseline />
        </AppContext.Provider>
    </ThemeProvider>
}

export default ThemedApp
