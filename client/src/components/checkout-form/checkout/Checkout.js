import React, { useState, useEffect } from "react";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

export default function Checkout({ cart }) {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: "cart",
                });
                console.log("token: ", token);
                setCheckoutToken(token);
            } catch (err) {}
        };

        generateToken();
    }, [cart]);

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} />
        ) : (
            <PaymentForm />
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
