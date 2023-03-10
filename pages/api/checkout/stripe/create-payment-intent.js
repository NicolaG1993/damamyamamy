const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    console.log(
        "📐 REACT_APP_STRIPE_SECRET_KEY: ",
        process.env.REACT_APP_STRIPE_SECRET_KEY
    );
    try {
        const { email, shipping, total_price } = req.body;
        console.log("req.body 📐 stripe.paymentIntents.create: ", req.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(Number(total_price) * 100),
            currency: "eur",
            receipt_email: email,
            // shipping: "Ritiro in negozio",
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        return res.status(500).json({ message: err.message });
    }
}
