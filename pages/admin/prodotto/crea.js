import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";
import { useSnackbar } from "notistack";
import { getError } from "../../../shared/utils/error";

import { shallowEqual, useSelector } from "react-redux";
const loggedUser = (state) => state.user.userInfo;

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useState, useEffect, useRef } from "react";

import styles from "../../../components/AdminDashboard/style/AdminDashboard.module.css";
import { formatJSDate } from "../../../shared/utils/convertTimestamp";
import {
    createObjectURL,
    revokeObjectURL,
} from "../../../shared/utils/useLocalImages";
import {
    decimalValidation,
    titleValidation,
    nameValidation,
    numberValidation,
    slugValidation,
} from "../../../shared/utils/validateForms";
import slugify from "../../../shared/utils/slugify";
import Button from "../../../components/Button/Button";

export default function AdminNewItem() {
    const router = useRouter();
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();
    let userInfo = useSelector(loggedUser, shallowEqual);

    const [product, setProduct] = useState({
        categories: [],
        tags: [],
        condition: "new",
        price: 0,
        count_in_stock: 1,
    });
    // const [originalProduct, setOriginalProduct] = useState();
    const [categories, setCategories] = useState();
    const [tags, setTags] = useState();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedProductsWindow, setRelatedProductsWindow] = useState(false);
    const [allProducts, setAllProducts] = useState([]);

    const [errors, setErrors] = useState({});

    //researches
    const [categoryMatchResults, setCategoryMatchResults] = useState();
    const [tagMatchResults, setTagMatchResults] = useState();

    // questi state servono per poter fare update di input value da altre funzioni
    const [newCategoryInput, setNewCategoryInput] = useState("");
    const [newTagInput, setNewTagInput] = useState("");

    //images
    const [newImages, setNewImages] = useState([]); //nuove immagini da aggiungere onSubmit
    // const [deletedImages, setDeletedImages] = useState([]);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(`/api/categories`);
            setCategories(data.allCategories);
            setTags(data.allTags);
        } catch (err) {
            enqueueSnackbar(getError(err), { variant: "error" });
        }
    };

    const fetchAllProducts = async () => {
        try {
            const { data } = await axios.get(`/api/products`);
            const finalData = data.products
                .filter((it) => it.id !== product.id)
                .map((el) => ({ name: el.name, id: el.id, slug: el.slug }));
            setAllProducts(finalData);
            return finalData;
        } catch (err) {
            enqueueSnackbar(getError(err), { variant: "error" });
        }
    };

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        if (!userInfo.is_admin) {
            router.push("/");
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        if (relatedProductsWindow) {
            fetchAllProducts();
        }
    }, [relatedProductsWindow]);

    const handleRemoveSelectedInput = ({ field, i }) => {
        if (field === "categories") {
            setProduct({
                ...product,
                categories: product.categories.filter(
                    (el, index) => index !== i
                ),
            });
        } else if (field === "tags") {
            setProduct({
                ...product,
                tags: product.tags.filter((el, index) => index !== i),
            });
        }
    };

    //avrebbe piu senso fare un validate per tutto il form e tornare solo il primo errore che si riscontra (o anche tutti insieme)
    //cosí si potrebbe usarlo sia onBlur che onSubmit
    const handleBlur = async (e) => {
        const { id, name, value } = e.target;
        let newErrObj = { ...errors };

        //validate values
        if (id === "Name") {
            const resp = titleValidation("Titolo", value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Slug") {
            fetchAllProducts().then((data) => {
                //validation non serve perché campo puo essere vuoto
                //verificare value con slugify, perché é quello che sará salvato in db

                // const resp = slugValidation("Slug", slugify(value));
                // if (resp) {
                //     setErrors({ ...errors, [name]: resp });
                // } else {

                const allSlugs = data.map((el) => el.slug);
                document.getElementById("Slug").value = slugify(value);
                //se slug esiste giá in db, torna errore
                if (allSlugs.includes(slugify(value))) {
                    setErrors({ ...errors, [name]: "Slug giá esistente" });
                } else {
                    delete newErrObj[name];
                    setErrors(newErrObj);
                    setProduct({
                        ...product,
                        slug: slugify(value),
                    }); // forse non servé perché update invoca gia onChange, quindi setProduct ??? testare
                }
                // }
            });
        }
        if (id === "Price") {
            const resp = decimalValidation("Prezzo", value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Stock") {
            const resp = numberValidation("Quantità", value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
    };

    const closeMatchResults = (e) => {
        const { id, value } = e.target;
        if (id === "CategoryNew") {
            setNewCategoryInput(value);
            setCategoryMatchResults(null);
        } else if (id === "TagNew") {
            setNewTagInput(value);
            setTagMatchResults(null);
        }
    };

    const handleInputHints = (e) => {
        const { id, value } = e.target;
        const inputVal = e.target.value.toLowerCase();
        let matchResults = [];
        let source;
        let propFlag;

        if (id === "CategoryNew") {
            setNewCategoryInput(value);
            source = categories;
            propFlag = "categories";
        } else if (id === "TagNew") {
            setNewTagInput(value);
            source = tags;
            propFlag = "tags";
        }

        // filtro source array
        for (var i = 0; i < source.length; i++) {
            if (
                source[i].toLowerCase().indexOf(inputVal) === 0 &&
                !product[propFlag].includes(source[i])
            ) {
                matchResults.push(source[i]);
                if (matchResults.length === 5) {
                    break;
                }
            }
        }

        if (!matchResults.length) {
            id === "CategoryNew" && setCategoryMatchResults(null);
            id === "TagNew" && setTagMatchResults(null);
        } else {
            id === "CategoryNew" && setCategoryMatchResults(matchResults);
            id === "TagNew" && setTagMatchResults(matchResults);
        }

        //devo ancora settare i keydown events (frecce e invio) -> nn prioritario 🪁
    };

    const handleAddInputToArray = (field) => {
        // prendo value da input in DOM
        const value = document.getElementById(field).value;

        if (value !== "") {
            // modifico array e svuoto input corrispondenti
            field === "CategoryNew" &&
                (setProduct({
                    ...product,
                    categories: [...product.categories, value],
                }),
                setNewCategoryInput(""));

            field === "TagNew" &&
                (setProduct({
                    ...product,
                    tags: [...product.tags, value],
                }),
                setNewTagInput(""));
        }
    };

    const addLocalImages = (e) => {
        console.log("e.target.files: ", e.target.files); // use the spread syntax to get it as an array
        const files = [...e.target.files].map((el) => ({
            location: createObjectURL(el),
            key: el.name,
            file: el,
        }));
        setNewImages([...newImages, ...files]);
    };

    const deleteImage = (img) => {
        const newArr = newImages.filter((el) => img.key !== el.key);
        setNewImages(newArr);
        revokeObjectURL(img.location);
    };

    const uploadImages = (obj) => {
        return axios.post("/api/product/upload-pic", obj, {
            headers: { authorization: `Bearer ${userInfo.token}` },
        });
    };

    const uploadProduct = async (obj, uploadResponse) => {
        console.log("uploadResponse", uploadResponse);
        let uploadedImages = [];
        if (uploadResponse.length) {
            uploadedImages = uploadResponse.map((el) => ({
                location: el.Location,
                key: el.Key,
            }));
            console.log("uploadedImages", uploadedImages);
        }

        if (obj.slug === "" || !obj.slug) {
            //genero slug
            obj.slug = slugify(obj.name);

            const data = await fetchAllProducts();
            const allSlugs = data.map((el) => el.slug);
            //se esiste giá: aggiungo timestamp
            if (allSlugs.includes(obj.slug)) {
                obj.slug = `${obj.slug}-${Date.now()}`;
            }
        } else {
            obj.slug = slugify(obj.slug);
        }

        /*
        Collegare nuovo db per test in dev mode
        Provare ad inserire un oggetto senza slug 👍
        Inserire un secondo oggetto senza slug con lo stesso titolo 👍
        Provare a creare uno oggetto inserendo uno slug sbagliato (spazi, accenti, ecc) 👍
        */

        return axios.post(
            `/api/product/upload`,
            {
                ...obj,
                images: [...uploadedImages],
                related_products: obj.related_products
                    ? obj.related_products.map((el) => el.id)
                    : null,
            },
            {
                headers: { authorization: `Bearer ${userInfo.token}` },
            }
        );
    };

    const confirmChanges = async (e) => {
        e.preventDefault();
        closeSnackbar();

        if (Object.keys(errors).length === 0) {
            // const file = e.target.files[0];
            const formData = new FormData();
            newImages.forEach((file) => {
                formData.append("arrOfFiles", file.file);
            });

            uploadImages(formData).then(({ data }) => {
                uploadProduct(
                    { ...product, related_products: relatedProducts },
                    data
                )
                    .then(({ data }) => {
                        console.log("res!", data);
                        enqueueSnackbar(data.message, {
                            variant: "success",
                        });
                        router.push("/admin/prodotti");
                    })
                    .catch((err) =>
                        enqueueSnackbar(getError(err), {
                            variant: "error",
                        })
                    );
            });
        } else {
            console.log("INVALID INPUTS", errors);
            // how to map object values, instead of array
            Object.values(errors).map((err, i) =>
                enqueueSnackbar(err, {
                    variant: "error",
                })
            );
            return;
        }
    };

    return (
        <>
            <Head>
                <title>Aggiungi prodotto - Admin Dashboard</title>
                <meta
                    property="og:title"
                    content={`Aggiungi prodotto - Admin Dashboard`}
                />
                <meta property="og:type" content="article" />
            </Head>
            <div className={styles["dashboard-sub-component"]}>
                <Link href={`/admin/prodotti`}>
                    <a>
                        <h5 className={styles["filter-form-small-btn"]}>
                            🠔 Torna indietro
                        </h5>
                    </a>
                </Link>
                <form onSubmit={(e) => confirmChanges(e)}>
                    <div className={styles["filter-form-col-full"]}>
                        <h4>ID: #</h4>
                        <span>{"generato automaticamente"}</span>
                    </div>

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Titolo</h4>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <input
                            type="text"
                            name="name"
                            id="Name"
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

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Brand</h4>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <input
                            type="text"
                            name="brand"
                            id="Brand"
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

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Slug</h4>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <input
                            type="text"
                            name="slug"
                            id="Slug"
                            maxLength="60"
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

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Prezzo</h4>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        €{" "}
                        <input
                            type="number"
                            name="price"
                            id="Price"
                            defaultValue={0}
                            step="0.01"
                            className={styles["filter-form-input-price"]}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    price: Number(
                                        parseFloat(e.target.value).toFixed(2)
                                    ),
                                })
                            }
                            onBlur={(e) => handleBlur(e)}
                        />
                        {errors.price && (
                            <div className={"form-error"}>{errors.price}</div>
                        )}
                    </div>

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Disponibili</h4>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <input
                            type="number"
                            name="stock"
                            id="Stock"
                            defaultValue={1}
                            className={styles["filter-form-input-number"]}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    count_in_stock: Number(e.target.value),
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

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Condizioni</h4>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <select
                            name="conditions"
                            id="Conditions"
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    condition: e.target.value,
                                })
                            }
                        >
                            <option value={"new"}>Nuovo</option>
                            <option value={"used"}>Usato</option>
                            <option value={"bad"}>Rovinato</option>
                        </select>
                    </div>

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Descrizione</h4>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <textarea
                            name="description"
                            id="Description"
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

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Maggiori informazioni</h4>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <textarea
                            name="infos"
                            id="Infos"
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

                    {/* qui cé da vedere come fare a modificare array categories, e come gestire i singoli errori */}
                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Categorie</h4>
                        </label>
                    </div>

                    {product.categories.map((cat, i) => (
                        <div
                            className={styles["filter-form-col-right"]}
                            key={cat}
                        >
                            <input
                                type="text"
                                name={`category ${i + 1}`}
                                id="Category"
                                value={cat}
                                readOnly
                            />
                            <div
                                onClick={() =>
                                    handleRemoveSelectedInput({
                                        field: "categories",
                                        i,
                                    })
                                }
                                className={styles["form-input-sub-btn"]}
                                style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                                X
                            </div>
                        </div>
                    ))}
                    {product.categories.length < 3 && (
                        <div className={styles["filter-form-col-right"]}>
                            <input
                                type="text"
                                name={`category`}
                                id="CategoryNew"
                                maxLength="30"
                                value={newCategoryInput}
                                onFocus={(e) => handleInputHints(e)}
                                onChange={(e) => handleInputHints(e)}
                                onBlur={(e) =>
                                    setTimeout(() => {
                                        closeMatchResults(e);
                                        //serve timeout per poter attivare prima onClick su hint box
                                    }, 350)
                                }
                            />
                            <div
                                onClick={() =>
                                    handleAddInputToArray("CategoryNew")
                                } // aggiorno array in product e svuoto hint box
                                className={styles["form-input-sub-btn"]}
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                            >
                                +
                            </div>

                            {categoryMatchResults && (
                                <div className={styles["form-input-hint-box"]}>
                                    {categoryMatchResults.map((el) => (
                                        <p
                                            key={el}
                                            onClick={() => {
                                                setNewCategoryInput(el); //setto input value
                                                setCategoryMatchResults(null); //svuoto hint box
                                            }}
                                        >
                                            {el}
                                        </p>
                                    ))}
                                </div>
                            )}

                            {errors.categories && (
                                <div className={"form-error"}>
                                    {errors.categories}
                                </div>
                            )}
                        </div>
                    )}

                    <div className={styles[styles["filter-form-col-left"]]}>
                        <label>
                            <h4>Tags</h4>
                        </label>
                    </div>

                    {product.tags.map((tag, i) => (
                        <div
                            className={styles["filter-form-col-right"]}
                            key={tag}
                        >
                            <input
                                type="text"
                                name={`tag ${i + 1}`}
                                id="Tag"
                                value={tag}
                                readOnly
                            />
                            <div
                                onClick={() =>
                                    handleRemoveSelectedInput({
                                        field: "tags",
                                        i,
                                    })
                                }
                                className={styles["form-input-sub-btn"]}
                                style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                                X
                            </div>
                        </div>
                    ))}
                    {product.tags.length < 8 && (
                        <div className={styles["filter-form-col-right"]}>
                            <input
                                type="text"
                                name={`tag`}
                                id="TagNew"
                                maxLength="30"
                                value={newTagInput}
                                onFocus={(e) => handleInputHints(e)}
                                onChange={(e) => handleInputHints(e)}
                                onBlur={(e) =>
                                    setTimeout(() => {
                                        closeMatchResults(e);
                                    }, 350)
                                }
                            />
                            <div
                                onClick={() => handleAddInputToArray("TagNew")}
                                className={styles["form-input-sub-btn"]}
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                            >
                                +
                            </div>

                            {tagMatchResults && (
                                <div className={styles["form-input-hint-box"]}>
                                    {tagMatchResults.map((el) => (
                                        <p
                                            key={el}
                                            onClick={() => {
                                                setNewTagInput(el);
                                                setTagMatchResults(null);
                                            }}
                                        >
                                            {el}
                                        </p>
                                    ))}
                                </div>
                            )}

                            {errors.tags && (
                                <div className={styles["form-error"]}>
                                    {errors.tags}
                                </div>
                            )}
                        </div>
                    )}

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Immagini</h4>
                        </label>
                    </div>

                    <div
                        className={`${styles["filter-form-col-right"]} ${styles["admin-product-images"]}`}
                    >
                        <div>
                            {newImages.length > 0 &&
                                newImages.map((el, i) => (
                                    <div key={el.key + i}>
                                        <Image
                                            src={el.location}
                                            alt={`Foto ${i}`}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                        <span
                                            className={
                                                styles["admin-delete-image"]
                                            }
                                            onClick={() => deleteImage(el)}
                                        >
                                            X
                                        </span>
                                    </div>
                                ))}
                        </div>

                        {newImages.length < 5 && (
                            <div>
                                <input
                                    id="FileID"
                                    type="file"
                                    name="filename"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => addLocalImages(e)}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Prodotti correlati</h4>
                        </label>
                    </div>

                    {relatedProductsWindow ? (
                        <h5
                            className={styles["filter-form-toggler"]}
                            onClick={() =>
                                setRelatedProductsWindow(!relatedProductsWindow)
                            }
                        >
                            chiudi
                        </h5>
                    ) : (
                        <h5
                            className={styles["filter-form-toggler"]}
                            onClick={() =>
                                setRelatedProductsWindow(!relatedProductsWindow)
                            }
                        >
                            apri
                        </h5>
                    )}

                    {relatedProductsWindow && (
                        <>
                            {relatedProducts &&
                                relatedProducts.map((el, i) => (
                                    <div
                                        className={
                                            styles["filter-form-col-right"]
                                        }
                                        key={el.id}
                                    >
                                        <input
                                            type="text"
                                            name={`prodotto ${el.id}`}
                                            id="RelatedProduct"
                                            value={el.name}
                                            readOnly
                                            style={{
                                                backgroundColor:
                                                    "rgb(231, 134, 235)",
                                            }}
                                        />
                                        <div
                                            onClick={() =>
                                                setRelatedProducts(
                                                    relatedProducts.filter(
                                                        (el, index) =>
                                                            index !== i
                                                    )
                                                )
                                            }
                                            className={
                                                styles["form-input-sub-btn"]
                                            }
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            X
                                        </div>
                                    </div>
                                ))}

                            {/* this checks if values are not in relatedProducts already */}
                            {allProducts
                                .filter(
                                    (el) =>
                                        !relatedProducts.find(
                                            (it) => el.id == it.id
                                        )
                                )
                                .map((el, i) => (
                                    <div
                                        className={
                                            styles["filter-form-col-right"]
                                        }
                                        key={el.id}
                                    >
                                        <input
                                            type="text"
                                            name={`prodotto ${el.id}`}
                                            id="RelatedProduct2"
                                            value={el.name}
                                            readOnly
                                        />
                                        <div
                                            onClick={() =>
                                                setRelatedProducts([
                                                    ...relatedProducts,
                                                    {
                                                        name: el.name,
                                                        id: el.id,
                                                    },
                                                ])
                                            }
                                            className={
                                                styles["form-input-sub-btn"]
                                            }
                                            style={{
                                                fontSize: "25px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                ))}
                        </>
                    )}

                    <div
                        className={`${styles["filter-form-col-left"]} ${styles["buttons-box"]}`}
                    >
                        <Button text="Conferma modifiche" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
