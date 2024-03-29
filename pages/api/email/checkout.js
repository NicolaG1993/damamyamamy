import { sendEmail } from "@/utils/libs/ses";

export default async function handler(req, res) {
    const { body, method } = req;
    if (method === "POST") {
        try {
            const {
                first,
                last,
                email,
                order_uuid,
                total_price,
                order_items,
                phone,
                message,
                sender,
                domain,
            } = body;

            /* USER EMAIL */
            let userEmailData = {
                first: first,
                last: last,
                recipient: email,
                source: "Da Mamy a Mamy <damamyamamy@gmail.com>",
                subject: "Grazie per il tuo acquisto " + first + "!",
                message: `<p>Questa è un'email di conferma del tuo ordine.</p>
                        <p>ID ordine: ${order_uuid}</p>
                        <div>
                            <h3>Articoli acquistati:</h3>
                            ${order_items.map((el) => {
                                console.log("🔍🔍🔍 ", el);
                                return `<div
                                        key=${"articolo: " + el.id}
                                        style="display: flex; align-items: center;"
                                    >
                                        <p>${el.name}</p>
                                        <p style="padding: 0 20px;">€ ${
                                            el.price
                                        }</p>
                                        <p>x${el.quantity}</p>
                                    </div>`;
                            })}
                            <p>Importo totale: € ${total_price}</p>
                        </div>
                        <a href="${
                            process.env.DOMAIN
                        }/ordine/${order_uuid}">Vedi il tuo ordine sul nostro sito</a>
                        <p>Grazie per averci scelto!</p>`,
                // phone: phone,
            };

            /* SHOP EMAIL */
            let shopEmailData = {
                first: first,
                last: last,
                recipient: "damamyamamy@gmail.com",
                source: "Da Mamy a Mamy <damamyamamy@gmail.com>",
                subject: "Hai ricevuto un ordine da " + first + "!",
                message: `<p>Utente: ${first} ${last}</p>
                        <p>Email: ${email}</p>
                        <p>ID ordine: ${order_uuid}</p>
                        <div>
                            <h3>Articoli acquistati:</h3>
                            ${order_items.map((el) => {
                                console.log("🔍🔍🔍 ", el);
                                return `<div
                                        key=${"articolo: " + el.id}
                                        style="display: flex; align-items: center;"
                                    >
                                        <p>${el.name}</p>
                                        <p style="padding: 0 20px;">€ ${
                                            el.price
                                        }</p>
                                        <p>x${el.quantity}</p>
                                    </div>`;
                            })}
                            <p>Importo totale: € ${total_price}</p>
                        </div>
                        <a href="${
                            process.env.DOMAIN
                        }/ordine/${order_uuid}">Vedi l'ordine sul sito</a>`,
                // phone: phone,
            };

            let userEmailRes = await sendEmail(userEmailData);
            let shopEmailRes = await sendEmail(shopEmailData);
            res.send({ userEmailRes, shopEmailRes });
        } catch (err) {
            console.log("🐞 ERROR: ", err);
            res.status(500).json({ message: "Error occured." });
        }
    } else {
        return res.status(404).send("Not found");
    }
}
