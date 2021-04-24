import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";

import ItemsListShort from "../items-list-short/ItemsListShort";
import AddToCartBtn from "../shop/product/AddToCartBtn";

export default function Item({
    match,
    history,
    products,
    notAvailables,
    onAddToCart,
    removeFromCart,
}) {
    let key = match.params.id;
    const [item, setItem] = useState(null);

    useEffect(() => {
        (async () => {
            const itemInfos = await commerce.products.retrieve(key);
            setItem(itemInfos);
            console.log("itemInfos: ", itemInfos);
        })(); //is this autoinvoking? 🐔
    }, [key]);

    if (!item) {
        return (
            <div className="item-card">
                <h3>Loading...</h3>
            </div>
        );
    } //spinner 🐔

    if (item) {
        return (
            <>
                <div className="item-card">
                    <div className="item-left-side">
                        <h2>{item.name}</h2>
                        <img src={item.media.source || "test1.jpg"} />
                    </div>

                    <div className="item-right-side">
                        <span>Descrizione:</span>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: item.description,
                            }}
                        ></p>
                        <h5>Prezzo: {item.price.raw}€</h5>
                        <AddToCartBtn
                            product_id={item.id}
                            notAvailables={notAvailables}
                            onAddToCart={onAddToCart}
                            removeFromCart={removeFromCart}
                        />
                    </div>
                </div>
                <div className={"shop-items shortlist"}>
                    <h2>Articoli simili</h2>
                    <Link to={"/shop"}>Vedi tutti gli articoli</Link>

                    <ItemsListShort
                        products={products}
                        notAvailables={notAvailables}
                        onAddToCart={onAddToCart}
                        removeFromCart={removeFromCart}
                    />
                </div>
            </>
        );
    }
}
