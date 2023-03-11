import { isAuth, signToken } from "@/utils/auth";
import { editUser } from "@/utils/db/db";

async function handler(req, res) {
    const { method } = req;
    if (method === "POST") {
        try {
            const userID = req.user.id;
            const { firstName, lastName } = req.body;
            const { rows } = await editUser(userID, firstName, lastName);
            let user = rows[0];
            const token = signToken(user);
            res.send({
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                is_admin: user.is_admin,
                pic: user.pic,
                token: token,
            });
        } catch (err) {
            res.code(500).send({ message: "🤖 Server error" });
        }
    } else {
        return res.status(404).send("Not found");
    }
}
export default isAuth(handler);
