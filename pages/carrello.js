import { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import {
    selectCartState,
    addToCart,
    removeFromCart,
    emptyCart,
} from "@/redux/slices/cartSlice";
import { checkItemStock } from "@/utils/custom/handlers";
import { getError } from "@/utils/error";
import Link from "next/link";
import styles from "@/styles/Shop.module.css";

// import {
// cartAddItem,
// cartRemoveItem,
// cartClear,
// } from "../redux/Cart/cart.actions";
// const selectCart = (state) => state.cart.cart;

function Cart() {
    const dispatch = useDispatch();
    let { cart } = useSelector(selectCartState, shallowEqual);

    const EmptyCart = () => (
        <>
            <p>Nessun prodotto nel tuo carrello</p>
            <Link href={"/negozio"} className="button">
                Torna al negozio
            </Link>
        </>
    );

    const FilledCart = () => (
        <div className={styles.cartGridWrap}>
            <div className={styles.tableHead}>
                <h4>Articolo</h4>
                <h4>Quantitá</h4>
                <h4>Prezzo</h4>
                <h4>Azioni</h4>
            </div>
            <div className={styles.cartItems}>
                {cart.map((item) => (
                    <div className={styles.cartItem} key={item.id}>
                        {/* <CartItem item={item} styles={styles} /> */}
                        <p>{item.name}</p>
                        <p>{item.quantity}</p>
                        <p>€ {item.price}</p>
                        <span>❌</span>
                    </div>
                ))}
            </div>
            <div className={styles.tableFoot}>
                <h3>Totale: € {}</h3>
                <button
                    className="button"
                    onClick={() => dispatch(emptyCart())}
                >
                    Svuota carrello
                </button>
                <button className="button">Alla cassa: € {}</button>
            </div>
        </div>
    );

    if (!cart) return <p>Loading...</p>;

    return (
        <main id={styles["Cart"]}>
            <Head>
                <title>Il tuo carrello • Da Mamy a Mamy</title>
                <meta
                    property="og:title"
                    content="Il tuo carrello • Da Mamy a Mamy"
                />
                <meta property="og:type" content="website" />
            </Head>

            <section>
                <h1>Il tuo carrello</h1>

                {!cart.length ? <EmptyCart /> : <FilledCart />}
            </section>
        </main>
    );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
