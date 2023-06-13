import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Container } from "../Container/Container";
import { Footer } from "../Footer/Footer";

export const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};
