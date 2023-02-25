import axios from "axios";

const checkAdmin = async (user) => {
    let { data } = await axios.get(`/api/user/${user.id}`);
    if (data.is_admin) {
        return true;
    } else {
        return false;
    }
};

export { checkAdmin };
