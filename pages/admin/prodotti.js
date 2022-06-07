import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import styles from "../../components/AdminDashboard/style/AdminDashboard.module.css";
import { getError } from "../../shared/utils/error";
import { formatDateShort } from "../../shared/utils/convertTimestamp";
import Button from "../../components/Button/Button";
import useWindowDimensions from "../../shared/utils/useWindowDimensions";

const loggedUser = (state) => state.user.userInfo;

function AdminShop() {
    let userInfo = useSelector(loggedUser, shallowEqual);
    const router = useRouter();
    const { width } = useWindowDimensions();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [allProducts, setAllProducts] = useState([]);
    const [filters, setFilters] = useState({
        research: "",
        order: "date disc",
    });
    const [fetchedProducts, setFetchedProducts] = useState("in stock");
    const [displayedProducts, setDisplayedProducts] = useState([]);

    // function createMarkup(str) {
    //     return { __html: str };
    // }

    const fetchAvailableData = async () => {
        try {
            const { data } = await axios.get(`/api/admin/products`, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`,
                    all: false,
                    stock: true,
                },
            });
            setAllProducts(data);
            // setDisplayedProducts(data);
        } catch (err) {
            enqueueSnackbar(getError(err), { variant: "error" });
        }
    };
    const fetchOutOfStockData = async () => {
        try {
            const { data } = await axios.get(`/api/admin/products`, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`,
                    all: false,
                    stock: false,
                },
            });
            setAllProducts(data);
            // setDisplayedProducts(data);
        } catch (err) {
            enqueueSnackbar(getError(err), { variant: "error" });
        }
    };
    const fetchAllData = async () => {
        try {
            const { data } = await axios.get(`/api/admin/products`, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`,
                    all: true,
                },
            });
            setAllProducts(data);
            // setDisplayedProducts(data);
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
        fetchAvailableData();
    }, []);
    useEffect(() => {
        fetchedProducts === "in stock" && fetchAvailableData();
        fetchedProducts === "not in stock" && fetchOutOfStockData();
        fetchedProducts === "all" && fetchAllData();
    }, [fetchedProducts]);

    useEffect(() => {
        let source = allProducts;
        let matchResults = [];

        if (filters.research === "") {
            matchResults = allProducts;
        } else {
            source.filter((product) => {
                if (
                    product.name.toLowerCase().indexOf(filters.research) ===
                        0 ||
                    (product.categories &&
                        product.categories.some((el) =>
                            el.toLowerCase().includes(filters.research)
                        )) ||
                    (product.tags &&
                        product.tags.some((el) =>
                            el.toLowerCase().includes(filters.research)
                        )) ||
                    (product.brand &&
                        product.brand.toLowerCase().includes(filters.research))
                ) {
                    matchResults.push(product);
                }
            });
        }

        filters.order === "date asc" &&
            matchResults.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );

        filters.order === "date disc" &&
            matchResults.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );

        filters.order === "name asc" &&
            matchResults.sort((a, b) => (a.name < b.name ? -1 : 1));

        filters.order === "name disc" &&
            matchResults.sort((a, b) => (a.name > b.name ? -1 : 1));

        filters.order === "price asc" &&
            matchResults.sort((a, b) =>
                Number(a.price) > Number(b.price) ? 1 : -1
            );

        filters.order === "price disc" &&
            matchResults.sort((a, b) =>
                Number(b.price) > Number(a.price) ? 1 : -1
            );

        setDisplayedProducts([...matchResults]); //React doesnt reconize it as a new Array, spread solves that
    }, [filters, allProducts]);

    const handleDisplay = (e) => {
        e.preventDefault();
        closeSnackbar();
        setFetchedProducts(e.target.value);
    };

    return (
        <div id={styles["AdminComponent"]}>
            <h1 className={styles["heading"]}>Il tuo negozio</h1>

            <div className={styles["buttons-box"]}>
                <Button
                    page="/admin/prodotto/crea"
                    text="Aggiungi prodotto"
                    type="internal"
                />
                <Button
                    page="/admin/dashboard"
                    text="Torna indietro"
                    type="internal"
                />
            </div>

            <div>
                <select
                    defaultValue={"date disc"}
                    onChange={(e) =>
                        setFilters({ ...filters, order: e.target.value })
                    }
                    className={styles["admin-filter"]}
                >
                    <option value={"date disc"}>
                        Data di creazione (recente)
                    </option>
                    <option value={"date asc"}>
                        Data di creazione (passato)
                    </option>
                    <option value={"name asc"}>
                        Ordine alfabetico (ascendente)
                    </option>
                    <option value={"name disc"}>
                        Ordine alfabetico (discendente)
                    </option>
                    <option value={"price asc"}>Prezzo (ascendente)</option>
                    <option value={"price disc"}>Prezzo (discendente)</option>
                </select>
            </div>

            <div>
                <select
                    defaultValue={"in stock"}
                    onChange={(e) => handleDisplay(e)}
                    className={styles["admin-filter"]}
                >
                    <option value={"in stock"}>Prodotti disponibili</option>
                    <option value={"not in stock"}>
                        Prodotti non disponibili
                    </option>
                    <option value={"all"}>Tutti i prodotti</option>
                </select>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Cerca nome, brand, categoria o tag"
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            research: e.target.value.toLowerCase(),
                        })
                    }
                    className={styles["admin-filter"]}
                ></input>
            </div>

            <div className={styles["table"]}>
                <div className={styles["admin-product-head"]}>
                    <h4>Immagine</h4>
                    <h4>Titolo</h4>
                    {width > 950 && (
                        <>
                            <h4>Prezzo</h4>
                            <h4>Brand</h4>
                            <h4>In negozio</h4>
                            <h4>Creato il</h4>
                        </>
                    )}
                    <h4>Azione</h4>
                </div>

                {displayedProducts &&
                    displayedProducts.map((product) => (
                        <div
                            key={product.id}
                            className={styles["admin-product-box"]}
                        >
                            {/* questo deve essere img */}
                            <div>
                                <Image
                                    src={
                                        product.images[0]
                                            ? product.images[0].location
                                            : "/pics/Logo.jpg"
                                    }
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>

                            <p>{product.name}</p>
                            {width > 950 && (
                                <>
                                    <p>{product.price} €</p>
                                    <p>{product.brand}</p>
                                    <p>{product.count_in_stock}</p>
                                    <p>{formatDateShort(product.created_at)}</p>
                                </>
                            )}
                            <Link href={`/admin/prodotto/${product.slug}`}>
                                <a>
                                    <h5 className={styles["go-to-btn"]}>
                                        Visualizza
                                    </h5>
                                </a>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(AdminShop), { ssr: false });
