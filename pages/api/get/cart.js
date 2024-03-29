import { getCheckoutItems } from "@/utils/db/db";

export default async function handler(req, res) {
    const cart = req.body;
    const cartIDs = cart.map(({ id }) => id);
    console.log("📐 cart: ", cart);
    try {
        let { rows } = await getCheckoutItems(cartIDs);
        let changes = false;
        let newCart = [];

        cart.map((el) => {
            const liveItem = rows.find(({ id }) => el.id === id);
            if (liveItem.count_in_stock < el.quantity) {
                changes = true;
                if (liveItem.count_in_stock > 0) {
                    newCart.push({
                        ...liveItem,
                        quantity: liveItem.count_in_stock,
                    }); //...update item quantity
                } else {
                    // return; //... delete item ? do nothing?
                }
            } else {
                newCart.push({ ...liveItem, quantity: el.quantity });
            }
        });

        // 💚 check if item quantities are in stock 🔍
        // 💚 add quantity key to all response objects
        // 💚 if not return an alert and the updated cart 🔍
        // 🧠 update cart in cookies and redux too 📝
        //...
        console.log("💚 newCart: ", { cart: newCart, changes: changes });
        res.status(200).send({ cart: newCart, changes: changes });
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
