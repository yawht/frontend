import React from "react";
import { ThemeProvider } from "./Theme";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
};
