import { isAdmin, isAuth } from "@/utils/auth";

async function handler(req, res) {
    try {
        // ...
        // setup S3
        // parse formData
        // upload to bucket
        // accepts multiple files or just 1
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}

export default isAuth(isAdmin(handler));
