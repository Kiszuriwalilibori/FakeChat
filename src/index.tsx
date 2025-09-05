// import React from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";

import breakWhenInternetExplorer from "functions/breakWhenInternetExplorer";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { App, AppProvider } from "components";

breakWhenInternetExplorer();

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(
    <AppProvider>
        <App />
    </AppProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
