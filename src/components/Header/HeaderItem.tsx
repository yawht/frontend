import React from "react";

import * as styles from './HeaderItem.css'
import { Link } from "react-router-dom";

interface HeaderItemProps {
    link?: string;
    onClick?: VoidFunction;
    children: React.ReactNode;
}

export const HeaderItem: React.FC<HeaderItemProps> = ({ children, link, onClick }) => {
    const content = (
        <div className={styles.root} onClick={onClick}>
            {children}
        </div>
    );

    return link ? (
        <Link to={link}>
            {content}
        </Link>
    ) : content;
};
