import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

export const AuthNav = () => {
    return (
        <NavLink to="/signin" className={css.header__auth}>
            Sign in
        </NavLink>
    );
};
