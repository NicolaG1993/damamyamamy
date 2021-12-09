import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";

import CartItem from "../components/Cart/CartItem/CartItem";
import Button from "../components/Button/Button";

import styles from "../components/Cart/style/Cart.module.css";

// REDUX
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    cartAddItem,
    cartRemoveItem,
    cartClear,
} from "../redux/Cart/cart.actions";
// import { fetchData } from "../redux/ShopData/shopData.actions";
const selectCart = (state) => state.cart.cartItems;
// const loadData = (state) => state.shopData.data;

function Cart() {
    const dispatch = useDispatch();
    let cart = useSelector(selectCart, shallowEqual);
    // let data = useSelector(loadData, shallowEqual);
    // console.log("cart in Cart.js: ", cart);
    // console.log("data in Cart.js: ", data);
    // const [finalCart, setFinalCart] = useState();

    useEffect(() => {
        document.querySelectorAll(".product-box").forEach((el) => {
            el.classList.add("fade-in");
        });
    });

    // useEffect(() => dispatch(fetchData()), []);
    //fetchShop nuovamente (ci serve la versione aggiornata quando arriviamo qua)

    /*
    useEffect(() => {
        // cart.line_items.filter(
        //     ({ product_id: id1 }) => !data.some(({ id: id2 }) => id2 === id1)
        // );

        if (cart && data) {
            let cartIds = cart.line_items.map((item) => item.product_id); //devo usare id? product_id? item_id?
            let shopIds = data.map((item) => item.id);
            // console.log("🎃🎃🎃cartIds in cartIds.js: ", cartIds);
            // console.log("🎃🎃🎃shopIds in Cart.js: ", shopIds);

            // cartIds.filter(
            //     ({ product_id: id1 }) =>
            //         !shopIds.some(({ id: id2 }) => id2 === id1)
            // );
            cartIds.filter(
                (el) =>
                    !shopIds.includes(el) &&
                    cart.line_items.filter(
                        (item) =>
                            item.product_id === el &&
                            dispatch(removeFromCart({ productId: item.id }))
                    )
            );
        }

        //if item_id non é presente in shopIds
        //usiamo l'action per rimuovere quel Item da cart
        // funziona, l'unico problema é che product_id mi serve solo per il filter, ma poi mi serve item_id per API, che non esiste piú quando mi serve

        //altrimenti posso fare un filter su cart appena ho l'id che mi serve, per avere indietro da lí l'altro id per API
    }, [data]);

    //dovró forse usare socket.io ???
    //alla fine mi basterebbe avere un listener ogni 10 secondi su data
    //e se sente qualche cambiamento fa la remove req ad API
    //visto che cart esiste ancora con tutti i dati degli items che non esistono piu in shop
*/

    const updateCartHandler = async (item, quantity) => {
        const res = await axios.get(`/api/product/${item.slug}`);
        console.log("res:", res.data.rows[0]);
        if (res.data.rows[0].countInStock < quantity) {
            window.alert("Sorry, product is out of stock");
            return;
        }
        dispatch(cartAddItem({ ...item, quantity }));
    };
    const removeItemHandler = (item) => {
        dispatch(cartRemoveItem({ item }));
    };

    const EmptyCart = () => (
        <>
            <p>Nessun prodotto nel tuo carrello</p>
            <br />
            <br />
            <Button
                page="/shop"
                text="Vai al negozio"
                type="internal"
                style="inverted-btn"
            />
        </>
    );

    const FilledCart = () => (
        <div className={styles["cart-container"]}>
            <div className={styles["cart-products"]}>
                {cart.map((item) => (
                    <div className={styles["cart-product-box"]} key={item.id}>
                        <CartItem item={item} styles={styles} />
                    </div>
                ))}
            </div>
            <div className={styles["cart-interact"]}>
                <div className={styles["cart-total"]}>
                    <span></span>
                    <h3>
                        Totale: <br />
                        {cart.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </h3>
                    <p>{cart.reduce((a, c) => a + c.quantity, 0)} articoli</p>
                </div>

                <span></span>

                <div className={styles["cart-btns"]}>
                    <Button
                        text="Svuota il carrello"
                        type="function"
                        fn={() => dispatch(cartClear())}
                        style="inverted-btn"
                    />
                    <Button
                        page="/checkout"
                        text="Vai alla cassa"
                        type="internal"
                        style="inverted-btn"
                    />
                </div>
            </div>
        </div>
    );

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
