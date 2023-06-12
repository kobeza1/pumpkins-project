import css from "./Container.module.css";

export const Container = ({ children }: { children: any }) => {
    return <div className={css.container}>{children}</div>;
};
