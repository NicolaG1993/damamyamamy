import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "../../components/AdminDashboard/style/AdminDashboard.module.css";

const loggedUser = (state) => state.user.userInfo;

function AdminShop() {
    let userInfo = useSelector(loggedUser, shallowEqual);
    const router = useRouter();
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/admin/products`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                setAllProducts(data);
            } catch (err) {
                // dispatch({ type: "FETCH_FAIL", payload: getError(err) });
            }
        };
        fetchData();
    }, []);

    console.log("allProducts: ", allProducts);

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
                            <p>{product.id}</p>

                            <p>{product.name}</p>
                            <p>#{product.id}</p>
                            <p>{product.price} €</p>
                            <p>{product.brand}</p>
                            <p>{product.count_in_stock}</p>
                            <p>{product.created_at.toString().split("T")[0]}</p>

                            <Link href="/admin/dashboard">
                                <a>
                                    <button>Visualizza</button>
                                </a>
                            </Link>
                        </div>
                    ))}
            </div>

            <Link href="/admin/dashboard">
                <a>Torna indietro</a>
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
