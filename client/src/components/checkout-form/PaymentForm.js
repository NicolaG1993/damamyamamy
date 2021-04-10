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

const stripePromise = loadStripe(""); // da inserire public key

export default function PaymentForm({
    checkoutToken,
    shippingData,
    nextStep,
    backStep,
}) {
    const [values, setValues] = useState({});
    console.log("shippingData: ", shippingData);

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();
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
                    name: "International",
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry,
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

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target.form;
        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());
        // console.log("form data: ", allValues);

        setValues(allValues);
    };

    // const handleSubmit = (e) => {
    //     console.log("handleSubmit: ", e);
    // };

    return (
        <div className={""}>
            <h3></h3>Payment Form Component
            <form
                onChange={(e) => handleForm(e)}
                onSubmit={() => handleSubmit(values)}
            >
                <Review checkoutToken={checkoutToken} />
                <h6>Metodi di pagamento</h6>

                <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                        {({ elements, stripe }) => (
                            <form
                                onSubmit={(e) =>
                                    handleSubmit(e, elements, stripe)
                                }
                            >
                                <CardElement />
                                <br /> <br />
                                <div>
                                    <button onClick={backStep}>Back</button>
                                    <button type="submit" disabled={!stripe}>
                                        Pay{" "}
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

                <div>
                    <Link to="/cart">
                        <button onClick={() => backStep()}>
                            Torna indietro
                        </button>
                    </Link>
                    <button type="submit">Prosegui</button>
                </div>
            </form>
        </div>
    );
}
