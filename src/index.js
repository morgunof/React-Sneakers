import React from "react";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

import ReactDOM from "react-dom/client";

import "./index.scss";
import "macro-css";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
);
