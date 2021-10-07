// import fetch from "isomorphic-fetch"; // ?

import { commerce } from "../../shared/libs/commerce";

// QUI VANNO TUTTE LE RICHIESTE PER API

// export async function fetchAllStore() {
//     console.log("fetchAllStore activated 🧨");
//     const { data } = await commerce.products.list();
//     return data;
// }

export async function fetchItem(id) {
    const data = await commerce.products.retrieve(id);
    console.log("fetchItem activated 🧨", data);

    return data;
}

// export async function fetchCategories() {
//     const { data } = await commerce.categories.list();
//     console.log("fetchCategories activated 🧨", data);

//     return data;
// }
