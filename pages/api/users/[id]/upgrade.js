import { isAdmin, isAuth } from "../../../../shared/utils/auth";
import { authorizeUser } from "../../../../shared/utils/db/db";

// SISTEMARE QUESTA

// async function handler(req, res) {
//     const id = req.query.id;
//     const user = await getUser(id);

//     if (user) {
//         const newStatus = req.body;
//         const updatedUser = await authorizeUser(id, newStatus);
//         console.log("updatedUser:", updatedUser);
//         res.status(200).send({
//             message: "Autorizzazioni modificate",
//             user: updatedUser,
//         });
//     } else {
//         res.status(404).send({ message: "Utente non trovato" });
//     }
// }

export default isAuth(isAdmin(handler));
