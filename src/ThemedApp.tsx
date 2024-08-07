import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
// colors
import { deepPurple, grey } from "@mui/material/colors";

// types
import { UserProps } from "@typings/types";

// mui components
import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";

// components
import AppSocket from "@src/AppSocket";
import { CommentsPage, FollowersPage, FollowingPage, HomePage, LikesPage, LoginPage, NotisPage, ProfilePage, RegisterPage, SearchPage } from "@src/pages";
import Template from "@src/Template";

// apis
import { fetchVerify } from "./libs/fetcher";

// react router
import { QueryClient, QueryClientProvider } from "react-query";

// router
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
    auth: null | UserProps
    setAuth: React.Dispatch<React.SetStateAction<null | UserProps>>
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
                element: <ProfilePage />,
            },
            {
                path: "/profile/:id/followers",
                element: <FollowersPage />
            },
            {
                path: "/profile/:id/following",
                element: <FollowingPage />
            },
            {
                path: "/comments/:id",
                element: <CommentsPage />
            },
            {
                path: "/likes/:id/:type",
                element: <LikesPage />
            },
            {
                path: "/search",
                element: <SearchPage />
            },
            {
                path: "/notis",
                element: <NotisPage />
            },
        ]
    }
])

export const queryClient = new QueryClient();

const ThemedApp = () => {
    const [mode, setMode] = useState("dark")
    const [showForm, setShowForm] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [auth, setAuth] = useState<null | UserProps>(null)
    const [alert, setAlert] = useState<AlertType | null>(null);

    useEffect(() => {
        fetchVerify().then((user: UserProps) => {
            if (user) setAuth(user);
            else {
                setAuth(null);
                localStorage.removeItem("yaychaToken");
            }
        })
    }, [])

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: mode as PaletteMode,
                primary: deepPurple,
                banner: mode === "dark" ? grey[900] : grey[200],
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
            <QueryClientProvider client={queryClient} >
                <RouterProvider router={router} />
                <AppSocket />
            </QueryClientProvider>
            <CssBaseline />
        </AppContext.Provider>
    </ThemeProvider>
}

export default ThemedApp
