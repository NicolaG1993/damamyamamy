import loadable from "@loadable/component";
import { useState, useEffect, useRef } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import "./style/Item.css";

// import Button from "../../Button/Button";
import CartButton from "../../CartButton/CartButton";
const Shortlist = loadable(() => import("../../Shortlist/Shortlist"));
const Gallery = loadable(() => import("./Gallery/Gallery"));

export default function Item({ fetchInitialData, staticContext }) {
    __isBrowser__
        ? console.log("window.__INITIAL_DATA__ ", window.__INITIAL_DATA__)
        : console.log("staticContext ", staticContext);

    const [item, setItem] = useState(() => {
        return __isBrowser__ ? window.__INITIAL_DATA__ : staticContext.data;
    });
    // our data needs when the app is rendered on the server via context and when the app is rendered on the client via window

    if (__isBrowser__ && window.__INITIAL_DATA__) {
        delete window.__INITIAL_DATA__;
    }

    let match = useRouteMatch();
    let key = match.params.id; // item id

    const [loading, setLoading] = useState(item ? false : true);
    const fetchNewItem = useRef(item ? false : true);

    const [galleryOpen, setGalleryOpen] = useState(false);
    const [clickedPic, setClickedPic] = useState(0);

    useEffect(() => {
        if (fetchNewItem.current === true) {
            setLoading(true);
            fetchInitialData(key).then((item) => {
                setItem(item);
                setLoading(false);
            });
        } else {
            fetchNewItem.current = true;
        }
    }, [key, fetchNewItem]);

    // useEffect(() => {
    //     setItem(selectedItem);
    // }, [selectedItem]);

    const toggleGallery = async (n, boo) => {
        setClickedPic(n);
        setGalleryOpen(boo);
    };

    if (loading === true) {
        return <div className="loader AAA"></div>;
    }

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

    const ItemWrap = () => (
        <div id="Item">
            <div className="item-wrap">
                <div className="item-pic">
                    <PicDisplay />
                </div>
                <div className="item-infos">
                    <h1>{item.name}</h1>
                    <div className="item-infos-price">
                        <h2>{item.price.raw}€</h2>
                        <p>IVA inclusa</p>
                    </div>
                    <div className={"product-divider-small"}> </div>
                    <div className={"item-infos-infos-box"}>
                        <div className="item-infos-conditions">
                            <span>Condizioni:</span>
                            <div className="item-infos-conditions-wrap">
                                <h5>come nuovo</h5>
                                <div className="circle"></div>
                            </div>
                        </div>

                        <div className="item-infos-infos">
                            <span>Categoria:</span>
                            <p>
                                {item.categories[0] && item.categories[0].name}
                            </p>
                        </div>

                        <div className="item-infos-infos">
                            <span>Tags:</span>
                            <div className="item-infos-infos-inner-wrap">
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

                        <div className="item-infos-infos">
                            <span>Disponibilitá:</span>
                            <p>Pezzo unico</p>
                        </div>
                    </div>
                    <CartButton wrapSize="large" product_id={item.id} />
                </div>
            </div>
        </div>
    );

    const ItemDescriptionWrap = () => {
        const [infoDisplay, setInfoDisplay] = useState("description");
        const toggleInfoDisplay = (val) => {
            setInfoDisplay(val);
        }; //posso farlo?
        return (
            <section className="item-description-wrap">
                <div className="item-description">
                    <div className="item-description-selector">
                        <h3
                            onClick={() => toggleInfoDisplay("description")}
                            className={
                                infoDisplay === "description"
                                    ? "active-selector"
                                    : "not-active-selector"
                            }
                        >
                            Descrizione
                        </h3>

                        <h3
                            onClick={() => toggleInfoDisplay("infos")}
                            className={
                                infoDisplay === "infos"
                                    ? "active-selector"
                                    : "not-active-selector"
                            }
                        >
                            Informazioni
                        </h3>
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
            </section>
        );
    };

    const ShortlistWrap = () => (
        <section className="item-shortlist-wrap">
            {/* <h2>Articoli simili</h2> */}

            <Shortlist
                products={item.related_products}
                listTitle="Articoli simili"
            />
        </section>
    );

    if (item) {
        return (
            <Switch>
                <Route path={match.path}>
                    <ItemWrap />
                    <ItemDescriptionWrap />
                    <ShortlistWrap />
                    {galleryOpen && (
                        <Gallery
                            toggleGallery={toggleGallery}
                            item={item}
                            clickedPic={clickedPic}
                        />
                    )}
                </Route>
            </Switch>
        );
    }

    if (!item) {
        return (
            <div className="item-wrap">
                <div className="loader"></div>
            </div>
        );
    }
}
