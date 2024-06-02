import React from "react";

import * as styles from './HeaderItem.css'

export const HeaderItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.root}>
            {children}
        </div>
    );
};
