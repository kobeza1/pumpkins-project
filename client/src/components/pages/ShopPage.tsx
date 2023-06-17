import { fetchPumpkinsAll } from "../../utils/api-service";
import { Container } from "../Container/Container";

export const ShopPage = () => {
    fetchPumpkinsAll().then((res) => console.log(res));

    return (
        <Container>
            <div>Shop</div>
        </Container>
    );
};
