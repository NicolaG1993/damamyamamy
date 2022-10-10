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

import { useState, useEffect } from "react";
// import { Switch, Route, useRouteMatch } from "react-router-dom";

import styles from "../../../components/AdminDashboard/style/AdminDashboard.module.css";
import { formatJSDate } from "../../../shared/utils/convertTimestamp";
import {
    createObjectURL,
    revokeObjectURL,
} from "../../../shared/utils/useLocalImages";
import {
    titleValidation,
    numberValidation,
} from "../../../shared/utils/validateForms";
import slugify from "../../../shared/utils/slugify";
import Button from "../../../components/Button/Button";

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
    const [originalProduct, setOriginalProduct] = useState();
    const [categories, setCategories] = useState();
    const [tags, setTags] = useState();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedProductsWindow, setRelatedProductsWindow] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    // const [allProductsFetched, setAllProductsFetched] = useState(false);

    const [errors, setErrors] = useState({});

    //researches
    const [categoryMatchResults, setCategoryMatchResults] = useState();
    const [tagMatchResults, setTagMatchResults] = useState();

    // questi state servono per poter fare update di input value da altre funzioni
    const [newCategoryInput, setNewCategoryInput] = useState("");
    const [newTagInput, setNewTagInput] = useState("");

    //images
    const [newImages, setNewImages] = useState([]); //nuove immagini da aggiungere onSubmit
    const [deletedImages, setDeletedImages] = useState([]); //immagini gia in db e S3 da eliminare onSubmit

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`/api/product/${slug}`);
            setProduct(data);
            setOriginalProduct(data);
            setRelatedProducts(
                data.related_products
                    ? data.related_products.map((el) => ({
                          name: el.name,
                          id: el.id,
                      }))
                    : []
            ); //map ricostruisce data per state
        } catch (err) {
            enqueueSnackbar(getError(err), { variant: "error" });
        }
    };

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
            // filter elimina la copia dell obj in array
            // setAllProductsFetched(true); //settiamo questa flag perché non serve fare questo fetch on render,e anche per evitare di ripeterlo in caso
            setAllProducts(finalData);
            return finalData; //torno data che serve in handleBlur, essendo setAllProducts async
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
        fetchProduct();
        fetchCategories();
    }, []);

    //quando apro related products window faccio fetch di tutti i prodotti
    useEffect(() => {
        if (relatedProductsWindow) {
            fetchAllProducts();
        }
    }, [relatedProductsWindow]);

    // rimuovo elemento corrispondente a i da array corrispondente in product
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

    // validazione valori di input quando si toglie focus e gestione errori
    const handleBlur = async (e) => {
        //estraggo valori
        const { id, name, value } = e.target;
        //creo nuovo oggetto ogni volta per rimuovere errori precedenti
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
                    });
                }
            });
        }
        if (id === "Price") {
            const resp = numberValidation("Prezzo", value);
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

        /*
        Name; 👍
        Brand; 🐸
        Slug; 👍
        Price; 👍
        Stock; 👍
        Conditions; 🐸
        Description; 🐸
        Infos; 🐸
        Category; 🐸
        CategoryNew; 🐸
        Tag; 🐸
        TagNew; 🐸
        FileID; 🐸
        RelatedProduct; 🐸
        RelatedProduct2; 🐸
        */
        // come gestire singoli errori sui vari newInputs per tags e categories ?
    };

    // settare state per matchResults = null -> questo fa chiudere la box relativa in DOM
    // notare che quando attivo fn con onBlur applico un timeout brevissimo, perché devo poter attivare onClick in caso seleziono opzione
    // non si attiverebbe mai altrimenti perché il focus nel browser sarebbe nullo e click non avverrebbe mai
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

    // quando user clicca e/o modifica input riceve una array con le opzioni filtrare, se ci sono, quando input é vuoto le riceve tutte
    const handleInputHints = (e) => {
        // estraggo e setto tutti i valori che servono
        const { id, value } = e.target;
        const inputVal = e.target.value.toLowerCase();
        let matchResults = [];
        let source;
        let propFlag;

        // setto quale array filtrare e setto i valori di uncontrolled inputs
        if (id === "CategoryNew") {
            setNewCategoryInput(value); // non inputValue perché lowerCase
            source = categories;
            propFlag = "categories";
        } else if (id === "TagNew") {
            setNewTagInput(value);
            source = tags;
            propFlag = "tags";
        }

        // filtro source array
        for (var i = 0; i < source.length; i++) {
            // finché el corrisponde a inputVal && se el non é gia in product.tag o cat
            // pushalo in matchResult fino a max 5 risultati
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

        // salvo matchResults in state per usarlo in result box in dom per fare map
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

    const preDeleteImages = (img) => {
        if (
            product.images.filter((e) => e.location === img.location).length > 0
        ) {
            // se img é in obj originale allora salvo valore in deletedImages e aggiorno state senza img
            setDeletedImages([...deletedImages, img.key]);
            const newArr = product.images.filter((el) => img.key !== el.key);
            setProduct({
                ...product,
                images: newArr,
            });
        } else if (
            newImages.filter((e) => e.location === img.location).length > 0
        ) {
            // se img é in newImages, allora elimino img da newImages e revokeObjectURL
            const newArr = newImages.filter((el) => img.key !== el.key);
            setNewImages(newArr);
            revokeObjectURL(img.location);
        }
        // uso deletedImages solo dopo submit per eliminarle da S3 e da db
        // uso newImages solo dopo submit per aggiungerle a S3 e da db
    };

    // faccio upload di immagini selezionate in file input
    const uploadImages = (obj) => {
        // S3, aws-sdk, multer ???
        // resize image e max size
        // verficare tipo di file ? solo jpg e png
        // se dopo premo annulla modifiche immagine/i devono essere eliminate anche da bucket

        return axios.post("/api/product/upload-pic", obj, {
            headers: { authorization: `Bearer ${userInfo.token}` },
        });
    };

    //nuova versione di deleteImage da testare
    // elimino immagini che passo in keys [array]
    const deleteImages = () => {
        const newImagesQuery = product.images.filter(
            (i) => !deletedImages.includes(i.key)
        );
        return axios.post(
            "/api/product/delete-pic",
            {
                keys: deletedImages,
                id: product.id,
                newImages: newImagesQuery,
            },
            {
                headers: { authorization: `Bearer ${userInfo.token}` },
            }
        );
    };

    const updateProduct = async (obj, uploadResponse) => {
        //devo prendere info da state e da responses di S3
        //passarle a ruote per fare update (PUT) in products table
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

        return axios.put(
            `/api/product/update`,
            {
                ...obj,
                images: [...obj.images, ...uploadedImages],
                related_products: obj.related_products
                    ? obj.related_products.map((el) => el.id)
                    : null,
            },
            {
                headers: { authorization: `Bearer ${userInfo.token}` },
            }
        ); // credo che non sto passando correttamente related_products
        // devo passare lo state in relatedProducts (che é quello che devo mostrare in DOM), non quello di product
    };

    // const deleteProductFromDB = (id) => {
    //     return axios.post(`/api/product/delete`, id, {
    //         headers: { authorization: `Bearer ${userInfo.token}` },
    //     });
    // };

    // quando user clicca conferma e non ci sono errori allora facciamo post request per update
    // modifico product in db e modifico S3 bucket
    const confirmChanges = async (e) => {
        //questa funzione passa a db oggetto finale
        //setProduct(response)
        //assicurarmi che qualsiasi immagine eliminata non sia piu presente su S3
        //devo avere su S3 qualsiasi nuova immagine caricata

        e.preventDefault(); //mi serve per poter fare redirect? se no refresh on submit
        closeSnackbar();

        if (Object.keys(errors).length === 0) {
            // const file = e.target.files[0];
            const formData = new FormData();
            newImages.forEach((file) => {
                formData.append("arrOfFiles", file.file);
            });

            var results = {}; //Accumulate Results in One Object -> to use them down the chain
            uploadImages(formData).then(({ data }) => {
                results.result1 = data;
                deleteImages().then(({ data }) => {
                    results.result2 = data;
                    updateProduct(
                        { ...product, related_products: relatedProducts },
                        results.result1
                    )
                        .then(({ data }) => {
                            console.log("results!", results);
                            console.log("res!", data);
                            enqueueSnackbar(data.message, {
                                variant: "success",
                            });
                            setProduct(data.product);
                            router.push(data.product.slug); // non é completo?
                        })
                        .catch((err) =>
                            enqueueSnackbar(getError(err), {
                                variant: "error",
                            })
                        );
                });
            });
        } else {
            console.log("INVALID INPUTS", errors);
            // how to map object values, instead of array
            Object.values(errors).map((err) =>
                enqueueSnackbar(err, {
                    variant: "error",
                })
            );
            return;
        }

        /*
        check no errors
            upload s3
            delete s3
            update db item
            redirect client a slug
            */
    };

    // annullo tutte le modifiche e ripristino product originale
    const discardChanges = async () => {
        // questa funzione passa a db oggetto originale -> forse non serve
        // setProduct(response)
        //devo ripristinare qualsiasi immagine eliminata (come faccio con S3? non devo eliminare niente fino a premere conferma)
        //devo eliminare da S3 qualsiasi nuova immagine caricata
        //NB: se user chiude window o torna indietro senza premere annulla le immagini restano in S3 ma non vengono aggiunte a product in db -> risolvere

        console.log("originalProduct: ", originalProduct);
        setNewCategoryInput("");
        setNewTagInput("");
        setNewImages([]);
        setDeletedImages([]);
        setProduct(originalProduct);
        setRelatedProducts(
            originalProduct.related_products
                ? originalProduct.related_products.map((el) => ({
                      name: el.name,
                      id: el.id,
                  }))
                : []
        );
        //eliminare new pictures da S3
    };

    //elimino prodotto da db e reindirizzo a admin/prodotti
    const deleteProduct = async () => {
        console.log("product.id:", product.id);
        axios
            .post(
                `/api/product/delete`,
                { id: product.id },
                {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                }
            )
            .then(({ data }) => {
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
    };

    console.log("product: ", product);
    console.log("newImages: ", newImages);
    console.log("relatedProducts: ", relatedProducts);

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
                <title>Modifica prodotto - Admin Dashboard</title>
                <meta
                    property="og:title"
                    content={`$Modifica prodotto - Admin Dashboard`}
                />
                <meta property="og:type" content="article" />
            </Head>
            <div
                id={styles["AdminComponent"]}
                className={styles["dashboard-sub-component"]}
            >
                <Link href={`/admin/prodotti`}>
                    <a>
                        <h5 className={styles["filter-form-small-btn"]}>
                            🠔 Torna indietro
                        </h5>
                    </a>
                </Link>
                <form onSubmit={(e) => confirmChanges(e)}>
                    <h4 className={styles["filter-form-col-left"]}>ID:</h4>
                    <span className={styles["filter-form-col-right"]}>
                        #{product.id}
                    </span>
                    <h4 className={styles["filter-form-col-left"]}>
                        Creato il:
                    </h4>
                    <span className={styles["filter-form-col-right"]}>
                        {formatJSDate(product.created_at)}
                    </span>
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
                            value={product.price}
                            step="0.01"
                            className={styles["filter-form-input-price"]}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    price: Number(e.target.value),
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
                            value={product.count_in_stock}
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
                            defaultValue={product.condition}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    condition: e.target.value,
                                })
                            }
                        >
                            <option value={"used"}>Usato</option>
                            <option value={"new"}>Come nuovo</option>
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
                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Maggiori informazioni</h4>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <textarea
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
                            <div className={styles["input-and-btn-wrap"]}>
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
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    X
                                </div>
                            </div>
                        </div>
                    ))}
                    {product.categories.length < 3 && (
                        <div className={styles["filter-form-col-right"]}>
                            <div className={styles["input-and-btn-wrap"]}>
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
                                    style={{
                                        fontSize: "25px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    +
                                </div>
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
                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <h4>Tags</h4>
                        </label>
                    </div>
                    {product.tags.map((tag, i) => (
                        <div
                            className={styles["filter-form-col-right"]}
                            key={tag}
                        >
                            <div className={styles["input-and-btn-wrap"]}>
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
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    X
                                </div>
                            </div>
                        </div>
                    ))}
                    {product.tags.length < 8 && (
                        <div className={styles["filter-form-col-right"]}>
                            <div className={styles["input-and-btn-wrap"]}>
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
                                    onClick={() =>
                                        handleAddInputToArray("TagNew")
                                    }
                                    className={styles["form-input-sub-btn"]}
                                    style={{
                                        fontSize: "25px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    +
                                </div>
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
                            {product.images.map((el, i) => (
                                <div key={el.key}>
                                    <Image
                                        src={el.location}
                                        alt={`Foto ${i}`}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <span
                                        className={styles["admin-delete-image"]}
                                        onClick={() => preDeleteImages(el)}
                                    >
                                        X
                                    </span>
                                </div>
                            ))}

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
                                            onClick={() => preDeleteImages(el)}
                                        >
                                            X
                                        </span>
                                    </div>
                                ))}
                        </div>

                        {product.images.length + newImages.length < 5 && (
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
                                        <div
                                            className={
                                                styles["input-and-btn-wrap"]
                                            }
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
                                .map((el) => (
                                    <div
                                        className={
                                            styles["filter-form-col-right"]
                                        }
                                        key={el.id}
                                    >
                                        <div
                                            className={
                                                styles["input-and-btn-wrap"]
                                            }
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
                                    </div>
                                ))}
                        </>
                    )}
                    <div
                        className={`${styles["filter-form-col-full"]} ${styles["buttons-box"]}`}
                    >
                        <Button text="Conferma modifiche" type="submit" />
                        <Button
                            text="Annulla modifiche"
                            type="function"
                            fn={() => discardChanges()}
                        />
                        <Button
                            text="Elimina prodotto"
                            type="function"
                            fn={() => deleteProduct()}
                        />
                    </div>
                </form>

                <p>
                    È consigliabile modificare il prodotto oppure impostare la
                    quantità a 0 per rimuoverlo dal negozio, eliminare solo se
                    strettamente necessario e se il prodotto non è mai stato
                    acquistato
                </p>
            </div>
        </>
    );
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
} //serve per poter accedere a slug di url in backend, altrimenti undefined

export default dynamic(() => Promise.resolve(AdminItem), { ssr: false });

// descrizione e infos devono essere textarea
// fare fn aggiungi/rimuovi immagine
// aggiungere validation per ogni field + required values
// buttons non fanno nulla se non ci sono state modifiche ?
// aggiungere button per annulla modifiche (refresh pagina)

// una volta completate le modifiche con conferma si fa la post req

/*
mostrare slug attuale
user puo eliminarlo, allora si inserisce slug automatico, come su crea
user puo modificarlo, allora si modifica slug, dopo validation
*/
