import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
// import { Link, useHistory } from "react-router-dom";
import AddressForm from "../components/Checkout/steps/AddressForm";
import PaymentForm from "../components/Checkout/steps/PaymentForm";
import Button from "../components/Button/Button";
import { commerce } from "../shared/libs/commerce";
import styles from "../components/Checkout/style/Checkout.module.css";

// REDUX
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    emptyCart,
    refreshCart,
    checkCart,
    removeFromCart,
    saveShippingAddress,
} from "../redux/Cart/cart.actions";
import {
    loadCheckout,
    captureCheckout,
    authorizePP,
} from "../redux/Checkout/checkout.actions";
import Cookies from "js-cookie";
const selectCart = (state) => state.cart.cartItems;
const userAddress = (state) => state.cart.shippingAddress;
const loggedUser = (state) => state.user.userInfo;
// const selectOrder = (state) => state.checkout.order;
// const selectError = (state) => state.checkout.error;

const steps = ["Shipping address", "Payment details"];

export default function Checkout() {
    const router = useRouter();
    const { redirect } = router.query;
    const dispatch = useDispatch();

    //STATE
    let cart = useSelector(selectCart, shallowEqual);
    let shippingAddress = useSelector(userAddress, shallowEqual);
    let userInfo = useSelector(loggedUser, shallowEqual);

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (!userInfo) {
            router.push("/login?redirect=/checkout");
        }
        console.log("shippingAddress", shippingAddress);
    }, []);

    //STEPS FUNCTIONS
    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }; // !!in react, if u want to use the previous state, u need to call it as a callback fn
    const next = (data) => {
        // setShippingData(data);
        console.log("next data: ", data);
        console.log("next cart: ", cart);
        dispatch(saveShippingAddress(data));
        Cookies.set("shippingAddress", JSON.stringify(data));
        nextStep();
    };

    const ProgressBar = () => (
        <ul className={styles["progressbar"]}>
            <li className={styles["active"]}>Indirizzo</li>
            <li className={`${activeStep > 0 ? styles["active"] : ""}`}>
                Metodo di pagamento
            </li>
        </ul>
    );

    const Forms = () =>
        activeStep === 0 ? (
            <AddressForm
                next={next}
                shippingAddress={shippingAddress}
                styles={styles}
            />
        ) : (
            <PaymentForm
                // checkoutToken={checkoutToken}
                shippingAddress={shippingAddress}
                // activeStep={activeStep}
                nextStep={nextStep}
                backStep={backStep}
                // onCaptureCheckout={handleCaptureCheckout}
                // timeout={timeout}
                styles={styles}
            />
        );

    let Confirmation = () => <div>Confirmation ...</div>;

    return (
        <div id={styles["Checkout"]}>
            <Head>
                <title>Checkout - Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Checkout - Da Mamy a Mamy" />
            </Head>
            <div className={styles["checkout-wrap"]}>
                <div className={styles["checkout-title"]}>
                    <h1>Checkout</h1>
                </div>

                <div className={styles["progressbar-wrap"]}>
                    <ProgressBar />
                </div>

                {activeStep === steps.length ? <Confirmation /> : <Forms />}
            </div>
        </div>
    );

    /////////////////////////

    /*
    let order = useSelector(selectOrder, shallowEqual);
    let error = useSelector(selectError, shallowEqual);
    console.log("cart in Checkout.js: ", cart);
    console.log("order in Checkout.js: ", order);
    console.log("error in Checkout.js: ", error);

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    // const history = useHistory();
    const [isFinished, setIsFinished] = useState(false); //this is only for test#

    const dispatch = useDispatch();
    useEffect(() => dispatch(loadCheckout()), []);

    //STEPS FUNCTIONS
    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }; // !!in react, if u want to use the previous state, u need to call it as a callback fn
    const next = (data) => {
        setShippingData(data);
        nextStep();
        // console.log("shippingData: ", shippingData);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        console.log("handleCaptureCheckout activated! 🎅🎅🎅", newOrder);
        if (checkoutTokenId === "test") {
            //this is only for test
            dispatch(emptyCart());
        } else {
            dispatch(
                captureCheckout({
                    checkoutTokenId: checkoutTokenId,
                    newOrder: newOrder,
                })
            );
        }
    };
    //quando abbiamo un ordine allora facciamo il refresh
    useEffect(() => order && dispatch(refreshCart()), [order]);

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateTokenFrom(
                    "cart",
                    cart.id
                );
                // console.log("token: ", token);
                setCheckoutToken(token);
            } catch (err) {
                if (activeStep !== steps.length) Router.push("/");
                // this fix the bug: if refresh page in checkout the cart will be empty
                // console.log("error: ", err);
            }
        };
        activeStep === 0 && generateToken();
    }, [cart]);

    const checkAvailability = () => {
        cart.line_items.map((item) => {
            commerce.checkout
                .checkQuantity(checkoutToken.id, item.id, {
                    amount: item.quantity,
                })
                .then((response) => {
                    console.log("🐲 checkAvailability", response);
                    if (response.available) {
                        console.log("🐲 response.available is true!", item.id);
                    } else {
                        console.log("🐲 response.available is false!", item.id);
                        dispatch(
                            removeFromCart({
                                productId: item.id,
                            })
                        );
                    }
                });

            // dispatch(
            //     checkCart({
            //         checkoutTokenId: checkoutToken.id,
            //         lineItemId: item.id,
            //         requestedQuantity: item.quantity,
            //     })
            // );
        });
    };
    //non funziona! dovrebbe eliminare un prodotto dal carrello se non é disponibile
    //invece elimina tutto se manca qualcosa
    //commerce mi da troppi problemi, creare una API mia?

    useEffect(() => {
        checkoutToken && checkAvailability();
    }, [checkoutToken]);

    // timeout -> mock up the transaction without using card details on stripe
    const timeout = () => {
        console.log("timeout activated!");
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    };

    const ProgressBar = () => (
        <ul className={styles["progressbar"]}>
            <li className={styles["active"]}>Indirizzo</li>
            <li className={`${activeStep > 0 ? styles["active"] : ""}`}>
                Metodo di pagamento
            </li>
        </ul>
    );

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm
                checkoutToken={checkoutToken}
                next={next}
                styles={styles}
            />
        ) : (
            <PaymentForm
                checkoutToken={checkoutToken}
                shippingData={shippingData}
                // activeStep={activeStep}
                nextStep={nextStep}
                backStep={backStep}
                onCaptureCheckout={handleCaptureCheckout}
                timeout={timeout}
                styles={styles}
            />
        );

    let Confirmation = () =>
        order ? (
            <div className={styles["confirmation-wrap"]}>
                <div>
                    <h3>
                        Grazie per il tuo acquisto {order.customer.firstname}{" "}
                        {order.customer.lastname}!
                    </h3>

                    <p>Ordine: {order.customer_reference}</p>
                </div>

                <Button
                    page="/cart"
                    text="Torna al carrello"
                    type="internal"
                    style="inverted-btn"
                />
            </div>
        ) : isFinished ? (
            <div className={styles["confirmation-wrap"]}>
                <div>
                    <h3>
                        Grazie per il tuo acquisto! {shippingData.firstName}{" "}
                        {shippingData.lastName}!
                    </h3>
                </div>
                <br />
                <Button
                    page="/"
                    text="Torna al sito"
                    type="internal"
                    style="inverted-btn"
                />
            </div>
        ) : (
            <div className="loader-inverted"></div>
        );
    //  (after testing) remove the "isFinished" condition and leave only the spinner

    if (error) {
        Confirmation = () => (
            <div className={styles["confirmation-wrap"]}>
                <div>
                    <h3>Errore:</h3>
                    <p>{error.err.data.error.message}</p>
                </div>

                <Button
                    page="/cart"
                    text="Torna al carrello"
                    type="internal"
                    style="inverted-btn"
                />
            </div>
        );
    }

    return (
        <div id={styles["Checkout"]}>
            <Head>
                <title>Checkout - Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Checkout - Da Mamy a Mamy" />
            </Head>
            <div className={styles["checkout-wrap"]}>
                <div className={styles["checkout-title"]}>
                    <h1>Checkout</h1>
                </div>

                <div className={styles["progressbar-wrap"]}>
                    <ProgressBar />
                </div>

                {activeStep === steps.length ? (
                    <Confirmation />
                ) : checkoutToken ? (
                    <Form />
                ) : (
                    <div className="loader-inverted"></div>
                )}
            </div>
        </div>
    );
    */
}
