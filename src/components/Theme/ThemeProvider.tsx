import React from "react";
import {
    ThemeProvider as MuiThemeProvider,
    PaletteOptions,
    createTheme
} from "@mui/material";

export type Theme = 'dark' | 'light';

type Context = readonly [Theme, VoidFunction];
export const ThemeContext = React.createContext<Context | null>(null);

const lightThemePalette: PaletteOptions = {
    mode: 'light',
    background: {
        default: '#FFFFFF', // --color--background
    },
    primary: {
        main: '#5AB030', // --color--control-accent
        light: '#E8E9EB', // --color--control-minor
        dark: '#488C26', // --color--control-accent-hover
        contrastText: '#FFFFFF', // --color--text-control-accent
    },
    text: {
        primary: '#333333', // --color--text-primary
        secondary: '#666666', // --color--text-secondary
    }
};

const lightTheme = createTheme({
    palette: lightThemePalette,
});

const darkThemePalette: PaletteOptions = {
    mode: 'dark',
    background: {
        default: '#000000',
    },
    primary: {
        main: '#5AB030',
        light: '#171614',
        dark: '#488C26',
        contrastText: '#FFFFFF',
    },
    text: {
        primary: '#CCCCCC',
        secondary: '#999999',
    }
};

const darkTheme = createTheme({
    palette: darkThemePalette,
});

const themeReducer = (theme: Theme) => theme === 'light' ? 'dark' : 'light';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, toggleTheme] = React.useReducer(themeReducer, 'light');
    const context = React.useMemo(() => [theme, toggleTheme] as const, [theme]);

    React.useEffect(() => {
        const root = document.querySelector(":root");
        if (theme === 'dark' && root) {
            root.setAttribute('theme', theme);

            return () => {
                root.removeAttribute('theme');
            }
        }
    }, [theme]);

    return (
        <MuiThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <ThemeContext.Provider value={context}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );
};

