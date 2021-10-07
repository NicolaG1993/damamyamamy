import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState, useEffect, useRef } from "react";
// import { Switch, Route, useRouteMatch } from "react-router-dom";

import styles from "../../components/Shop/Item/style/Item.module.css";

// import Button from "../../components/Button/Button";
import CartButton from "../../components/CartButton/CartButton";
const Shortlist = dynamic(
    () => import("../../components/Shortlist/Shortlist"),
    {
        ssr: false,
    }
); //giusto?
const Gallery = dynamic(
    () => import("../../components/Shop/Item/Gallery/Gallery"),
    {
        ssr: false,
    }
); //giusto?

import { fetchItem } from "../api/api";

///////////////////////
// devo fare una req ad api e settare Item, all'inizio e quando cambia query

export default function Item() {
    const [item, setItem] = useState(false); //?

    const router = useRouter();
    const { id } = router.query;
    console.log("id", id);

    const [loading, setLoading] = useState(item ? false : true);
    // const fetchNewItem = useRef(item ? false : true);

    const [galleryOpen, setGalleryOpen] = useState(false);
    const [clickedPic, setClickedPic] = useState(0);

    useEffect(() => {
        id &&
            fetchItem(id).then((item) => {
                setItem(item);
            });
    }, [id]);
    useEffect(() => {
        if (item) {
            // setLoading(true);
            // fetchItem(id).then((item) => {
            //     setItem(item);
            setLoading(false);
            // });
        } else {
            setLoading(true);
        }
    }, [item]);

    const toggleGallery = async (n, boo) => {
        setClickedPic(n);
        setGalleryOpen(boo);
    };

    if (loading === true) {
        return <div className="loader AAA"></div>;
    }

    const PicDisplay = () =>
        item.assets.length > 1 ? (
            <div className={styles["item-pictures-wrap"]}>
                <img
                    src={item.media.source || "test1.jpg"}
                    onClick={() => toggleGallery(0, true)}
                />

                <div className={styles["item-pictures-small-wrap"]}>
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
        <div id={styles["Item"]}>
            <div className={styles["item-wrap"]}>
                <div className={styles["item-pic"]}>
                    <PicDisplay />
                </div>
                <div className={styles["item-infos"]}>
                    <h1>{item.name}</h1>
                    <div className={styles["item-infos-price"]}>
                        <h2>{item.price.raw}€</h2>
                        <p>IVA inclusa</p>
                    </div>
                    <div className={"product-divider-small"}> </div>
                    <div className={"item-infos-infos-box"}>
                        <div className={styles["item-infos-conditions"]}>
                            <span>Condizioni:</span>
                            <div
                                className={styles["item-infos-conditions-wrap"]}
                            >
                                <h5>come nuovo</h5>
                                <div className={styles["circle"]}></div>
                            </div>
                        </div>

                        <div className={styles["item-infos-infos"]}>
                            <span>Categoria:</span>
                            <p>
                                {item.categories[0] && item.categories[0].name}
                            </p>
                        </div>

                        <div className={styles["item-infos-infos"]}>
                            <span>Tags:</span>
                            <div
                                className={
                                    styles["item-infos-infos-inner-wrap"]
                                }
                            >
                                {item.categories[0] && (
                                    <Link
                                        href={{
                                            pathname: "/shop",
                                            tag: item.categories[0].name,
                                        }}
                                    >
                                        <a className={styles["item-tag"]}>
                                            {item.categories[0].name}
                                        </a>
                                    </Link>
                                )}

                                <Link
                                    href={{
                                        pathname: "/shop",
                                        tag: "3/5 anni",
                                    }}
                                >
                                    <a className={styles["item-tag"]}>
                                        3/5 anni
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className={styles["item-infos-infos"]}>
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
            <section className={styles["item-description-wrap"]}>
                <div className={styles["item-description"]}>
                    <div className={styles["item-description-selector"]}>
                        <h3
                            onClick={() => toggleInfoDisplay("description")}
                            className={`${
                                infoDisplay === "description"
                                    ? styles["active-selector"]
                                    : styles["not-active-selector"]
                            }`}
                        >
                            Descrizione
                        </h3>

                        <h3
                            onClick={() => toggleInfoDisplay("infos")}
                            className={`${
                                infoDisplay === "infos"
                                    ? styles["active-selector"]
                                    : styles["not-active-selector"]
                            }`}
                        >
                            Informazioni
                        </h3>
                    </div>

                    <div className={styles["item-description-display"]}>
                        {infoDisplay === "description" ? (
                            <div
                                className={styles["dangerHTML-box"]}
                                dangerouslySetInnerHTML={{
                                    __html: item.description.replace(
                                        /\u00a0/g,
                                        " "
                                    ),
                                }}
                            ></div>
                        ) : (
                            <p>Nessuna informazione</p>
                        )}
                    </div>
                </div>
            </section>
        );
    };

    const ShortlistWrap = () => (
        <section className={styles["item-shortlist-wrap"]}>
            {/* <h2>Articoli simili</h2> */}

            <Shortlist
                products={item.related_products}
                listTitle="Articoli simili"
            />
        </section>
    );

    if (item) {
        return (
            <>
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
            </>
        );
    }

    if (!item) {
        return (
            <div className={styles["item-wrap"]}>
                <div className="loader"></div>
            </div>
        );
    }
}
