import { isAuth } from "../../../shared/utils/auth";

async function handler(req, res) {
    res.send(process.env.REACT_APP_TEST_MYACCOUNT_PAYPAL_CLIENT_ID || "sb");
}

export default isAuth(handler);
