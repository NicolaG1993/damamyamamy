import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loadData } from "../../redux/actions";
import {
    filterByValue,
    filterByCategory,
    filterByPrice,
} from "../../redux/actions";

import Product from "./product/Product";
import Filter from "./filter/Filter";
import { commerce } from "../../lib/commerce";

export default function Shop({ notAvailables, onAddToCart, removeFromCart }) {
    const dispatch = useDispatch();
    let state = useSelector((state) => state);
    console.log("products in Shop.js: ", state);

    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState(null);
    const [results, setResults] = useState(null);

    // let newProducts;

    console.log("results: ", results);

    const userFilters = (obj) => {
        setFilters(obj);
    };

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
        if (filters) {
            dispatch(filterByValue({ value: filters.name }));
            // dispatch(filterByCategory({ value: filters.category }));
            // dispatch(
            //     filterByPrice({
            //         minPrice: filters.priceMin,
            //         maxPrice: filters.priceMax,
            //     })
            // );

            setResults(state.filteredProducts);
        }
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        setResults(state.allStore);
    }, [state.allStore]);

    // useEffect(() => {
    //     setResults(state.filteredProducts);
    // }, [state.filteredProducts]);

    // useEffect(() => {
    //     if (filters) {
    //         if (filters.name === "") {
    //             setResults(products);
    //             //questa parte é incorretta peró al momento funziona solo cosi, non posso farla funzionare dentro l'altro if come con categories
    //             //perché per categories ho un opzione corrispondente a "", qui invece é un caso
    //         }

    //         if (filters.category) {
    //             newProducts = products.filter(
    //                 (product) => product.categories[0].id === filters.category
    //             );

    //             // return (
    //             //     product.categories[0].name === filters.category &&
    //             //     product.name === filters.name &&
    //             //     product.categories.price.raw >= filters.priceMin
    //             // );
    //             // console.log("product in filter: ", product);

    //             console.log("newProducts: ", newProducts);

    //             setResults(newProducts);

    //             filters.category === "" && setResults(products);
    //         }
    //         if (filters.name) {
    //             newProducts = products.filter((product) => {
    //                 if (
    //                     product.name
    //                         .toLowerCase()
    //                         .includes(filters.name.toLowerCase()) ||
    //                     product.categories[0].name
    //                         .toLowerCase()
    //                         .includes(filters.name.toLowerCase())
    //                 ) {
    //                     return product;
    //                 }
    //             });
    //             setResults(newProducts);

    //             if (filters.category) {
    //                 let newNewProducts = newProducts.filter(
    //                     (product) =>
    //                         product.categories[0].id === filters.category
    //                 );

    //                 console.log("newProducts: ", newProducts);

    //                 setResults(newNewProducts);

    //                 filters.category === "" && setResults(newProducts);
    //             }
    //         }
    //     }
    // }, [filters]);
    // funziona solo per categories e name al momento, trovare modo migliore per far funzionare tutto insieme 🐔
    // aggiungere caso anche per tags 🐔

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
                {results ? (
                    results.length < 1 ? (
                        <h4>No results</h4>
                    ) : (
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
                        ))
                    )
                ) : (
                    <h4>Loading...</h4>
                )}
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

// **************** COME FARE PIU FILTRI INSIEME !!!!!!!! **************s
// useEffect(() => {
//     const allProducts = products;
//     let filteredProducts = [];

//     if (filters.name) {
//         if (filters.name === "") {
//             filteredProducts = allProducts;
//         } else {
//             filteredProducts = allProducts.filter(
//                 (product) =>
//                     product.name
//                         .toLowerCase()
//                         .includes(filters.name.toLowerCase()) ||
//                     product.categories[0].name
//                         .toLowerCase()
//                         .includes(filters.name.toLowerCase())
//             );
//         }
//     }

//     if (filters.category) {
//         if (filters.category === "") {
//             return filteredProducts;
//         } else {
//             filteredProducts = filteredProducts.filter(
//                 (product) => product.categories[0].id === filters.category
//             );
//         }
//     }
//     if (filters.priceMin || filters.priceMax) {
//         filteredProducts = filteredProducts.filter(
//             (product) =>
//                 product.categories.price.raw >= filters.priceMin &&
//                 product.categories.price.raw <= filters.priceMax
//         );
//     }

//     // etc ...

//     setResults(filteredProducts);
// }, [filters]);

/////////////// **************** /////////////// ****************

// const filterByInput = (e) => {
//     let input = e.target.value;
//     dispatch(filterByValue({ value: input }));
//     // console.log("filterByInput: ", input);
// };
// const filterByCategory = (e) => {
//     let input = e.target.value;
//     dispatch(filterByValue({ value: input }));
//     // console.log("filterByInput: ", input);
// };
// const filterByInput = (e) => {
//     let input = e.target.value;
//     dispatch(filterByValue({ value: input }));
//     // console.log("filterByInput: ", input);
// };

/////////////// **************** /////////////// ****************
