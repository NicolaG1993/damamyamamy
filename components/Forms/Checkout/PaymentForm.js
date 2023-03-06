import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import {
    savePaymentMethod,
    emptyCart,
    updateCart,
} from "@/redux/slices/cartSlice";
import { getError } from "@/utils/error";
import OrderReview from "./OrderReview";
import styles from "../Form.module.css";

import StripeForm from "./StripeForm";
import PayPalForm from "./PayPalForm";

export default function PaymentForm({
    userInfo,
    cartItems,
    shippingAddress,
    paymentMethod,
    nextStep,
    backStep,
}) {
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    const dispatch = useDispatch();
    const { shippingOption } = shippingAddress;
    const [state, setState] = useState(paymentMethod);
    const [cartData, setCartData] = useState();
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
    const items_price = cartData
        ? round2(cartData.reduce((a, c) => a + c.price * c.quantity, 0))
        : 0;
    let shipping_price = 0;
    if (shippingOption === "Ritiro in negozio") {
        shipping_price = 0;
    } else if (shippingOption === "Spedizione") {
        shipping_price = 0;
    }
    const tax_price = 0;
    const total_price = round2(items_price + shipping_price + tax_price);
    /*
    //SISTEMARE A DOVERE (IVA, tasse, spedizione)
    const items_price = round2(
        cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    );
    const shipping_price = items_price > 200 ? 0 : 15;
    const tax_price = round2(items_price * 0.15);
    const total_price = round2(items_price + shipping_price + tax_price);
    */

    // let items = [];
    // cartItems.map((el) => {
    //     items.push({
    //         item_id: el.id,
    //         name: el.name,
    //         price: el.price,
    //         quantity: el.quantity,
    //         image: el.image,
    //         slug: el.slug,
    //     });
    // });

    //================================================================================
    // Functions
    //================================================================================
    useEffect(() => {
        if (!shippingAddress.address) {
            backStep();
        }
        setState(paymentMethod);
    }, [shippingAddress, paymentMethod]);

    useEffect(() => {
        if (!cartItems) {
            router.push("/carrello");
        }
        fetchCart(cartItems);
    }, [cartItems]);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.value) {
            setState(e.target.value);
            dispatch(savePaymentMethod(e.target.value));
        }
    };

    const acceptTerms = (e) => {
        // e.preventDefault();
        e.persist();
        const checked = e.target.checked;
        checked ? setTermsAccepted(true) : setTermsAccepted(false);
    };

    //================================================================================
    // API Req
    //================================================================================
    const fetchCart = async (arr) => {
        console.log("🔍 fetchCart invoked!", arr);
        if (arr) {
            try {
                const { data } = await axios.post(`/api/get/cart`, arr);
                // console.log("💚 cartData: ", data.cart);
                setCartData(data.cart);
                if (data.changes) {
                    dispatch(updateCart(data.cart));
                    alert(
                        "Uno o piú prodotti del tuo carrello sono stati acquistati da un altro utente. Il tuo carrello é stato aggiornato."
                    ); // 🧠 testare
                    router.push("/carrello");
                }
            } catch (err) {
                alert(getError(err));
            }
        }
    };

    const createOrder = async () => {
        console.log("🔍 createOrder invoked!");
        try {
            setLoading(true);
            await fetchCart(cartData); // check stock prima di creare ordine // devo passare arg come cartItems
            // testare 🧠 l'ordine non deve crearsi, user deve confermare di nuovo prima
            const { data } = await axios.post(
                "/api/checkout/order",
                {
                    user_id: userInfo.id,
                    order_items: cartData,
                    shipping_address: shippingAddress,
                    payment_method: paymentMethod,
                    payment_result: undefined,
                    items_price,
                    shipping_price,
                    tax_price,
                    total_price,
                },
                { headers: { authorization: `Bearer ${userInfo.token}` } }
            );
            setLoading(false);
            console.log("🥶 data:", data);
            return data.id;
        } catch (err) {
            // router.push("/carrello");
            alert(getError(err));
        }
    };

    const updateDB = async (paymentResult, userInfo, newOrderID) => {
        console.log("🔍 updateDB invoked", newOrderID, paymentResult);
        try {
            // const orderID = await createOrder();
            const { data } = await axios.put(
                `/api/checkout/pay/${newOrderID}`,
                paymentResult,
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            dispatch(emptyCart());
            console.log("💚 updateDB response! paySuccess!", data);
            nextStep();
        } catch (err) {
            alert(getError(err));
        }
    };

    //================================================================================
    // Sub-Components
    //================================================================================
    const TermsBox = () => (
        <div className={styles["check-terms"]} id={styles.TermsBox}>
            <input
                type="checkbox"
                name="accept"
                onChange={(e) => acceptTerms(e)}
                checked={termsAccepted}
            />
            <label htmlFor="accept">
                Dichiaro di aver letto e compreso{" "}
                <a
                    href="/documenti/termini"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Termini e Condizioni
                </a>
            </label>
        </div>
    );

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <div className={styles.formWrap}>
            <Link
                href={"/checkout"}
                onClick={() => backStep()}
                className="back-button"
            >
                {"< "}Torna indietro
            </Link>
            <div className={styles.form}>
                <h2>Metodo di pagamento</h2>

                <OrderReview
                    cartItems={cartData}
                    totalPrice={total_price}
                    itemsPrice={items_price}
                    taxPrice={tax_price}
                    shippingPrice={shipping_price}
                />

                {/* <h3>Scegli come pagare il tuo ordine</h3> */}

                <select
                    className={styles["payment-mode"]}
                    onChange={(e) => handleChange(e)}
                    value={state}
                >
                    <option value="PayPal">Paypal</option>
                    <option value="Carta di credito">Carta di credito</option>
                    {/* <option value="test">Test</option> */}
                </select>

                {cartData && paymentMethod === "Carta di credito" && (
                    <StripeForm
                        createOrder={createOrder}
                        updateDB={updateDB}
                        userInfo={userInfo}
                        total_price={total_price}
                        cartItems={cartData}
                        // shipping={shipping_price}
                        loading={loading}
                        termsAccepted={termsAccepted}
                    />
                )}

                <TermsBox />

                {cartData && paymentMethod === "PayPal" && (
                    <PayPalForm
                        createOrder={createOrder}
                        updateDB={updateDB}
                        userInfo={userInfo}
                        total_price={total_price}
                        cartItems={cartData}
                        shipping={shipping_price}
                        loading={loading}
                        termsAccepted={termsAccepted}
                    />
                )}
            </div>
        </div>
    );
}

/*
fetchCart -> createPaymentIntent -> handleSubmit -> createOrder -> payOrder -> updateDB
*/
