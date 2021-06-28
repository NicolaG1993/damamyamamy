// import dotenv from "dotenv";
require("dotenv").config();

// const result = dotenv.config();
// const envs = result.parsed;

// module.exports = envs;
// export default envs;
module.exports = {
    env: {
        REACT_APP_CHEC_PUBLIC_KEY: process.env.REACT_APP_CHEC_PUBLIC_KEY,
        REACT_APP_STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
        REACT_APP_PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    },
};

//questo file serve per prendere tutto quello che cé nel file .env e servirlo facilmente in App
//visto che il file .env fa parte di .gitignore, e serve solo per testing
