import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // keeps app UI in sync with URL (e.g. if user hits "back")

// FUTURE: try const root = ReactDOM.createRoot ?
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
)