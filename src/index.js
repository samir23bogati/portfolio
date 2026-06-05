import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import "./theme.css";

import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <HashRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </HashRouter>
        </HelmetProvider>
    </React.StrictMode>
);
