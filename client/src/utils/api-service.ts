import axios from "axios";
// const BASE_URL = "https://pumpkins-project.onrender.com";
const BASE_URL = "http://localhost:3000";

let path = "";

export const fetchPumpkinsAll = async () => {
    path = `/pumpkin`;
    try {
        const response = await axios.get(`${BASE_URL + path}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
