import React, { useState, useEffect } from "react";

import Product from "./product/Product";
import Filter from "./filter/Filter";
import { commerce } from "../../lib/commerce";

export default function Shop({
    products,
    notAvailables,
    onAddToCart,
    removeFromCart,
}) {
    console.log("products in Shop.js: ", products);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        document.querySelectorAll(".product-box").forEach((el) => {
            el.classList.add("fade-in");
        });
        console.log("filters: ", filters);
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const userFilters = (obj) => {
        setFilters(obj);
    };

    const fetchCategories = async () => {
        const { data } = await commerce.categories.list();

        console.log("fetched categories: ", data);
        setCategories(data);
    };

    return (
        <div className={"shop"}>
            <h1>Shop</h1>
            <h3>Filtra risultati</h3>
            <Filter
                categories={categories}
                userFilters={userFilters}
                filters={filters}
            />
            <div className={"products"}>
                {products &&
                    products.map((product) => (
                        <div className={"product-box"} key={product.id}>
                            <Product
                                product={product}
                                notAvailables={notAvailables}
                                onAddToCart={onAddToCart}
                                removeFromCart={removeFromCart}
                                cardSize={"medium"}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

// const products = [
//     {
//         id: 2,
//         name: "Passeggino Chicco",
//         description:
//             "Passeggino della Chicco in ottime condizioni, come nuovo",
//         price: "75€",
//         tags: ["passeggino", "Chicco"],
//         pic_url:
//             "https://cdn.babycscdn.com/m/25415-large_default/passeggino-chicco-simplicity.jpg",
//     },
// ];

// devo creare una fn da passare a Filter
