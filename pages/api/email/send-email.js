import { sendEmail } from "@/utils/libs/ses";

export default async function handler(req, res) {
    const { body, method } = req;
    if (method === "POST") {
        try {
            const { first, last, email, phone, message, sender, domain } = body;
            let emailData = {
                first: first,
                last: last,
                recipient: email,
                source: "Da Mamy a Mamy <damamyamamy@gmail.com>",
                subject: "Benvenuto a bordo " + first,
                message: `<p>Questa è un'email di conferma di avvenuta registrazione nella nostra piattaforma.</p>
                        <p>Congratulazioni!</p>`,
                // phone: phone,
            };
            let response = await sendEmail(emailData);
            res.send(response);
        } catch (err) {
            console.log("🐞 ERROR: ", err);
            res.status(500).json({ message: "Error occured." });
        }
    } else {
        return res.status(404).send("Not found");
    }
}
