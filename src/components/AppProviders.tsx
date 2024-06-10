import React from "react";
import { ThemeProvider } from "./Theme";
import { useInstance } from "../lib/useInstance";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryCLient = useInstance(() => new QueryClient({
        defaultOptions: {
            mutations: {

            },
            queries: {

            }
        }
    }));

    return (
        <ThemeProvider>
            <QueryClientProvider client={queryCLient}>
                {children}
            </QueryClientProvider>
        </ThemeProvider>
    )
};
