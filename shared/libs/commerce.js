import Commerce from "@chec/commerce.js";

export const commerce = new Commerce(
    process.env.REACT_APP_TEST_MYACCOUNT_CHEC_PUBLIC_KEY,
    true
);
