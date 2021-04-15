import React from "react";
import { Link } from "react-router-dom";
import Product from "./product/Product";

export default function Shop({ products, onAddToCart, removeFromCart }) {
    console.log("products in Shop.js: ", products);

    return (
        <div className={"shop"}>
            <h1>Shop</h1>
            <h3>Filtra risultati</h3>
            <div className={"products"}>
                {products &&
                    products.map((product) => (
                        <div className={"product-box"} key={product.id}>
                            <Link to={`/item/${product.id}`}>
                                <Product
                                    product={product}
                                    onAddToCart={onAddToCart}
                                    RemoveFromCart={removeFromCart}
                                    cardSize={"medium"}
                                />
                            </Link>
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
