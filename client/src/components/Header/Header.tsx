import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

export const Header = () => {
    return (
        <header className={css.header}>
            <nav className="nav">
                <ul className={css.nav__list}>
                    <li className={css.nav__item}>
                        <NavLink className={css.nav__link} to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className={css.nav__item}>
                        <NavLink className={css.nav__link} to="/pumpkins">
                            Pumpkins
                        </NavLink>
                    </li>
                    <li className={css.nav__item}>
                        <NavLink className={css.nav__link} to="/about">
                            About
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
