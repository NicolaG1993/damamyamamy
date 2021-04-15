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
            } catch {
                if (activeStep !== steps.length) history.push("/");
            }
        };

        generateToken();
    }, [cart]);

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
            />
        );
    const Confirmation = () => <div>Confirmation</div>;

    return (
        <div className={"checkout-container"}>
            <div className={"checkout-box"}>
                <div className={"step-status-box"}>
                    <div className={"step-dot"}></div>
                    <p>Shipping address</p>
                    <div className={"step-dot"}></div>
                    <p>Payment details</p>
                </div>
                {steps.map((step) => (
                    <div key={step}>
                        <h3>{step}</h3>
                    </div>
                ))}
                {activeStep === steps.length ? (
                    <Confirmation />
                ) : (
                    checkoutToken && <Form />
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