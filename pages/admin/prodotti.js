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

const loggedUser = (state) => state.user.userInfo;

function AdminShop() {
    let userInfo = useSelector(loggedUser, shallowEqual);
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [allProducts, setAllProducts] = useState([]);
    const [displayedAll, setDisplayedAll] = useState(false);

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`/api/admin/products`, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`,
                    all: false,
                },
            });
            setAllProducts(data);
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
        } catch (err) {
            enqueueSnackbar(getError(err), { variant: "error" });
        }
    };

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        fetchData();
    }, []);
    useEffect(() => {
        displayedAll ? fetchAllData() : fetchData();
    }, [displayedAll]);

    console.log("allProducts: ", allProducts);
    console.log("displayedAll: ", displayedAll);

    const handleDisplay = async () => {
        closeSnackbar();
        setDisplayedAll(!displayedAll);
    };

    return (
        <div>
            <h1>Il tuo negozio</h1>

            <div>
                <div className={styles["admin-product-head"]}>
                    <h4>Immagine</h4>
                    <h4>Titolo</h4>
                    <h4>ID</h4>
                    <h4>Prezzo</h4>
                    <h4>Brand</h4>
                    <h4>In negozio</h4>
                    <h4>Data creazione</h4>
                    <h4>Azione</h4>
                </div>

                {allProducts &&
                    allProducts.map((product) => (
                        <div
                            key={product.id}
                            className={styles["admin-product-box"]}
                        >
                            {/* questo deve essere img */}
                            <div>
                                <Image
                                    src={product.images[0] || "/pics/Logo.jpg"}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>

                            <p>{product.name}</p>
                            <p>#{product.id}</p>
                            <p>{product.price} €</p>
                            <p>{product.brand}</p>
                            <p>{product.count_in_stock}</p>
                            <p>{formatDateShort(product.created_at)}</p>

                            <Link href={`/admin/prodotto/${product.slug}`}>
                                <a>
                                    <button>Visualizza</button>
                                </a>
                            </Link>
                        </div>
                    ))}
            </div>

            {/* mettere button component */}
            <p onClick={handleDisplay}>Mostra non disponibili</p>

            <Link href="/admin/dashboard">
                <a>
                    <h5>Torna indietro</h5>
                </a>
            </Link>

            <h2>
                qui devo mettere tutti i prodotti e le impostazioni del negozio
            </h2>
            <p>Si deve poter caricare, eliminare e modificare items</p>
            <p>
                Si possono vedere gli articoli gia venduti non piu disponibili
                (in stock = 0)
            </p>
            <p>
                Si puo andare a modificare anche le categorie forse? non so
                ancora come gestirle
            </p>
        </div>
    );
}

export default dynamic(() => Promise.resolve(AdminShop), { ssr: false });
