const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
    console.log("items: ", items);
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
    const items_price = round2(
        items.reduce((a, c) => a + c.price * c.quantity, 0)
    );
    const shipping_price = items_price > 200 ? 0 : 15;
    const tax_price = round2(items_price * 0.15);
    const total_price = round2(items_price + shipping_price + tax_price);
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    // return 1400; // -> 14.00€
    console.log("total_price: ", total_price * 100);
    return total_price * 100;
};

export default async function handler(req, res) {
    const { items, email, shipping } = req.body;
    console.log("req.body: ", req.body);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "eur",
        receipt_email: email,
        shipping: shipping,
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}
