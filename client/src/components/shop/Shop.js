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
        if (!filters) {
            setResults(state.allStore);
        }
        document.querySelectorAll(".product-box").forEach((el) => {
            el.classList.add("fade-in");
        });
    });

    useEffect(() => {
        if (filters) {
            console.log("filters in useEffect[filters]: ", filters);
            dispatch(filterByValue({ value: filters.name }));
            dispatch(filterByCategory({ value: filters.category }));
            dispatch(
                filterByPrice({
                    minPrice: filters.priceMin,
                    maxPrice: filters.priceMax,
                })
            );
            console.log("state after filters: ", state);
        }
    }, [filters]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        setResults(state.allStore);
    }, [state.allStore]);

    useEffect(() => {
        setResults(state.filteredProducts);
    }, [state.filteredProducts]);

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

// devo creare una fn da passare a Filter 🐲

// **************** COME FAR FUNZIONARE PIU FILTRI INSIEME !!!!!!!! **************s
/* 
useEffect(() => {
    const allProducts = products;
    let filteredProducts = [];

    if (filters.name) {
        if (filters.name === "") {
            filteredProducts = allProducts;
        } else {
            filteredProducts = allProducts.filter(
                (product) =>
                    product.name
                        .toLowerCase()
                        .includes(filters.name.toLowerCase()) ||
                    product.categories[0].name
                        .toLowerCase()
                        .includes(filters.name.toLowerCase())
            );
        }
    }

    if (filters.category) {
        if (filters.category === "") {
            return filteredProducts;
        } else {
            filteredProducts = filteredProducts.filter(
                (product) => product.categories[0].id === filters.category
            );
        }
    }
    if (filters.priceMin || filters.priceMax) {
        filteredProducts = filteredProducts.filter(
            (product) =>
                product.categories.price.raw >= filters.priceMin &&
                product.categories.price.raw <= filters.priceMax
        );
    }

    // etc ...

    setResults(filteredProducts);
}, [filters]);

*/
