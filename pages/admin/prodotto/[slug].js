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

import styles from "../../../components/AdminDashboard/style/AdminDashboard.module.css";
import { formatJSDate } from "../../../shared/utils/convertTimestamp";

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
    const [categories, setCategories] = useState();
    const [tags, setTags] = useState();

    const [errors, setErrors] = useState({});
    const [categoryMatchResults, setCategoryMatchResults] = useState();
    const [tagMatchResults, setTagMatchResults] = useState();

    // questi state servono per poter fare update di input value da altre funzioni
    const [newCategoryInput, setNewCategoryInput] = useState("");
    const [newTagInput, setNewTagInput] = useState("");

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`/api/product/${slug}`);
            setProduct(data);
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

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        fetchProduct();
        fetchCategories();
    }, []);

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
    const handleBlur = (e) => {
        //estraggo valori
        const { id, name, value } = e.target;
        //creo nuovo oggetto ogni volta per rimuovere errori precedenti
        let newErrObj = { ...errors };

        //validate values
        if (id === "Name") {
            const resp = nameValidation("Name", value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        // continuare ...

        // come gestire singoli errori sui vari newInputs per tags e categories ?
    };

    // quando user clicca conferma e non ci sono errori allora facciamo post request per update
    const handleSubmit = async () => {};

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

    // qui é dove faccio i check ed aggiungo l'immagine a S3 bucket
    //modifico anche component state per mostrare nuova img
    // in attesa di conferma per modificare db item o scartare le modifiche
    const preUploadImage = async (e) => {
        closeSnackbar();

        // console.log("imageToUpload: ", imageToUpload);
        // const { name, type, size } = imageToUpload;
        // const file = { name, type, size, path: "" };
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        axios
            .post("/api/product/upload-pic", formData)
            .then(({ data }) => {
                console.log("preUploadImage data: ", data);

                setProduct({
                    ...product,
                    images: [
                        ...product.images,
                        { location: data.Location, key: data.Key },
                    ],
                });

                // aggiungere data.Key e Location ad un array contenente tutte le img caricate
                // es: [{Key: "smth", Location: "smth"}, {}, ...]

                // Key mi serve per poter eliminare immagini
                // quindi dovró salvarla in database, cambiando type in json, non piu array

                // Location mi serve per mostrare le immagini in DOM
            })
            .catch((err) => {
                enqueueSnackbar(getError(err), { variant: "error" });
            });
    };

    // faccio upload di immagine selezionata in file input
    const uploadImage = async () => {
        // S3, aws-sdk, multer ???
        // resize image e max size
        // verficare tipo di file ? solo jpg e png
        // se dopo premo annulla modifiche immagine/i devono essere eliminate anche da bucket
    };

    // elimino immagini che passo in keys [array]
    const deleteImage = async (keys) => {
        // devo gestire se immagine é presente solo in state local
        // o se é giá presente in db#
        // oltre al fatto che non deve essere eliminata se user non conferma modifiche
        //..
        // potrei salvare state originale di item
        // per avere un fn che aggiorni db con nuovo state o item originale
        // se viene premuto conferma o se non viene premuto
        // le immagini gia caricate non verrano mai aggiunte a db senza conferma, e verranno eliminate anche da S3
        // posso invocare questa fn oppure esiste una specie di timeout ?

        closeSnackbar();

        // creiamo la nuova array da passare a db, senza le immagini da eliminare
        // la creiamo qua invece che in query (+ complicato)
        const newImages = product.images.filter((i) => !keys.includes(i.key));

        axios
            .post("/api/product/delete-pic", {
                keys,
                id: product.id,
                newImages,
            })
            .then(({ data }) => {
                setProduct({
                    ...product,
                    images: data,
                });
            })
            .catch((err) => {
                enqueueSnackbar(getError(err), { variant: "error" });
            });
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
            <div className={styles["dashboard-sub-component"]}>
                <Link href={`/admin/prodotti`}>
                    <a>
                        <h5>Torna indietro</h5>
                    </a>
                </Link>
                <form>
                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>ID: #{product.id}</span>
                        </label>
                    </div>
                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>
                                Creato il il: {formatJSDate(product.created_at)}
                            </span>
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
                                    price: Number(e.target.value),
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

                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>Condizioni</span>
                        </label>
                    </div>
                    <div className={"filter-form-col-right"}>
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
                            <option value={"new"}>Nuovo</option>
                            <option value={"used"}>Usato</option>
                            <option value={"bad"}>Rovinato</option>
                        </select>
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

                    {/* qui cé da vedere come fare a modificare array categories, e come gestire i singoli errori */}
                    <div className={"filter-form-col-left"}>
                        <label>
                            <span>Categorie</span>
                        </label>
                    </div>

                    {product.categories.map((cat, i) => (
                        <div className={"filter-form-col-right"} key={cat}>
                            <input
                                type="text"
                                name={`category ${i + 1}`}
                                id="Category"
                                value={cat}
                                readOnly
                            />
                            <span
                                onClick={() =>
                                    handleRemoveSelectedInput({
                                        field: "categories",
                                        i,
                                    })
                                }
                            >
                                X
                            </span>
                        </div>
                    ))}
                    {product.categories.length < 3 && (
                        <div className={"filter-form-col-right"}>
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
                            <span
                                onClick={() =>
                                    handleAddInputToArray("CategoryNew")
                                } // aggiorno array in product e svuoto hint box
                            >
                                V
                            </span>

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

                            {errors.tags && (
                                <div className={"form-error"}>
                                    {errors.tags}
                                </div>
                            )}
                        </div>
                    )}

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <span>Tags</span>
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
                            <span
                                onClick={() =>
                                    handleRemoveSelectedInput({
                                        field: "tags",
                                        i,
                                    })
                                }
                            >
                                X
                            </span>
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
                            <span
                                onClick={() => handleAddInputToArray("TagNew")}
                            >
                                V
                            </span>

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

                    {/* tutta questa parte va stilizzata come resto di form (labels, layout, ecc) */}
                    <div className={styles["admin-product-images"]}>
                        <span>Immagini</span>
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
                                        onClick={() => deleteImage([el.key])}
                                    >
                                        X
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* mostrare solo se immagini sono meno di 5 */}
                    <div>
                        <input
                            id="FileID"
                            type="file"
                            name="filename"
                            accept="image/png, image/jpeg"
                            onChange={(e) => preUploadImage(e)}
                        />
                    </div>

                    <button type="button" onClick={() => discardChanges()}>
                        Annulla modifiche
                    </button>
                    <button type="submit">Conferma modifiche</button>
                </form>

                <br />
                <br />
                <h2>rimane da fare</h2>
                <br />
                <p>lista immagini e upload bucket?</p>
                <p>select related products</p>
                <p>validation</p>
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
