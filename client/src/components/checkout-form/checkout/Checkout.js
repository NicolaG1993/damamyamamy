import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

export default function Checkout({ cart, order, onCaptureCheckout, error }) {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const history = useHistory();
    // const [isFinished, setIsFinished] = useState(false);

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }; // !!in react, if u want to use the previous state, u need to call it as a callback fn
    const next = (data) => {
        setShippingData(data);
        nextStep();
        console.log("shippingData: ", shippingData);
    };

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: "cart",
                });
                console.log("token: ", token);
                setCheckoutToken(token);
            } catch (err) {
                if (activeStep !== steps.length) history.push("/");
                // this fix the bug: if refresh page in checkout the cart will be empty
                // console.log("error: ", err);
            }
        };

        generateToken();
    }, [cart]);

    // timeout -> mock up the transaction without using my card details on stripe
    // const timeout = () => {
    //     console.log("timeout activated!");
    //     setTimeout(() => {
    //         setIsFinished(true);
    //     }, 3000);
    // };

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                checkoutToken={checkoutToken}
                shippingData={shippingData}
                activeStep={activeStep}
                nextStep={nextStep}
                backStep={backStep}
                onCaptureCheckout={onCaptureCheckout}
                // timeout={timeout}
            />
        );

    let Confirmation = () =>
        order ? (
            <>
                <div>
                    <h3>
                        Grazie per il tuo acquisto, {order.customer.firstname}{" "}
                        {order.customer.lastname}!
                    </h3>

                    <h5>Order ref: {order.customer_reference}</h5>
                </div>
                <br />
                <Link to="/">Torna al sito</Link>
            </>
        ) : (
            <div className="loader"></div>
        );

    // : isFinished ? (
    //     <>
    //         <div>
    //             <h3>Grazie per il tuo acquisto!</h3>
    //         </div>
    //         <br />
    //         <Link to="/">Torna al sito</Link>
    //     </>
    // )
    //  (after testing) remove the "isFinished" condition and leave only the spinner

    if (error) {
        Confirmation = () => (
            <>
                <h5>Errore: {error}</h5>
                <br />
                <Link to="/">Torna al sito</Link>
            </>
        );
    }

    return (
        <div className={"checkout-container"}>
            <div className={"checkout-box"}>
                <div className={"checkout-title-box"}>
                    <h1 className="second-font">Checkout</h1>
                </div>
                <div className={"step-status-box"}>
                    <ul className="progressbar">
                        <li className="active">Indirizzo</li>
                        <li className={`${activeStep === 1 ? "active" : ""}`}>
                            Metodo di pagamento
                        </li>
                    </ul>
                </div>
                {/* {steps.map((step) => (
                    <div key={step}>
                        <h3>{step}</h3>
                    </div>
                ))} */}
                {activeStep === steps.length ? (
                    <Confirmation />
                ) : checkoutToken ? (
                    <Form />
                ) : (
                    <div className="loader loader-inverted"></div>
                )}
            </div>
        </div>
    );
}

/*
creare div step-dot : circolare colore grigio su secondo : primo attivo di default
se step = 1 : classe "done" sul primo : classe "active" su secondo
step = 2 : classe "done" su entrambi (solo se necessario vederli ancora)

se no posso creare un active component solo per lo stepper
e creare le 3 differenti condizioni una ad una al suo interno
*/

/*
come generare un token senza commerce.js?
*/
