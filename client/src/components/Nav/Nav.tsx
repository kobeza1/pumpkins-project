import { Logo } from "../Logo/Logo";
import css from "./Nav.module.css";
import { NavLink } from "react-router-dom";

export const Nav = () => {
    return (
        <>
            <nav className={css.nav}>
                <Logo />
                <ul className={css.nav__list}>
                    <li className={css.nav__item}>
                        <NavLink className={css.nav__link} to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className={css.nav__item}>
                        <NavLink className={css.nav__link} to="/shop">
                            Shop
                        </NavLink>
                    </li>
                    <li className={css.nav__item}>
                        <NavLink className={css.nav__link} to="/about">
                            About
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};
