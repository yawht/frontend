import React from "react";
import { useTheme } from "../Theme";
import { HeaderItem } from "./HeaderItem";

export const ThemeSwitchButton: React.FC = () => {
    const [theme, switchTheme] = useTheme();

    return (
        <HeaderItem onClick={switchTheme}>
            тема: {theme}
        </HeaderItem>
    );
};
