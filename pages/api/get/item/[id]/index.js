// import { getElementByID } from "@/utils/db/db";

// export default async function handler(req, res) {
//     const id = Number(req.query.id);
//     try {
//         let { rows } = await getElementByID("item", id);
//         if (rows.length) {
//             let item = rows[0];
//             res.status(200).send(item);
//         } else {
//             res.status(404).send({ message: "No item founded with this ID." });
//         }
//     } catch (err) {
//         console.log("🐞 ERROR: ", err);
//         res.status(500).json({ message: "Error occured." });
//     }
// }

import { getItem } from "@/utils/db/db";

export default async function handler(req, res) {
    const id = Number(req.query.id);
    try {
        let { rows } = await getItem(id);
        if (rows.length) {
            let item = rows[0];
            res.status(200).send(item);
        } else {
            res.status(404).send({ message: "No item founded with this ID." });
        }
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ message: "Error occured." });
    }
}
