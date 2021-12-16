import { isAuth } from "../../../shared/utils/auth";
import {
    allPaidOrdersPreview,
    totalOrders,
    totalProducts,
    totalUsers,
} from "../../../shared/utils/db/db";

async function handler(req, res) {
    const ordersCount = await totalOrders();
    const productsCount = await totalProducts();
    const usersCount = await totalUsers();

    // posso ridurre tutto ad una richiesta e decomporla qua
    // ricevere obj con ordini pagati
    // -> estrapolare somma totale
    // -> dividere per giorno e sommare

    let paidOrders = await allPaidOrdersPreview();
    paidOrders = paidOrders.rows;

    ///////
    let ordersPrice = 0;
    paidOrders.map((order) => (ordersPrice += Number(order.total_price))); // somma di tutti gli ordini pagati
    // const salesData = paidOrders; // questa é un oggetto con le vendite totali divise per giorno

    let salesData = {};
    paidOrders.forEach((order) => {
        const date = order.created_at.toISOString().split("T")[0];
        if (salesData[date]) {
            salesData[date].total += Number(order.total_price);
            salesData[date].orders++;
        } else {
            salesData[date] = { total: Number(order.total_price), orders: 1 };
        }
    }); // { '2021-12-13': { total: 562.5, orders: 3 }}

    // console.log("🧨🐸 ordersCount : ", ordersCount);
    // console.log("🧨🐸 productsCount : ", productsCount);
    // console.log("🧨🐸 usersCount : ", usersCount);
    // console.log("🧨🐸 paidOrders : ", paidOrders);
    // console.log("🧨🐸 salesData : ", salesData);
    // console.log("🧨🐸 ordersPrice : ", ordersPrice);

    res.send({
        ordersCount: Number(ordersCount.rows[0].count),
        productsCount: Number(productsCount.rows[0].count),
        usersCount: Number(usersCount.rows[0].count),
        ordersPrice,
        salesData,
    });
}

export default isAuth(handler);
