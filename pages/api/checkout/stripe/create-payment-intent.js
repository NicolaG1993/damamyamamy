const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    try {
        const { email, shipping, total_price } = req.body;
        console.log("req.body: ", req.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(total_price) * 100,

            currency: "eur",
            receipt_email: email,
            shipping: shipping,
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
