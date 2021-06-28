////////////////////////////////////////////////////////////
// V1

// import dotenv from "dotenv";
// const result = dotenv.config();
// let envs = result.parsed;
// if (!('error' in result)) {
//   envs = result.parsed;
// } else {
//   envs = {};
//   _.each(process.env, (value, key) => envs[key] = value);
// }
// module.exports = envs;

// why not? export default envs; 🐔

////////////////////////////////////////////////////////////
// V2

// require("dotenv").config();

// module.exports = {
//     env: {
//         REACT_APP_CHEC_PUBLIC_KEY: process.env.REACT_APP_CHEC_PUBLIC_KEY,
//         REACT_APP_STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
//         REACT_APP_PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_CLIENT_ID,
//     },
// };

////////////////////////////////////////////////////////////
// V3

//questo file serve per prendere tutto quello che cé nel file .env e servirlo facilmente in App
//se siamo in dev mode, altrimenti serve process.env (di heroku in questo caso)
//visto che il file .env fa parte di .gitignore, e serve solo per testing

/*
il problema o sono i : che devono essere = 🧠
oppure questa funzione va completata come in articolo 🧠
altrimenti usare due webpack per prod o dev 🧠

*/
// import _ from 'lodash';

// let env;
// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
//         env = {
//             REACT_APP_CHEC_PUBLIC_KEY: process.env.REACT_APP_CHEC_PUBLIC_KEY,
//             REACT_APP_STRIPE_PUBLIC_KEY:
//                 process.env.REACT_APP_STRIPE_PUBLIC_KEY,
//             REACT_APP_PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_CLIENT_ID,
//         },

// } else {
//     env = {};
//     _.each(process.env, (value, key) => env[key] = value);

// }

// module.exports = { env };

////////////////////////////////////////////////////////////
// V4
import dotenv from "dotenv";
import _ from "lodash";

const result = dotenv.config();

let envs;

if (!("error" in result)) {
    envs = result.parsed;
} else {
    envs = {};
    _.each(process.env, (value, key) => (envs[key] = value));
}

module.exports = envs;
