import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { AboutPage } from "./pages/AboutPage";
import { Layout } from "./Layout/Layout";
import { AuthPage } from "./pages/AuthPage";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />}></Route>
                <Route path="shop" element={<ShopPage />}></Route>
                <Route path="about" element={<AboutPage />}></Route>
                <Route path="signin" element={<AuthPage />}></Route>
            </Route>
        </Routes>
    );

    // <h1>Hello, 🎃!</h1>;
};
