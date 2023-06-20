import { PumpkinItem } from "../PumpkinList/PumpkinList";
import css from "./PumpkinCard.module.css";

export const PumpkinCard = ({ pumpkins }: { pumpkins: PumpkinItem }) => {
    const { imageURL, name, price } = pumpkins;
    return (
        <div className={css.card__wrapper}>
            <img src={imageURL} className={css.card__image}></img>
            <p className={css.card__text}>{name}</p>
            <p className={css.card__price}>{price + " ₴"}</p>
        </div>
    );
};
