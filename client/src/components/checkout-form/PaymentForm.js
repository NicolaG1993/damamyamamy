import React, { useEffect, useState, useRef } from "react";

import {
    Elements,
    CardElement,
    ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// import ReactDOM from "react-dom";

import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function PaymentForm({
    checkoutToken,
    shippingData,
    nextStep,
    backStep,
    onCaptureCheckout,
    timeout,
}) {
    console.log("shippingData: ", shippingData);
    console.log("paypal: ", window.paypal);
    const [method, setMethod] = useState("cc");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [paypalError, setPaypalError] = useState(null);
    const paypalRef = useRef(null);

    useEffect(() => {
        // check if PayPal JS SDK is already loaded
        if (window.paypal) {
            renderButtons();
        } else {
            const ppValues = {
                currency: "EUR",
                disablefunding: "card,giropay,sepa,sofort",
                locale: "it_IT",
            };
            insertScriptElement({
                url: `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=${ppValues.currency}&disable-funding=${ppValues.disablefunding}&locale=${ppValues.locale}`,
                callback: () => {
                    renderButtons();
                },
            });
        }
    }, []);

    useEffect(() => {
        renderButtons();
    }, [method]);

    const renderButtons = () => {
        //codice necessario perché il div di useRef viene renderizzato if (method == pp)
        if (method === "cc") {
            return;
        }

        if (method === "pp") {
            window.paypal
                .Buttons({
                    style: {
                        color: "blue",
                        shape: "pill",
                        label: "paypal",
                        tagline: false,
                    },
                    createOrder: (data, actions) => {
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
                    },
                    onApprove: async (data, actions) => {
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
                            fulfillment: {
                                shipping_method: shippingData.shipping,
                            },
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
                    },
                    onError: (err) => {
                        setPaypalError(err);
                        console.error(err);
                    },
                })
                .render(paypalRef.current);
        }
    };

    const handleSelection = (e) => {
        console.log("e: ", e);
        console.log("e.target.value: ", e.target.value);
        setMethod(e.target.value);
    };

    const acceptTerms = (e) => {
        const checked = e.target.checked;

        checked ? setTermsAccepted(true) : setTermsAccepted(false);
    };

    const TermsBox = () => (
        <div className="check-terms">
            <input
                type="checkbox"
                name="accept"
                onChange={(e) => acceptTerms(e)}
            />
            <label htmlFor="accept">
                Dichiaro di aver letto{" "}
                <a
                    href="/terms-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Termini e Condizioni
                </a>
            </label>
        </div>
    );

    const handleSubmit = async (e, elements, stripe) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        if (!termsAccepted) {
            alert("Accettare termini e condizioni prima di proseguire");
            return;
        } //forse va nello step precedente? 🐔

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

    const handleFakeSubmit = async () => {
        onCaptureCheckout("test", {});
        timeout();
        nextStep();
    };

    // useEffect(() => {
    //     // Load PayPal Script at the end of our DOM
    //     const script = document.createElement("script");
    //     script.src =
    //         "https://www.paypal.com/sdk/js?client-id=AZVz756sSn0AylZvDKjKGJnhJMGIw3JLV5crP_6igMFZhIOH00ReyNl4bo8GSKT7P0NkK5GEZUgULuin";
    //     script.addEventListener("load", () => setLoaded(true));
    //     document.main.appendChild(script);

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
                <option value="test">Test</option>
            </select>

            {method === "cc" && (
                <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                        {({ elements, stripe }) => (
                            <form
                                onSubmit={(e) =>
                                    handleSubmit(e, elements, stripe)
                                }
                            >
                                <CardElement />

                                <TermsBox />

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
            )}
            {method === "pp" && (
                <div className="paypal-comp">
                    {paypalError && (
                        <div>
                            Uh oh, an error occurred! {paypalError.message}
                        </div>
                    )}
                    <TermsBox />
                    <div className="checkout-paypal-btn" ref={paypalRef} />
                    <button
                        className={"layout-button btn-dark1 btn-long"}
                        type="button"
                        onClick={backStep}
                    >
                        Torna indietro
                    </button>
                </div>
            )}
            {method === "test" && (
                <div className="test-payment-comp">
                    <button
                        className={"layout-button btn-dark1 btn-long"}
                        type="button"
                        onClick={handleFakeSubmit}
                    >
                        Conferma
                        {" " +
                            checkoutToken.live.subtotal.formatted_with_symbol}
                    </button>
                    <button
                        className={"layout-button btn-dark1 btn-long"}
                        type="button"
                        onClick={backStep}
                    >
                        Torna indietro
                    </button>
                </div>
            )}
        </div>
    );
}

function insertScriptElement({
    url,
    attributes = {},
    properties = {},
    callback,
}) {
    const newScript = document.createElement("script");
    newScript.onerror = (err) =>
        console.error("An error occured while loading the PayPal JS SDK", err);
    if (callback) newScript.onload = callback;

    Object.keys(attributes).forEach((key) => {
        newScript.setAttribute(key, attributes[key]);
    });

    document.body.appendChild(newScript);
    newScript.src = url;
}

/*

CODICI PER TEST VERSION 🤖

- aggiungere nuova opzione "test" per method
- sostituire dati per checkout gateway
- attivare timeout() (anche in Chekout.js)
- attivare isfinished in Chekout.js
- attivare handleFakeSubmit per fingere il pagamento
- aggiungere allerts su checkout, per chiarire che non funziona veramente in test mode
- aggiungere "test" condition in App in handleCaptureCheckout
- modificare le varie keys da live a sandbox/test

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
