import css from "./Section.module.css";

export const Section = ({
    title,
    children,
}: {
    title: string;
    children: any;
}) => {
    return (
        <section className={css.section}>
            <h2 className={css.section__title}>{title}</h2>
            {children}
        </section>
    );
};
