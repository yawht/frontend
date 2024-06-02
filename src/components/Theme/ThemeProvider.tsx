import React from "react";
export type Theme = 'dark' | 'light';

type Context = readonly [Theme, VoidFunction];
export const ThemeContext = React.createContext<Context | null>(null);

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
        <ThemeContext.Provider value={context}>
            {children}
        </ThemeContext.Provider>
    )
};

