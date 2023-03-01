import { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";
// import styles from "../components/Cart/style/Cart.module.css";

// import {
// cartAddItem,
// cartRemoveItem,
// cartClear,
// } from "../redux/Cart/cart.actions";
// const selectCart = (state) => state.cart.cart;

function Cart() {
    const dispatch = useDispatch();

    const EmptyCart = () => {};
    const FilledCart = () => {};

    if (!cart) return <p>Loading...</p>;

    return (
        <div id={styles["cart-comp"]}>
            <Head>
                <title>Carrello - Da Mamy a Mamy</title>
                <meta property="og:title" content="Carrello - Da Mamy a Mamy" />
                <meta property="og:type" content="website" />
            </Head>

            <div className={styles["cart-comp-wrapper"]}>
                <h2>Il tuo carrello</h2>

                {!cart.length ? <EmptyCart /> : <FilledCart />}
            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
