import React from "react";

import * as styles from './Header.css'
import { HeaderItem } from "./HeaderItem";
import { ThemeSwitchButton } from "./ThemeSwitchButton";

export const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.section}>
                <HeaderItem >
                    {null}
                </HeaderItem>
                <HeaderItem >Запуски</HeaderItem>
                <HeaderItem >+</HeaderItem>
            </div>
            <div className={styles.section}>
                <ThemeSwitchButton />
            </div>
        </div >
    );
};
