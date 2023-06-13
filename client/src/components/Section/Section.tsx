import { Container } from "../Container/Container";
import css from "./Section.module.css";

export const Section = ({
    hero,
    title,
    children,
}: {
    hero?: boolean;
    title?: string;
    children?: any;
}) => {
    return hero ? (
        <section className={css.hero}>
            <h1 className={css.hero__title}>
                True pumpkins decor. American style.
            </h1>
        </section>
    ) : (
        <Container>
            <section className={css.section}>
                <h2 className={css.section__title}>{title}</h2>
                {children}
            </section>
        </Container>
    );
};
