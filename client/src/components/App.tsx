import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PumpkinsPage } from "./pages/PumpkinsPage";
import { AboutPage } from "./pages/AboutPage";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/pumpkins" element={<PumpkinsPage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
        </Routes>
    );

    // <h1>Hello, 🎃!</h1>;
};
