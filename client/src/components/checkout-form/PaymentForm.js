import React, { useEffect, useState, useRef } from "react";

import {
    Elements,
    CardElement,
    ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ReactDOM from "react-dom";

import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function PaymentForm({
    checkoutToken,
    shippingData,
    nextStep,
    backStep,
    onCaptureCheckout,
}) {
    console.log("shippingData: ", shippingData);
    console.log("paypal: ", window.paypal);
    const [method, setMethod] = useState("cc");
    const [paypalError, setPaypalError] = useState(null);

    const handleSelection = (e) => {
        console.log("e: ", e);
        console.log("e.target.value: ", e.target.value);
        setMethod(e.target.value);
    };

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
            // devo provare a fare un mockup dell'errore 🐔
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
                fulfillment: { shipping_method: shippingData.shipping },
                payment: {
                    gateway: "stripe",
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };

            // console.log("paymentMethod: ", paymentMethod);
            // console.log("orderData: ", orderData);
            onCaptureCheckout(checkoutToken.id, orderData);

            // timeout(); // only for test // i need to pass it as a prop

            nextStep();
        }
    };

    const handlePaypalSubmit = async (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Your Order!",
                    amount: {
                        currency_code: "EUR",
                        value: checkoutToken.live.subtotal.raw,
                    },
                },
            ], //questa array verra mappata, devo mettere ogni elemento al suo interno 🐔
        });
    };
    const handlePaypalError = (err) => {
        setPaypalError(err);
        console.error(err);
    };
    const handlePaypalApprove = async (data, actions) => {
        const order = await actions.order.capture();
        // devo vedere questo order e in caso modificarlo come orderData
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
            fulfillment: { shipping_method: shippingData.shipping },
            payment: {
                gateway: "paypal",
                paypal: {
                    action: "capture",
                    payment_id: order.id,
                    payer_id: order.payer.payer_id,
                },
            },
        };

        console.log("order", order);
        console.log("orderData", orderData);
        console.log("checkoutToken", checkoutToken);
        onCaptureCheckout(checkoutToken.id, orderData);
        nextStep();
    };

    // useEffect(() => {
    //     // Load PayPal Script at the end of our DOM
    //     const script = document.createElement("script");
    //     script.src =
    //         "https://www.paypal.com/sdk/js?client-id=AZVz756sSn0AylZvDKjKGJnhJMGIw3JLV5crP_6igMFZhIOH00ReyNl4bo8GSKT7P0NkK5GEZUgULuin";
    //     script.addEventListener("load", () => setLoaded(true));
    //     document.body.appendChild(script);

    //     if (loaded) {
    //     }
    // });

    return (
        <div className="checkout-form-box">
            <h3 className="second-font">Pagamento</h3>
            <Review checkoutToken={checkoutToken} />
            <h5>Metodi di pagamento:</h5>
            <select className="payment-mode" onChange={handleSelection}>
                <option value="cc">Carta di credito</option>
                <option value="pp">Paypal</option>
            </select>

            {method === "cc" ? (
                <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                        {({ elements, stripe }) => (
                            <form
                                onSubmit={(e) =>
                                    handleSubmit(e, elements, stripe)
                                }
                            >
                                <CardElement />

                                <div className="check-terms">
                                    <input type="checkbox" name="accept" />
                                    <label htmlFor="accept">
                                        Dichiaro di aver letto{" "}
                                        <a>Termini e Condizioni</a>
                                    </label>
                                </div>

                                <div className="row2">
                                    <div className="row-submit">
                                        <button
                                            className={
                                                "layout-button btn-dark1"
                                            }
                                            type="button"
                                            onClick={backStep}
                                        >
                                            Torna indietro
                                        </button>
                                        <button
                                            className={
                                                "layout-button btn-dark1"
                                            }
                                            type="submit"
                                            disabled={!stripe}
                                        >
                                            Conferma
                                            {" " +
                                                checkoutToken.live.subtotal
                                                    .formatted_with_symbol}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </ElementsConsumer>
                </Elements>
            ) : (
                <div className="paypal-comp">
                    {paypalError && (
                        <div>
                            Uh oh, an error occurred! {paypalError.message}
                        </div>
                    )}
                    <PayPalButton
                        createOrder={(data, actions) =>
                            handlePaypalSubmit(data, actions)
                        }
                        onApprove={(data, actions) =>
                            handlePaypalApprove(data, actions)
                        }
                        onError={(err) => handlePaypalError(err)}
                    />
                </div>
            )}
        </div>
    );
}

// RIPULIRE FILE

/*
PER TESTARE PAGAMENTO 
gateway: 'test_gateway',
    card: {
      number: '4242 4242 4242 4242',
      expiry_month: '01',
      expiry_year: '2023',
      cvc: '123',
      postal_zip_code: '94103',
    },
*/
