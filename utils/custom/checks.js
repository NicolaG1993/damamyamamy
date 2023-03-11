import axios from "axios";

const checkUser = async (user) => {
    try {
        if (!user) {
            return false;
        } else {
            let { data } = await axios.get(`/api/get/user/${user.id}`, {
                headers: { authorization: `Bearer ${user.token}` },
            });
            if (data.is_admin) {
                return true;
            } else {
                return false;
            }
        }
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        return false;
    }
};

export { checkUser };
