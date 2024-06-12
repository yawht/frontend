import React from "react";

import * as styles from './Header.css'
import { HeaderItem } from "./HeaderItem";
import { ThemeSwitchButton } from "./ThemeSwitchButton";
import { Toolbar } from "@mui/material";
import { side } from "./constants";

export const Header: React.FC = () => {
    return (
        <Toolbar sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: side,
            flexWrap: 'nowrap'
        }}>
            <div className={styles.section}>
                <HeaderItem link="/">
                    {null}
                </HeaderItem>
                <HeaderItem link="/timeline">Запуски</HeaderItem>
                <HeaderItem link="/generation">+</HeaderItem>
            </div>
            <div className={styles.section}>
                <ThemeSwitchButton />
            </div>
        </Toolbar>
    )

    // return (
    // <div className={styles.header}>
    //     <div className={styles.section}>
    //         <HeaderItem >
    //             {null}
    //         </HeaderItem>
    //         <HeaderItem >Запуски</HeaderItem>
    //         <HeaderItem >+</HeaderItem>
    //     </div>
    //     <div className={styles.section}>
    //         <ThemeSwitchButton />
    //     </div>
    // </div>
    // );
};
