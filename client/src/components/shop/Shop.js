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
    const [filters, setFilters] = useState(null);
    const [results, setResults] = useState(null);

    let newProducts;

    console.log("results: ", results);

    const fetchCategories = async () => {
        const { data } = await commerce.categories.list();

        console.log("fetched categories: ", data);
        setCategories(data);
    };

    useEffect(() => {
        document.querySelectorAll(".product-box").forEach((el) => {
            el.classList.add("fade-in");
        });

        console.log("filters: ", filters);
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        setResults(products);
    }, [products]);

    useEffect(() => {
        if (filters) {
            if (filters.name === "") {
                setResults(products);
                //questa parte é incorretta peró al momento funziona solo cosi, non posso farla funzionare dentro l'altro if come con categories
                //perché per categories ho un opzione corrispondente a "", qui invece é un caso
            }

            if (filters.categories) {
                newProducts = products.filter(
                    (product) => product.categories[0].id === filters.categories
                );

                // return (
                //     product.categories[0].name === filters.categories &&
                //     product.name === filters.name &&
                //     product.categories.price.raw >= filters.priceMin
                // );
                // console.log("product in filter: ", product);

                console.log("newProducts: ", newProducts);

                setResults(newProducts);

                filters.categories === "" && setResults(products);
            }
            if (filters.name) {
                newProducts = products.filter((product) => {
                    if (
                        product.name
                            .toLowerCase()
                            .includes(filters.name.toLowerCase()) ||
                        product.categories[0].name
                            .toLowerCase()
                            .includes(filters.name.toLowerCase())
                    ) {
                        return product;
                    }
                });
                setResults(newProducts);

                if (filters.categories) {
                    let newNewProducts = newProducts.filter(
                        (product) =>
                            product.categories[0].id === filters.categories
                    );

                    // return (
                    //     product.categories[0].name === filters.categories &&
                    //     product.name === filters.name &&
                    //     product.categories.price.raw >= filters.priceMin
                    // );
                    // console.log("product in filter: ", product);

                    console.log("newProducts: ", newProducts);

                    setResults(newNewProducts);

                    filters.categories === "" && setResults(newProducts);
                }
            }
        }
    }, [filters]);
    // funziona solo per categories al momento, trovare modo migliore per far funzionare tutto insieme 🐔
    // inoltre, ora funziona solo con una singola categoria, non di piu 🐔
    // aggiungere caso anche per tags 🐔

    const userFilters = (obj) => {
        setFilters(obj);
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
                {results &&
                    results.map((product) => (
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

// devo creare una fn da passare a Filter 🐲
