import React, { useState } from "react";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ["Shipping address", "Payment details"];

export default function Checkout() {
    console.log("props in Checkout.js: ");

    const [activeStep, setActiveStep] = useState(0);

    const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);
    const Confirmation = () => <div>Confirmation</div>;

    return (
        <div className={"checkout-container"}>
            <div className={"checkout-box"}>
                <div className={"step-status-box"}>
                    <p>Shipping address</p>
                    <p>Payment details</p>
                </div>
                {steps.map((step) => (
                    <div key={step}>
                        <h3>{step}</h3>
                    </div>
                ))}
                {activeStep === steps.length ? <Confirmation /> : <Form />}
            </div>
        </div>
    );
}
