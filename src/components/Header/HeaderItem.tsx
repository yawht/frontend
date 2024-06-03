import React from "react";

import * as styles from './HeaderItem.css'

interface HeaderItemProps {
    onClick?: VoidFunction;
    children: React.ReactNode;
}

export const HeaderItem: React.FC<HeaderItemProps> = ({ children, onClick }) => {
    return (
        <div className={styles.root} onClick={onClick}>
            {children}
        </div>
    );
};
