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
    const [infoDisplay, setInfoDisplay] = useState("description");

    const toggleInfoDisplay = (val) => {
        setInfoDisplay(val);
    };

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
                <div className="loader loader-alternative1"></div>
            </div>
        );
    } //spinner 🐲

    if (item) {
        return (
            <>
                <div className="item-card">
                    <div className="item-left-side">
                        <img src={item.media.source || "test1.jpg"} />
                    </div>

                    <div className="item-right-side">
                        <h1>{item.name}</h1>
                        <div className="item-right-side-price">
                            <h2 className="second-font dark-tone">
                                {item.price.raw}€
                            </h2>
                            <p>IVA inclusa</p>
                        </div>
                        <div className={"product-divider-small"}> </div>
                        <div className={"item-right-side-infos-box"}>
                            <div className="item-right-side-conditions">
                                <span>Condizioni:</span>
                                <h5>come nuovo</h5>
                                <div className="circle"></div>
                            </div>
                            {/* <div className="item-right-side-infos">
                            <span>Descrizione:</span>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: item.description,
                                }}
                            ></p>
                        </div> */}

                            <div className="item-right-side-infos">
                                <span>Categoria:</span>
                                <p>{item.categories[0].name}</p>
                            </div>
                            <div className="item-right-side-infos">
                                <span>Tags:</span>

                                <Link
                                    to={{
                                        pathname: "/shop",
                                        tag: item.categories[0].name,
                                    }}
                                    className="item-tag"
                                >
                                    {item.categories[0].name}
                                </Link>

                                <Link
                                    to={{
                                        pathname: "/shop",
                                        tag: "3/5 anni",
                                    }}
                                    className="item-tag"
                                >
                                    3/5 anni
                                </Link>
                            </div>
                            <div className="item-right-side-infos">
                                <span>Disponibilitá:</span>
                                <p>Pezzo unico</p>
                            </div>
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
                    <div className="item-description-selector">
                        <span
                            onClick={() => toggleInfoDisplay("description")}
                            className={
                                infoDisplay === "description"
                                    ? "active-selector"
                                    : "not-active-selector"
                            }
                        >
                            Descrizione
                        </span>

                        <span
                            onClick={() => toggleInfoDisplay("infos")}
                            className={
                                infoDisplay === "infos"
                                    ? "active-selector"
                                    : "not-active-selector"
                            }
                        >
                            Informazioni
                        </span>

                        {/* <span></span> */}
                    </div>

                    <div className="item-description-display">
                        {infoDisplay === "description" ? (
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: item.description,
                                }}
                            ></p>
                        ) : (
                            <p>Prodotto mai utilizzato</p>
                        )}
                    </div>

                    {/* <div className="item-description-selector-shadow">
                        <span></span>
                        <span></span>
                    </div>
                    <div className="item-description-display-shadow"></div> */}
                </div>

                <div className={"shortlist"}>
                    <h2>Articoli simili</h2>
                    {/* <Link to={"/shop"}>Vedi tutti gli articoli</Link> */}

                    <ItemsListShort
                        products={item.related_products}
                        notAvailables={notAvailables}
                        onAddToCart={onAddToCart}
                        removeFromCart={removeFromCart}
                    />
                </div>
            </>
        );
    }
}
