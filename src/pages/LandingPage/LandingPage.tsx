import React from "react";

import { Page } from "../../components/Page/Page";
import { useTheme } from "../../components/Theme";

import './App.css';

export const LandingPage: React.FC = () => {
    const [theme, toggleTheme] = useTheme();

    return (
        <Page>
            <div id="landing_root">
                <h1>Vite + React</h1>
                <div className="card">
                    <button onClick={toggleTheme}>
                        theme is {theme}
                    </button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </Page>
    );
};
