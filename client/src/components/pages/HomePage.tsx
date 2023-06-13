import { Section } from "../Section/Section";
import css from "./HomePage.module.css";
export const HomePage = () => {
    return (
        <main>
            <Section hero={true}></Section>
            <Section title="Popular products">
                <div>List of popular products with previews</div>
            </Section>
        </main>
    );
};
