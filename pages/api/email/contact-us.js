import { contactUs } from "@/utils/libs/ses";

export default async function handler(req, res) {
    const { body, method } = req;
    if (method === "POST") {
        try {
            const { first, last, email, phone, message, sender, domain } = body;
            let emailData = {
                first: first,
                last: last,
                // recipient: email,
                // source: `${first} ${last} <${email}>`,
                source: "Da Mamy a Mamy <damamyamamy@gmail.com>",
                recipient: "damamyamamy@gmail.com",
                subject: "Email dal sito damamyamamy.com",
                message: message,
                email: email,
                phone: phone,
            };
            let response = await contactUs(emailData);
            res.send(response);
        } catch (err) {
            console.log("🐞 ERROR: ", err);
            res.status(500).json({ message: "Error occured." });
        }
    } else {
        return res.status(404).send("Not found");
    }
}
