import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import { Nav } from "../Nav/Nav";
import { AuthNav } from "../AuthNav/AuthNav";
import { Container } from "../Container/Container";
import { Logo } from "../Logo/Logo";

export const Header = () => {
    return (
        <header className={css.header}>
            <Container header={true}>
                <Nav />
                <AuthNav />
            </Container>
        </header>
    );
};
