import React from "react";
import { Header } from "../Header/Header";
import * as styles from "./Page.css";
import { Container } from "@mui/material";

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.page}>
            <Header />
            <Container>
                {children}
            </Container>
        </div>
    );
}
