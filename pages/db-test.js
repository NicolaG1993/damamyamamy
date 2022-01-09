import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// import { fetchCart } from "../redux/Cart/cart.actions";
import axios from "axios";
// import prisma from "../shared/libs/prisma";
import { formatJSDate } from "../shared/utils/convertTimestamp";

export default function DbTest({ products }) {
    console.log("products", products);

    return (
        <div>
            <h1>DB TEST</h1>
        </div>
    );
}

// export async function getServerSideProps() {
//     let feed = await prisma.products.findMany();

//     feed.map((el) => {
//         el.price = Number(el.price);
//         el.created_at = formatJSDate(el.created_at);
//         return el;
//     }); //not serializible data
//     console.log("feed", feed);

//     return { props: { products: feed } };

//     // const { data } = await axios.get("http://localhost:3000/api/products");

//     // return {
//     //     props: { products: data.products, categories: data.categories },
//     // };
// }
