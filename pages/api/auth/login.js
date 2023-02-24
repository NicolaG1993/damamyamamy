export default async function handler() {
    try {
        const { email, password } = req.body;
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(403).json({ err: "Error occured." });
    }
}
