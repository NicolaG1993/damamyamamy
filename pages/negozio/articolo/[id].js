import styles from "@/styles/Item.module.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import CartButton from "@/components/Buttons/CartButton/CartButton";
// import { formatJSDate } from "../../shared/utils/convertTimestamp";
const ShortList = dynamic(
    () => import("@/components/Displayers/Shortlist/Shortlist"),
    {
        ssr: false,
    }
);

export default function Articolo({ item }) {
    //================================================================================
    // Component State
    //================================================================================
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [clickedPic, setClickedPic] = useState(0);
    const [shortListData, setShortListData] = useState([]);
    console.log("item", item);

    //================================================================================
    // Functions
    //================================================================================
    useEffect(() => {
        fetchData();
    }, []);

    const toggleGallery = async (n, bool) => {
        setClickedPic(n);
        setGalleryOpen(bool);
    };

    //================================================================================
    // API Requests
    //================================================================================
    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/hello");
            setShortListData(data.lastItems);
        } catch (err) {
            setShortListData();
            alert(
                "Sembra che abbiamo dei problemi con il nostro sito, riprova piú tardi oppure contattaci al 347 9792 644, ci scusiamo per il disagio."
            );
        }
    };

    //================================================================================
    // Sub-Components
    //================================================================================
    const ItemWrap = () => {
        return (
            <section className={styles["item-section"]}>
                <div className={styles["item-wrap"]}>
                    <PicDisplay />

                    <div className={styles["item-infos"]}>
                        <h1>{item.name}</h1>
                        <div className={styles["item-price"]}>
                            <h2>{item.price}€</h2>
                        </div>

                        <div className={styles["item-infos-wrap"]}>
                            <div className={styles["item-row"]}>
                                <span>Brand:</span>
                                <p>{item.brand}</p>
                            </div>

                            <div className={styles["item-row"]}>
                                <span>Disponibilitá:</span>
                                {!item.count_in_stock && (
                                    <p>Prodotto non disponibile</p>
                                )}
                                {item.count_in_stock === 1 && (
                                    <p>Pezzo unico</p>
                                )}
                                {item.count_in_stock > 1 && (
                                    <p>{item.count_in_stock} rimanenti</p>
                                )}
                            </div>

                            <div className={styles["item-row"]}>
                                <span>Condizioni:</span>
                                {item.condition === "new" && (
                                    <>
                                        <h5>come nuovo</h5>
                                        <div className={"green-circle"}></div>
                                    </>
                                )}
                                {item.condition === "used" && (
                                    <>
                                        <h5>usato</h5>
                                        <div className={"yellow-circle"}></div>
                                    </>
                                )}
                                {item.condition === "bad" && (
                                    <>
                                        <h5>rovinato</h5>
                                        <div className={"red-circle"}></div>
                                    </>
                                )}
                            </div>

                            <div className={styles["item-row"]}>
                                <span>Categorie:</span>
                                <div className={styles["results-wrap"]}>
                                    {item.categories ? (
                                        item.categories.map((el) => (
                                            <p key={el.name}>{el.name}</p>
                                        ))
                                    ) : (
                                        <p>Nessuna categoria</p>
                                    )}
                                </div>
                            </div>

                            <div className={styles["item-row"]}>
                                <span>Tags:</span>
                                <div className={styles["results-wrap"]}>
                                    {item.tags ? (
                                        item.tags.map((el) => (
                                            <p key={el.name}>{el.name}</p>
                                        ))
                                    ) : (
                                        <p>Nessun tag</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <CartButton
                            // isVisibile={isHovered}
                            wrapSize="large"
                            item={item}
                        />
                    </div>
                </div>
            </section>
        );
    };

    const PicDisplay = () => (
        <div className={styles["picDisplayWrap"]}>
            <div className={styles["item-pic"]}>
                <Image
                    src={item.pics[0] || "/no-image.png"}
                    alt={item.name}
                    onClick={() => toggleGallery(0, true)}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>

            {item.pics.length > 1 && (
                <div className={styles["item-pictures-small-wrap"]}>
                    {item.pics.map((el, i) => (
                        <Image
                            key={el.key}
                            alt={el.key}
                            src={el.location}
                            onClick={() => toggleGallery(i, true)}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    ))}
                </div>
            )}
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
                                        item.description &&
                                        item.description.replace(
                                            /\u00a0/g,
                                            " "
                                        ),
                                }}
                            ></div>
                        ) : item.infos ? (
                            <p>{item.infos}</p>
                        ) : (
                            <p>Nessuna informazione</p>
                        )}
                    </div>
                </div>
            </section>
        );
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main id={styles["Item"]}>
            <Head>
                <title>{item.name} • Da Mamy a Mamy</title>
                <meta
                    property="og:title"
                    content={`${item.name} • Da Mamy a Mamy`}
                />
                <meta property="og:type" content="article" />
            </Head>

            <ItemWrap />
            {/* <ItemDescriptionWrap /> */}
            <ShortList tableName={"Gli ultimi arrivi"} data={shortListData} />
            {/* <section className="page"> */}
            {/* <h3>Potrebbero interessarti</h3> */}
            {/* </section> */}
        </main>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;

    let apiString = "";
    const env = process.env.NODE_ENV;
    if (env == "development") {
        apiString = `http://localhost:3000/api/get/item/${id}`;
    } else if (env == "production") {
        apiString = `https://damamyamamy.com/api/get/item/${id}`;
    }
    const { data } = await axios.get(apiString);

    return {
        props: { item: data },
    };
}
