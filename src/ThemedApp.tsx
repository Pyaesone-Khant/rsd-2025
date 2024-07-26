import React, { createContext, useState } from "react";
import App from "./App";

interface AppContextType {
    mode: string;
    setMode: (mode: string) => void;
}

export const AppContext = createContext<AppContextType | null>({
    mode: "dark",
    setMode: () => { },
});


const ThemedApp = () => {

    const [mode, setMode] = useState("dark")

    return <AppContext.Provider value={{ mode, setMode }}>
        <App />
    </AppContext.Provider>
}

export default ThemedApp
