import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { savePaymentMethod } from "@/redux/slices/cartSlice";
import OrderReview from "./OrderReview";
import { getError } from "@/utils/error";
import axios from "axios";

export default function PaymentForm({
    userInfo,
    cartItems,
    shippingAddress,
    paymentMethod,
    nextStep,
    backStep,
}) {
    // console.log("shippingAddress: ", shippingAddress);
    // console.log("paymentMethod: ", paymentMethod);
    // console.log("cartItems: ", cartItems);
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    const dispatch = useDispatch();

    const { shippingOption } = shippingAddress;
    const [state, setState] = useState("PayPal");
    const [loading, setLoading] = useState(false);
    const [cartData, setCartData] = useState();

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
        if (paymentMethod) {
            setState(paymentMethod);
        }
    }, []);

    useEffect(() => {
        fetchCart(cartItems);
    }, [cartItems]);

    const handleChange = (e) => {
        e.preventDefault();
        // setState(newState);
        dispatch(savePaymentMethod(e.target.value));
    };

    //================================================================================
    // API Req
    //================================================================================
    const fetchCart = async (cartItems) => {
        try {
            const { data } = await axios.post(`/api/get/cart/`, cartItems);
            console.log("cartData: ", data.cart);
            setCartData(data.cart);
            if (data.changes) {
                dispatch(updateCart(data.cart));
                alert(
                    "Uno o piú prodotti del tuo carrello sono stati acquistati da un altro utente. Il tuo carrello é stato aggiornato."
                ); // 🧠 testare
            }
        } catch (err) {
            alert(getError(err));
        }
    };

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
            <form className={styles.form}>
                <h2>Metodo di pagamento</h2>

                <OrderReview
                    cartItems={cartData}
                    totalPrice={total_price}
                    itemsPrice={items_price}
                    taxPrice={tax_price}
                    shippingPrice={shipping_price}
                />

                <h3>Scegli come pagare il tuo ordine</h3>

                <select
                    className={styles["payment-mode"]}
                    onChange={(e) => handleChange(e)}
                    value={paymentMethod}
                >
                    <option value="PayPal">Paypal</option>
                    <option value="Carta di credito">Carta di credito</option>
                    {/* <option value="test">Test</option> */}
                </select>

                {paymentMethod === "PayPal" && <p>{paymentMethod}</p>}

                {paymentMethod === "Carta di credito" && <p>{paymentMethod}</p>}
            </form>
        </div>
    );
}
