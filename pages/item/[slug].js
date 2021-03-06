import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
// import { Switch, Route, useRouteMatch } from "react-router-dom";

import styles from "../../components/Shop/Item/style/Item.module.css";

// import Button from "../../components/Button/Button";
import CartButton from "../../components/CartButton/CartButton";
import Shortlist from "../../components/Shortlist/Shortlist";

const Gallery = dynamic(
    () => import("../../components/Shop/Item/Gallery/Gallery"),
    {
        ssr: false,
    }
); //giusto?

// import { fetchItem } from "../api/api";
import prisma from "../../shared/libs/prisma";
import { formatJSDate } from "../../shared/utils/convertTimestamp";

///////////////////////////////////////////
/*
export async function getInitialProps(context) {
    //dovrei usare "getServerSideProps" per SEO ma con AWS mi da errore (dice da LambaFunction ma nemmeno non la uso qua!) //fouri da AWS funziona invece
    const { id } = context.query;
    const fetchedItem = await fetchItem(id);
    // const country = await res.json();

    console.log(`Fetched item: ${fetchedItem}`);
    return { props: { fetchedItem } };
}
*/
///////////////////////
// devo fare una req ad api e settare Item, all'inizio e quando cambia query

export default function Item({ product }) {
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [clickedPic, setClickedPic] = useState(0);
    // const [relatedProducts, setRelatedProducts] = useState([]);

    console.log("product", product);

    /* 
    const [item, setItem] = useState(fetchedItem); //?

    const router = useRouter();
    const { id } = router.query;
    console.log("id", id);

    const [loading, setLoading] = useState(item ? false : true);
    // const fetchNewItem = useRef(item ? false : true);

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

    if (loading === true) {
        return <div className="loader AAA"></div>;
    }
    */

    const toggleGallery = async (n, boo) => {
        setClickedPic(n);
        setGalleryOpen(boo);
    };

    const PicDisplay = () =>
        product.images.length > 1 ? (
            <div className={styles["item-pictures-wrap"]}>
                <div>
                    <Image
                        src={product.images[0].location || "/pics/Logo.jpg"}
                        alt={product.name}
                        onClick={() => toggleGallery(0, true)}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <div className={styles["item-pictures-small-wrap"]}>
                    {product.images.map((el, i) => (
                        <Image
                            key={el.key}
                            alt={el.key}
                            src={el.location}
                            onClick={() => toggleGallery(i, true)}
                            layout="responsive"
                            width="50px"
                            height="50px"
                            objectFit="cover"
                        />
                    ))}
                </div>
            </div>
        ) : (
            <div>
                <Image
                    src={
                        product.images.length
                            ? product.images[0].location
                            : "/pics/Logo.jpg"
                    }
                    alt={product.name}
                    onClick={() => toggleGallery(0, true)}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        );

    const ItemWrap = () => (
        <div id={styles["Item"]}>
            <div className={styles["item-wrap"]}>
                <div className={styles["item-pic"]}>
                    <PicDisplay />
                </div>
                <div className={styles["item-infos"]}>
                    <h1>{product.name}</h1>
                    <div className={styles["item-infos-price"]}>
                        <h2>{product.price}???</h2>
                        <p>IVA inclusa</p>
                    </div>
                    <div className={"product-divider-small"}> </div>
                    <div className={"item-infos-infos-box"}>
                        <div className={styles["item-infos-infos"]}>
                            <span>Brand:</span>
                            <p>{product.brand}</p>
                        </div>

                        <div className={styles["item-infos-conditions"]}>
                            <span>Condizioni:</span>
                            <div
                                className={styles["item-infos-conditions-wrap"]}
                            >
                                {product.condition === "new" && (
                                    <>
                                        <h5>come nuovo</h5>
                                        <div
                                            className={styles["green-circle"]}
                                        ></div>
                                    </>
                                )}
                                {product.condition === "used" && (
                                    <>
                                        <h5>usato</h5>
                                        <div
                                            className={styles["yellow-circle"]}
                                        ></div>
                                    </>
                                )}
                                {product.condition === "bad" && (
                                    <>
                                        <h5>rovinato</h5>
                                        <div
                                            className={styles["red-circle"]}
                                        ></div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className={styles["item-infos-infos"]}>
                            <span>Categorie:</span>
                            {product.categories.map((el) => (
                                <p key={el}>{el}</p>
                            ))}
                        </div>

                        <div className={styles["item-infos-infos"]}>
                            <span>Tags:</span>
                            <div
                                className={
                                    styles["item-infos-infos-inner-wrap"]
                                }
                            >
                                {product.tags &&
                                    product.tags.map((el, i) => (
                                        <Link
                                            key={el + i}
                                            href={{
                                                pathname: "/shop",
                                                query: {
                                                    research: el,
                                                },
                                            }}
                                        >
                                            <a className={styles["item-tag"]}>
                                                {el}
                                            </a>
                                        </Link>
                                    ))}

                                {product.brand && (
                                    <Link
                                        href={{
                                            pathname: "/shop",
                                            query: { research: product.brand },
                                        }}
                                    >
                                        <a className={styles["item-tag"]}>
                                            {product.brand}
                                        </a>
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className={styles["item-infos-infos"]}>
                            <span>Disponibilit??:</span>

                            {!product.count_in_stock && (
                                <p>Prodotto non disponibile</p>
                            )}
                            {product.count_in_stock === 1 && <p>Pezzo unico</p>}
                            {product.count_in_stock > 1 && (
                                <p>{product.count_in_stock} rimanenti</p>
                            )}
                        </div>
                    </div>
                    {product.count_in_stock > 0 && (
                        <CartButton wrapSize="large" product={product} />
                    )}
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
                                    __html:
                                        product.description &&
                                        product.description.replace(
                                            /\u00a0/g,
                                            " "
                                        ),
                                }}
                            ></div>
                        ) : product.infos ? (
                            <p>{product.infos}</p>
                        ) : (
                            <p>Nessuna informazione</p>
                        )}
                    </div>
                </div>
            </section>
        );
    };

    //qui devo passargli related_products e mostrare solo articoli ancora in stock
    const ShortlistWrap = () => (
        <section className={styles["item-shortlist-wrap"]}>
            {/* <h2>Articoli simili</h2> */}

            <Shortlist
                products={product.related_products || []}
                listTitle="Articoli simili"
            />
        </section>
    );

    if (product) {
        return (
            <>
                <Head>
                    <title>{product.name} - Da Mamy a Mamy</title>
                    <meta
                        property="og:title"
                        content={`${product.name} - da Mamy a Mamy`}
                    />
                    <meta property="og:type" content="article" />
                </Head>
                <ItemWrap />
                <ItemDescriptionWrap />
                <ShortlistWrap />
                {galleryOpen && (
                    <Gallery
                        toggleGallery={toggleGallery}
                        product={product}
                        clickedPic={clickedPic}
                    />
                )}
            </>
        );
    }

    if (!product) {
        return (
            <div className={styles["item-wrap"]}>
                <div className="loader"></div>
            </div>
        );
    }
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    const validateFeed = (obj) => ({
        ...obj,
        price: Number(obj.price),
        created_at: formatJSDate(obj.created_at),
    });

    let feed = await prisma.products.findUnique({
        where: { slug: slug },
    });

    if (feed.related_products) {
        let resp = await prisma.products.findMany({
            where: { id: { in: feed.related_products } },
        });

        resp = resp.map((el) => validateFeed(el));

        feed.related_products = resp;
    }

    console.log("slug:", slug);
    console.log("feed:", feed);

    return {
        props: { product: validateFeed(feed) },
    };
}

/*
POSTGRESQL VERSION
export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
    console.log("slug: ", slug);

    // const { data } = await axios.get(
    //     `http://localhost:3000/api/product/${slug}`
    // ); //solo per local
    const { data } = await axios.get(
        `https://damamyamamy.com/api/product/${slug}`
    );
    console.log("data: ", data);
    return {
        props: { product: data },
    };
}
*/
