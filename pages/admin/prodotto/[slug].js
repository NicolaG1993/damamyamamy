// questo deve essere un form
// inoltre non serve avere ssr

import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";
import { useSnackbar } from "notistack";
import { getError } from "../../../shared/utils/error";

import { shallowEqual, useSelector } from "react-redux";
const loggedUser = (state) => state.user.userInfo;

//
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useState, useEffect, useRef } from "react";
// import { Switch, Route, useRouteMatch } from "react-router-dom";

import styles from "../../../components/Shop/Item/style/Item.module.css";

// import Button from "../../components/Button/Button";
/*
import CartButton from "../../../components/CartButton/CartButton";
import Shortlist from "../../../components/Shortlist/Shortlist";


const Gallery = dynamic(
    () => import("../../../components/Shop/Item/Gallery/Gallery"),
    {
        ssr: false,
    }
);
*/

function AdminItem({ params }) {
    //features:
    //visualizza tutte info, modifica item, modifica categorie, elimina item, conferma annulla modifiche, error handle in form e api requests
    const { slug } = params;
    const router = useRouter();
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();
    let userInfo = useSelector(loggedUser, shallowEqual);

    const [product, setProduct] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }

        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/product/${slug}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                }); // questa riga disattiva linter 🧨

                setProduct(data);
            } catch (err) {
                enqueueSnackbar(getError(err), { variant: "error" });
            }
        };

        fetchProduct();
    }, []);

    const handleBlur = (e) => {
        // qui voglio settare lo state di product con i valori di input
        // valori iniziali saranno quelli di fetched product
        // fare anche check per errori e mostrare spans come in register component

        console.log("e.target.id: ", e.target.id);
        const { id, name, value } = e.target;
        let newErrObj = { ...errors }; //creo nuovo oggetto ogni volta per rimuovere errori precedenti

        //validate
        if (id === "Name") {
            const resp = nameValidation("Name", value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
    };
    const handleSubmit = async () => {
        // quando user clicca conferma e non ci sono errori allora facciamo post request per update
    };

    console.log("product: ", product);

    if (!product) {
        return (
            <div>
                <p>Caricamento...</p>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{product.name} - Admin Dashboard</title>
                <meta
                    property="og:title"
                    content={`${product.name} - Admin Dashboard`}
                />
                <meta property="og:type" content="article" />
            </Head>
            <main>
                <form>
                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>ID: #{product.id}</span>
                        </label>
                    </div>

                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>Titolo</span>
                        </label>
                    </div>
                    <div className={"filter-form-col-right"}>
                        <input
                            type="text"
                            name="name"
                            id="Name"
                            value={product.name}
                            maxLength="30"
                            onChange={(e) =>
                                setProduct({ ...product, name: e.target.value })
                            }
                            onBlur={(e) => handleBlur(e)}
                        />
                        {errors.name && (
                            <div className={"form-error"}>{errors.name}</div>
                        )}
                    </div>

                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>Brand</span>
                        </label>
                    </div>
                    <div className={"filter-form-col-right"}>
                        <input
                            type="text"
                            name="brand"
                            id="Brand"
                            value={product.brand}
                            maxLength="30"
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    brand: e.target.value,
                                })
                            }
                            onBlur={(e) => handleBlur(e)}
                        />
                        {errors.brand && (
                            <div className={"form-error"}>{errors.brand}</div>
                        )}
                    </div>

                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>Slug</span>
                        </label>
                    </div>
                    <div className={"filter-form-col-right"}>
                        <input
                            type="text"
                            name="slug"
                            id="Slug"
                            value={product.slug}
                            maxLength="30"
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    slug: e.target.value,
                                })
                            }
                            onBlur={(e) => handleBlur(e)}
                        />
                        {errors.slug && (
                            <div className={"form-error"}>{errors.slug}</div>
                        )}
                    </div>

                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>Prezzo</span>
                        </label>
                    </div>
                    <div className={"filter-form-col-right"}>
                        €{" "}
                        <input
                            type="number"
                            name="price"
                            id="Price"
                            value={product.price}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    price: e.target.value,
                                })
                            }
                            onBlur={(e) => handleBlur(e)}
                        />
                        {errors.price && (
                            <div className={"form-error"}>{errors.price}</div>
                        )}
                    </div>

                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>Disponibili</span>
                        </label>
                    </div>
                    <div className={"filter-form-col-right"}>
                        <input
                            type="number"
                            name="stock"
                            id="Stock"
                            value={product.count_in_stock}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    count_in_stock: e.target.value,
                                })
                            }
                            onBlur={(e) => handleBlur(e)}
                        />
                        {errors.count_in_stock && (
                            <div className={"form-error"}>
                                {errors.count_in_stock}
                            </div>
                        )}
                    </div>

                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>Descrizione</span>
                        </label>
                    </div>
                    <div className={"filter-form-col-right"}>
                        <input
                            type="text"
                            name="description"
                            id="Description"
                            value={product.description}
                            maxLength="250"
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    description: e.target.value,
                                })
                            }
                            onBlur={(e) => handleBlur(e)}
                        />
                        {errors.description && (
                            <div className={"form-error"}>
                                {errors.description}
                            </div>
                        )}
                    </div>

                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>Maggiori informazioni</span>
                        </label>
                    </div>
                    <div className={"filter-form-col-right"}>
                        <input
                            type="text"
                            name="infos"
                            id="Infos"
                            value={product.infos}
                            maxLength="250"
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    infos: e.target.value,
                                })
                            }
                            onBlur={(e) => handleBlur(e)}
                        />
                        {errors.infos && (
                            <div className={"form-error"}>{errors.infos}</div>
                        )}
                    </div>

                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>Categorie</span>
                        </label>
                    </div>
                    {/* qui cé da vedere come fare a modificare array categories, e come gestire i singoli errori */}
                    {product.categories.map((cat, i) => (
                        <div className={"filter-form-col-right"} key={cat}>
                            <input
                                type="text"
                                name={`category ${i + 1}`}
                                id="Category"
                                value={cat}
                                maxLength="30"
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        categories: e.target.value,
                                    })
                                }
                                onBlur={(e) => handleBlur(e)}
                            />
                            {errors.categories && (
                                <div className={"form-error"}>
                                    {errors.categories}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>Tags</span>
                        </label>
                    </div>
                    {/* qui cé da vedere come fare a modificare array categories, e come gestire i singoli errori */}
                    {product.tags.map((tag, i) => (
                        <div className={"filter-form-col-right"} key={tag}>
                            <input
                                type="text"
                                name={`tag ${i + 1}`}
                                id="Tag"
                                value={tag}
                                maxLength="30"
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        tags: e.target.value,
                                    })
                                }
                                onBlur={(e) => handleBlur(e)}
                            />
                            {errors.tags && (
                                <div className={"form-error"}>
                                    {errors.tags}
                                </div>
                            )}
                        </div>
                    ))}
                </form>

                <br />
                <br />
                <h2>rimane da fare</h2>
                <br />
                <p>lista immagini e upload bucket?</p>
                <p>select condition</p>
                <p>select related products</p>
                <p>display created_at</p>
            </main>
        </>
    );

    /*
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [clickedPic, setClickedPic] = useState(0);

    console.log("product", product);

    const toggleGallery = async (n, boo) => {
        setClickedPic(n);
        setGalleryOpen(boo);
    };

    const PicDisplay = () =>
        product.images.length > 1 ? (
            <div className={styles["item-pictures-wrap"]}>
                <div>
                    <Image
                        src={product.images[0] || "/pics/Logo.jpg"}
                        alt={product.name}
                        onClick={() => toggleGallery(0, true)}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <div className={styles["item-pictures-small-wrap"]}>
                    {product.images.map((el, i) => (
                        <Image
                            key={el}
                            alt={product.name}
                            src={el}
                            onClick={() => toggleGallery(i, true)}
                            layout="fill"
                            objectFit="cover"
                        />
                    ))}
                </div>
            </div>
        ) : (
            <div>
                <Image
                    src={product.images[0] || "/pics/Logo.jpg"}
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
                        <h2>{product.price}€</h2>
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
                                {product.condition === "broken" && (
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
                            </div>
                        </div>

                        <div className={styles["item-infos-infos"]}>
                            <span>Disponibilitá:</span>

                            {!product.count_in_stock && (
                                <p>Prodotto non disponibile</p>
                            )}
                            {product.count_in_stock === 1 && <p>Pezzo unico</p>}
                            {product.count_in_stock > 1 && (
                                <p>{product.count_in_stock} rimanenti</p>
                            )}
                        </div>
                    </div>
                    <CartButton wrapSize="large" product={product} />
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
                                    __html: product.description.replace(
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

    useEffect(() => {}, []);

    //qui devo passargli related_products e mostrare solo articoli ancora in stock
    const ShortlistWrap = () => (
        <section className={styles["item-shortlist-wrap"]}>
            // <h2>Articoli simili</h2> 

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
    console.log("slug: ", slug);

    const { data } = await axios.get(
        `http://localhost:3000/api/product/${slug}`
    ); //solo per local
    console.log("data: ", data);
    return {
        props: { product: data },
    };
    */
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
} //serve per poter accedere a slug di url in backend, altrimenti undefined

export default dynamic(() => Promise.resolve(AdminItem), { ssr: false });
