import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AddressForm from "./steps/AddressForm";
import PaymentForm from "./steps/PaymentForm";
import Button from "../Button/Button";
import { commerce } from "../../lib/commerce";
import "./style/Checkout.css";

// REDUX
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    emptyCart,
    refreshCart,
    captureCheckout,
} from "../../redux/LoadCart/loadCart.actions";
const selectCart = (state) => state.loadCart.cart;
const selectOrder = (state) => state.loadCart.order;
const selectError = (state) => state.loadCart.error;

const steps = ["Shipping address", "Payment details"];

export default function Checkout() {
    //STATE
    let cart = useSelector(selectCart, shallowEqual);
    let order = useSelector(selectOrder, shallowEqual);
    let error = useSelector(selectError, shallowEqual);
    console.log("cart in Checkout.js: ", cart);

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const history = useHistory();
    const [isFinished, setIsFinished] = useState(false); //this is only for test

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

    const dispatch = useDispatch();
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        console.log("handleCaptureCheckout activated! 🥶🧨🎅");
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
                console.log("token: ", token);
                setCheckoutToken(token);
            } catch (err) {
                if (activeStep !== steps.length) history.push("/");
                // this fix the bug: if refresh page in checkout the cart will be empty
                // console.log("error: ", err);
            }
        };
        activeStep === 0 && generateToken();
    }, [cart]);

    // timeout -> mock up the transaction without using card details on stripe
    const timeout = () => {
        console.log("timeout activated!");
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    };

    const ProgressBar = () => (
        <ul className="progressbar">
            <li className="active">Indirizzo</li>
            <li className={`${activeStep === 1 ? "active" : ""}`}>
                Metodo di pagamento
            </li>
        </ul>
    );

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                checkoutToken={checkoutToken}
                shippingData={shippingData}
                // activeStep={activeStep}
                nextStep={nextStep}
                backStep={backStep}
                onCaptureCheckout={handleCaptureCheckout}
                timeout={timeout}
            />
        );

    let Confirmation = () =>
        order ? (
            <div className="confirmation-wrap">
                <div>
                    <h3>
                        Grazie per il tuo acquisto {order.customer.firstname}{" "}
                        {order.customer.lastname}!
                    </h3>

                    <p>Ordine: {order.customer_reference}</p>
                </div>

                <Link to="/cart">
                    <button className={"layout-button btn-dark1"}>
                        Torna al carrello
                    </button>
                </Link>
            </div>
        ) : isFinished ? (
            <div className="confirmation-wrap">
                <div>
                    <h3>
                        Grazie per il tuo acquisto! {shippingData.firstName}{" "}
                        {shippingData.lastName}!
                    </h3>
                </div>
                <br />
                <Link to="/">
                    <button className={"layout-button btn-dark1"}>
                        Torna al sito
                    </button>
                </Link>
            </div>
        ) : (
            <div className="loader loader-inverted"></div>
        );
    //  (after testing) remove the "isFinished" condition and leave only the spinner

    if (error) {
        Confirmation = () => (
            <div className="confirmation-wrap">
                <div>
                    <h3>Errore:</h3>
                    <p>{error.err.data.error.message}</p>
                </div>

                <Button page="/cart" text="Torna al carrello" type="internal" />
            </div>
        );
    }

    return (
        <div id="checkout">
            <div className={"checkout-wrap"}>
                <div className={"checkout-title"}>
                    <h1>Checkout</h1>
                </div>
            </div>

            <div className={"progressbar-wrap"}>
                <ProgressBar />
            </div>

            {activeStep === steps.length ? (
                <Confirmation />
            ) : checkoutToken ? (
                <Form />
            ) : (
                <div className="loader loader-inverted"></div>
            )}
        </div>
    );
}
