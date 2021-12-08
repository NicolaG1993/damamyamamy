import { getCategory, getCatNewItems } from "../../shared/utils/db/db";

export default async function handler(req, res) {
    const responseA = await getCatNewItems();
    const responseB = await getCategory("Abbigliamento");
    const responseC = await getCategory("Giocattoli");

    const data = {
        catNewItems: responseA.rows,
        cat1: responseB.rows,
        cat2: responseC.rows,
    };
    res.status(200).json(data);
}
