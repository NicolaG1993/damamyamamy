import { useEffect, useState, useRef } from "react";

import {
    CardElement,
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";

import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../../Button/Button";
import { cartClear, savePaymentMethod } from "../../../redux/Cart/cart.actions";
import { getError } from "../../../shared/utils/error";
import { useRouter } from "next/router";

export default function StripeForm({
    styles,
    backStep,
    nextStep,
    createOrderDB,
    userInfo,
    total_price,
    cartItems,
    email,
    shipping,
    loading,
}) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const [termsAccepted, setTermsAccepted] = useState(false);

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        console.log("COMPONENT RENDERS!");
        console.log("succeeded: ", succeeded);
        closeSnackbar();
        if (!succeeded && total_price > 0) {
            // Create PaymentIntent as soon as the page loads
            axios
                .post(`/api/orders/stripe/create-payment-intent`, {
                    items: cartItems,
                    email: email,
                    shipping: shipping,
                    total_price: total_price,
                })
                .then(({ data }) => {
                    console.log("data: ", data);
                    setClientSecret(data.clientSecret);
                })
                .catch((err) => {
                    enqueueSnackbar(getError(err), { variant: "error" });
                    router.push("/cart");
                });
        }
    }, []); //sembra riattivarsi dopo pagamento ?🧠

    // FORM FUNCTIONS
    const acceptTerms = (e) => {
        // e.preventDefault();
        e.persist();
        const checked = e.target.checked;

        checked ? setTermsAccepted(true) : setTermsAccepted(false);
    };

    // const handleStripeSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!stripe || !elements) return;

    //     if (!termsAccepted) {
    //         enqueueSnackbar(
    //             "Accettare termini e condizioni prima di proseguire",
    //             {
    //                 variant: "error",
    //             }
    //         );
    //         return; // ? non mi serve forse
    //     }
    // };

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                fontFamily: "Arial, sans-serif",
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    }; // non sembra funzionare 🧠

    const handleChange = async (e) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) return;

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            //create db order here ...
            // nextStep();

            console.log("stripe order", payload);

            //devo fare capture anche con stripe?

            createOrderDB().then(async (orderID) => {
                try {
                    const { data } = await axios.put(
                        `/api/orders/${orderID}/pay`,
                        payload.paymentIntent,
                        {
                            headers: {
                                authorization: `Bearer ${userInfo.token}`,
                            },
                        }
                    ); // 🧨 orderId viene da db, se ordine é gia stato creato
                    dispatch(cartClear());
                    Cookies.remove("cartItems");

                    enqueueSnackbar(data.message, {
                        variant: "success",
                    });
                    console.log("🥶 paySuccess", data);
                    nextStep();
                } catch (err) {
                    enqueueSnackbar(getError(err), { variant: "error" });
                    console.log("🥶 payFail:", getError(err));
                }
            });
        }
    };

    // SUB-COMPONENTS
    const TermsBox = () => (
        <div className={styles["check-terms"]}>
            <input
                type="checkbox"
                name="accept"
                onChange={(e) => acceptTerms(e)}
                checked={termsAccepted}
            />
            <label htmlFor="accept">
                Dichiaro di aver letto{" "}
                <a
                    href="/terms-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Termini e Condizioni
                </a>
            </label>
        </div>
    );

    // DOM
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                id="card-element"
                options={cardStyle}
                onChange={handleChange}
            />

            <TermsBox />

            <div className={styles["row2"]}>
                <Button
                    fn={backStep}
                    text="Torna indietro"
                    type="function"
                    style="inverted-btn"
                />

                <button
                    disabled={
                        processing ||
                        disabled ||
                        succeeded ||
                        !termsAccepted ||
                        loading
                    }
                    id="submit"
                    type="submit"
                    className={`${styles["btn"]} ${styles["inverted-btn"]}`}
                >
                    <span id="button-text">
                        {processing ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            `Conferma ${total_price} €`
                        )}
                    </span>
                </button>
            </div>
            {/* Show any error that happens when processing the payment */}
            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}
            {/* Show a success message upon completion */}
            <p
                className={
                    succeeded ? "result-message" : "result-message hidden"
                }
            >
                Payment succeeded, see the result in your
                <a href={`https://dashboard.stripe.com/test/payments`}>
                    {" "}
                    Stripe dashboard.
                </a>{" "}
                Refresh the page to pay again.
            </p>
        </form>
    );
}
