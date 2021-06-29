import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import "../../styles/Item.css";

import ItemsListShort from "../items-list-short/ItemsListShort";
import AddToCartBtn from "../shop/product/AddToCartBtn";
import Gallery from "./Gallery";

export default function Item({
    match,
    history,
    products,
    notAvailables,
    onAddToCart,
    removeFromCart,
    windowWidth,
}) {
    let key = match.params.id;
    const [item, setItem] = useState(null);
    const [infoDisplay, setInfoDisplay] = useState("description");
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [clickedPic, setClickedPic] = useState(0);
    console.log(item);

    const toggleInfoDisplay = (val) => {
        setInfoDisplay(val);
    };
    const toggleGallery = async (n, boo) => {
        setClickedPic(n);
        setGalleryOpen(boo);
    };

    useEffect(() => {
        console.log("mounted");
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        (async () => {
            const itemInfos = await commerce.products.retrieve(key);
            setItem(itemInfos);
            console.log("itemInfos: ", itemInfos);
        })(); //is this autoinvoking? 🐔
    }, [key]);

    const PicDisplay = () =>
        item.assets.length > 1 ? (
            <div className="item-pictures-wrap">
                <img
                    src={item.media.source || "test1.jpg"}
                    onClick={() => toggleGallery(0, true)}
                />

                <div className="item-pictures-small-wrap">
                    {item.assets.map((el, i) => (
                        <img
                            key={el.id}
                            src={el.url}
                            onClick={() => toggleGallery(i, true)}
                        />
                    ))}
                </div>
            </div>
        ) : (
            <img
                src={item.media.source || "test1.jpg"}
                onClick={() => toggleGallery(0, true)}
            />
        );

    if (!item) {
        return (
            <div className="item-card">
                <div className="loader loader-alternative1"></div>
            </div>
        );
    } //spinner 🐲

    if (item) {
        console.log(item.name);
        return (
            <div id="item-comp">
                <div className="item-card">
                    <div className="item-left-side">
                        <PicDisplay />
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
                                <div className="item-right-side-conditions-wrap">
                                    <h5>come nuovo</h5>
                                    <div className="circle"></div>
                                </div>
                            </div>

                            <div className="item-right-side-infos">
                                <span>Categoria:</span>
                                <p>
                                    {item.categories[0] &&
                                        item.categories[0].name}
                                </p>
                            </div>
                            <div className="item-right-side-infos">
                                <span>Tags:</span>
                                <div className="item-right-side-infos-inner-wrap">
                                    {item.categories[0] && (
                                        <Link
                                            to={{
                                                pathname: "/shop",
                                                tag: item.categories[0].name,
                                            }}
                                            className="item-tag"
                                        >
                                            {item.categories[0].name}
                                        </Link>
                                    )}

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
                    </div>

                    <div className="item-description-display">
                        {infoDisplay === "description" ? (
                            <div
                                className="dangerHTML-box"
                                dangerouslySetInnerHTML={{
                                    __html: item.description.replace(
                                        /\u00a0/g,
                                        " "
                                    ),
                                }}
                            ></div>
                        ) : (
                            <p>Prodotto mai utilizzato</p>
                        )}
                    </div>
                </div>

                <div className={"shortlist"}>
                    <h2>Articoli simili</h2>

                    <ItemsListShort
                        products={item.related_products}
                        notAvailables={notAvailables}
                        onAddToCart={onAddToCart}
                        removeFromCart={removeFromCart}
                        windowWidth={windowWidth}
                    />
                </div>

                {galleryOpen && (
                    <Gallery
                        toggleGallery={toggleGallery}
                        item={item}
                        clickedPic={clickedPic}
                    />
                )}
            </div>
        );
    }
}
