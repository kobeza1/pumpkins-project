import { PumpkinCard } from "../PumpkinCard/PumpkinCard";
import css from "./PumpkinList.module.css";

export interface PumpkinItem {
    _id: string;
    name: string;
    description: string;
    similars: String[];
    color: string;
    size: object;
    weight: object;
    price: number;
    favorite: boolean;
    imageURL?: string;
    imageID?: string;
}

export const PumpkinList = ({ pumpkins }: { pumpkins: PumpkinItem[] }) => {
    return (
        <ul className={css.pumpkin__list}>
            {pumpkins.map((items) => (
                <li key={items._id}>
                    <PumpkinCard pumpkins={items} />
                </li>
            ))}
        </ul>
    );
};
