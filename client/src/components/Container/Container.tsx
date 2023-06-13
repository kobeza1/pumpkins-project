import css from "./Container.module.css";

export const Container = ({
    header,
    children,
}: {
    header?: boolean;
    children: any;
}) => {
    return (
        <div className={header ? css.header__container : css.container}>
            {children}
        </div>
    );
};
