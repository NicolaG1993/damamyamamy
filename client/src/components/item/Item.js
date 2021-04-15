import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";

export default function Item({ match, history, onAddToCart, removeFromCart }) {
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
            <div className="item-card">
                <h2>{item.name}</h2>
                <img src={item.media.source || "test1.jpg"} />
                <p
                    dangerouslySetInnerHTML={{
                        __html: item.description,
                    }}
                ></p>
                <p>{item.price.raw}€</p>
                <button
                    className={"add-cart"}
                    onClick={() => onAddToCart(item.id, 1)}
                >
                    <img
                        src={
                            "https://www.flaticon.com/svg/vstatic/svg/34/34568.svg?token=exp=1617620984~hmac=36cbab7489a1eb0abbfd28b9ea32ca3b"
                        }
                    />
                </button>
            </div>
        );
    }
}

//questa sará la pagina specifica per ogni item nello shop
// dará tutte le infos sull'articolo
// e sará un route dinamico, no exact
// probabilmente devo passare id articolo (vedi finalproject spiced)
