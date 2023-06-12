// import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import "./index.css";

const root = document.getElementById("root");
ReactDOM.createRoot(root!).render(
    // разобраться с ! в TS
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

// React 17
// import ReactDOM from "react-dom";
// ReactDOM.render(<App />, document.getElementById("root"));
