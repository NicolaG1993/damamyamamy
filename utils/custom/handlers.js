import axios from "axios";
import { getError } from "../error";

const checkItemStock = async (id, quantity) => {
    const { data } = await axios.get(`/api/get/item/${id}`);
    console.log(data);
    if (data.count_in_stock < quantity) {
        throw new Error("Sorry, the required quantity is not available");
    } else {
        return true;
    }
};

export { checkItemStock };
