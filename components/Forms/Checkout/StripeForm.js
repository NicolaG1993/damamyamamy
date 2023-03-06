import { useEffect, useState } from "react";
import {
    CardElement,
    useStripe,
    useElements,
    Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/router";
import axios from "axios";
import styles from "../Form.module.css";
import { getError } from "@/utils/error";

function StripeForm({
    createOrder,
    updateDB,
    userInfo,
    total_price,
    cartItems,
    shipping,
    loading,
    termsAccepted,
}) {
    //================================================================================
    // Component State
    //================================================================================
    const stripe = useStripe();
    const elements = useElements();
    // const dispatch = useDispatch();
    // const router = useRouter();
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
            createPaymentIntent(
                cartItems,
                userInfo.email,
                // shipping,
                total_price
            );
        }
    }, []);

    const handleChange = async (e) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        let newOrderID = await createOrder();
        newOrderID && payOrder(userInfo, clientSecret, newOrderID);
    };

    //================================================================================
    // API Req
    //================================================================================
    const createPaymentIntent = async (
        cartItems,
        email,
        // shipping,
        total_price
    ) => {
        console.log("🐠 createPaymentIntent invoked");
        try {
            const { data } = await axios.post(
                `/api/checkout/stripe/create-payment-intent`,
                {
                    items: cartItems,
                    email: email,
                    // shipping: shipping,
                    total_price: total_price,
                }
            );
            setClientSecret(data.clientSecret);
            console.log("💚 createPaymentIntent data: ", data);
        } catch (err) {
            alert(getError(err));
        }
    };

    const payOrder = async (userInfo, clientSecret, newOrderID) => {
        console.log("🐠 payOrder invoked");
        try {
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
                updateDB(payload.paymentIntent, userInfo, newOrderID);
            }
        } catch (err) {
            alert(getError(err));
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className={styles["payment-form"]}
        >
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

function ProviderWrapper(props) {
    return (
        <Elements stripe={stripePromise}>
            <StripeForm {...props} />
        </Elements>
    );
}

export default ProviderWrapper;
