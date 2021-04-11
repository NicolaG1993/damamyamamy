import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Elements,
    CardElement,
    ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { commerce } from "../../lib/commerce";

import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function PaymentForm({
    checkoutToken,
    shippingData,
    nextStep,
    backStep,
    onCaptureCheckout,
}) {
    // const [values, setValues] = useState({});
    console.log("shippingData: ", shippingData);

    const handleSubmit = async (e, elements, stripe) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.log("[error]", error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email,
                },
                shipping: {
                    name: "Domestico",
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.region,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.country,
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: "stripe",
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };

            onCaptureCheckout(checkoutToken.id, orderData);

            nextStep();
        }
    }; //copiata questa fn - devo ancora analizzarla ed integrarla

    // const handleForm = (e) => {
    //     e.preventDefault();
    //     const form = e.target.form;
    //     const data = new FormData(form);
    //     const allValues = Object.fromEntries(data.entries());
    //     // console.log("form data: ", allValues);

    //     setValues(allValues);
    // };

    // const handleSubmit = (e) => {
    //     console.log("handleSubmit: ", e);
    // };

    return (
        <div className={""}>
            <h3></h3>Payment Form Component
            <Review checkoutToken={checkoutToken} />
            <h6>Metodi di pagamento</h6>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form
                            onSubmit={(e) => handleSubmit(e, elements, stripe)}
                        >
                            <CardElement />
                            <br /> <br />
                            <div>
                                <button type="button" onClick={backStep}>
                                    Torna indietro
                                </button>
                                <button type="submit" disabled={!stripe}>
                                    Conferma{" "}
                                    {
                                        checkoutToken.live.subtotal
                                            .formatted_with_symbol
                                    }
                                </button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </div>
    );
}

// RIPULIRE FILE
