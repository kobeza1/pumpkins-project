import { Link } from "react-router-dom";
import css from "./Logo.module.css";

export const Logo = () => {
    return (
        <Link to="/">
            <span className={css.logo}>casperita</span>
        </Link>
    );
};
