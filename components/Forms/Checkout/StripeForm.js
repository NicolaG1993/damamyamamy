import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { emptyCart } from "@/redux/slices/cartSlice";
import styles from "../Form.module.css";
import { getError } from "@/utils/error";

export default function StripeForm({
    backStep,
    nextStep,
    createOrder,
    userInfo,
    total_price,
    cartItems,
    email,
    shipping,
    loading,
}) {
    //================================================================================
    // Component State
    //================================================================================
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const router = useRouter();

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    //================================================================================
    // Functions
    //================================================================================
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (!succeeded && total_price > 0 && !clientSecret) {
            createPaymentIntent(cartItems, email, shipping, total_price);
        }
    }, []);

    const acceptTerms = (e) => {
        // e.preventDefault();
        e.persist();
        const checked = e.target.checked;
        checked ? setTermsAccepted(true) : setTermsAccepted(false);
    };

    const handleChange = async (e) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        payOrder(userInfo, clientSecret);
    };

    //================================================================================
    // API Req
    //================================================================================
    const createPaymentIntent = async (
        cartItems,
        email,
        shipping,
        total_price
    ) => {
        try {
            const { data } = await axios.post(
                `/api/checkout/stripe/create-payment-intent`,
                {
                    items: cartItems,
                    email: email,
                    shipping: shipping,
                    total_price: total_price,
                }
            );
            setClientSecret(data.clientSecret);
            console.log("data: ", data);
        } catch (error) {
            alert(getError(err));
        }
    };

    const payOrder = async (userInfo, clientSecret) => {
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
            console.log("stripe order", payload);
            updateDB(payload, userInfo);
        }
    };

    const updateDB = async (payload, userInfo) => {
        try {
            const orderID = await createOrder();
            const { data } = await axios.put(
                `/api/checkout/pay/${orderID}`,
                payload.paymentIntent,
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            dispatch(emptyCart());
            console.log("🥶 paySuccess", data);
            nextStep();
        } catch (err) {
            alert(getError(err));
        }
    };

    //================================================================================
    // Sub-Components
    //================================================================================
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
        <form onSubmit={handleSubmit} className={styles["payment-form"]}>
            <CardElement
                id={styles["card-element"]}
                options={cardStyle}
                onChange={handleChange}
            />

            {error && (
                <div className="error" role="alert">
                    {error}
                </div>
            )}

            <TermsBox />

            <div className={styles["row2"]}>
                <button
                    disabled={
                        processing ||
                        disabled ||
                        succeeded ||
                        !termsAccepted ||
                        loading ||
                        error
                    }
                    id="submit"
                    type="submit"
                    // className={`${styles["btn"]} ${styles["inverted-btn"]}`}
                    // className="button form-button"
                    className={`${
                        processing ||
                        disabled ||
                        succeeded ||
                        !termsAccepted ||
                        loading ||
                        error
                            ? "button-disabled form-button"
                            : "button form-button"
                    }`}
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

            {/* Show a success message upon completion */}
            {/* <p
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
            </p> */}
        </form>
    );
}

const cardStyle = {
    style: {
        base: {
            color: "#32325d",
            // backgroundColor: "green",
            // padding: "1rem",
            fontFamily: "Helvetica",
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
