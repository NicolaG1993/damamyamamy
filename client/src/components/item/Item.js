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
        window.scrollTo(0, 0);
    }, []);

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
                        <img src={item.media.source || "test1.jpg"} />
                    </div>

                    <div className="item-right-side">
                        <h1>{item.name}</h1>
                        {/* <div className={"product-divider-small"}> </div> */}
                        <div className="item-right-side-infos">
                            <span>Prezzo:</span>
                            <h5>{item.price.raw}€</h5>
                        </div>
                        <div className="item-right-side-infos">
                            <span>Condizioni:</span>
                            <h5>nuovo</h5>
                            <div className="circle"></div>
                        </div>
                        <div className="item-right-side-infos">
                            <span>Categoria:</span>
                        </div>
                        <div className="item-right-side-infos">
                            <span>Tags:</span>
                        </div>
                        <div className="item-right-side-infos">
                            <span>Disponibilitá:</span>
                            <p>Pezzo unico</p>
                        </div>

                        <AddToCartBtn
                            cardSize={"shop-item"}
                            product_id={item.id}
                            notAvailables={notAvailables}
                            onAddToCart={onAddToCart}
                            removeFromCart={removeFromCart}
                        />
                    </div>
                </div>

                <div className="item-description">
                    <span>Descrizione:</span>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: item.description,
                        }}
                    ></p>
                </div>

                <div className={"shortlist"}>
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
