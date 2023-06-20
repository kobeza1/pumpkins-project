import { useEffect, useState } from "react";
import { fetchPumpkinsAll } from "../../utils/api-service";
import { Container } from "../Container/Container";
import { PumpkinList } from "../PumpkinList/PumpkinList";

export const ShopPage = () => {
    const [pumpkins, setPumpkins] = useState([]);

    useEffect(() => {
        try {
            fetchPumpkinsAll().then((res) => {
                setPumpkins(res.data.result);
                console.log(res.data.result);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Container>
            <PumpkinList pumpkins={pumpkins} />
        </Container>
    );
};
