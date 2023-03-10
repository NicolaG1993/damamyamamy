import { sendEmail } from "@/utils/libs/ses";
import cryptoRandomString from "crypto-random-string";
import { getUserByEmail, storeCode } from "@/utils/db/db";

export default async function handler(req, res) {
    const { body, method } = req;
    if (method === "POST") {
        try {
            const { email } = body;
            // api to first check email exists in db
            const user = await getUserByEmail(email);
            if (user.rows[0]) {
                // generate code
                let code = cryptoRandomString({
                    length: 6,
                });
                // store code
                await storeCode(email, code);

                // send code via email 🧠
                let emailData = {
                    recipient: email,
                    source: "Da Mamy a Mamy <damamyamamy@gmail.com>",
                    subject:
                        "Ecco il codice per rimpostare la tua password: " +
                        code,
                    message: `<p>Hai recentemente richiesto di reimpostare la password del tuo profilo.</p>
                <p>Utilizza questo codice per confermare la modifica:</p>
                <h3>${code}</h3>
                <p>Non esitare a contattarci se dovessi riscontrare ulteriori problemi.</p>
                <p>Questa è un'email generata automaticamente.</p>`,
                };

                let response = await sendEmail(emailData);
                res.send(response);
            } else {
                res.status(400).send({ message: "Your email is not valid" });
            }
        } catch (err) {
            console.log("🐞 ERROR: ", err);
            res.status(500).send({ message: "Server error occured." });
        }
    } else {
        return res.status(404).send("Not found");
    }
}
