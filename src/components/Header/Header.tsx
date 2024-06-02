import React from "react";

import * as styles from './Header.css'
import { HeaderItem } from "./HeaderItem";

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
                <HeaderItem>тема</HeaderItem>
            </div>
        </div >
    );
};
