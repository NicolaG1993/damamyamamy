import React from "react";

import {
    Elements,
    CardElement,
    ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
        // const form = e.target.form;
        // const data = new FormData(form);
        // console.log("e: ", e);
        // console.log("data: ", data);
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
        <div className="checkout-form-box">
            <h3>Pagamento</h3>
            <Review checkoutToken={checkoutToken} />
            <h5>Metodi di pagamento:</h5>
            <select className="payment-mode">
                <option>Carta di credito</option>
                <option>Paypal</option>
            </select>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form
                            onSubmit={(e) => handleSubmit(e, elements, stripe)}
                        >
                            <CardElement />

                            <div className="row">
                                <input type="checkbox" name="accept" />
                                <label htmlFor="accept">
                                    Dichiaro di aver letto bla bla bla
                                </label>
                                <div className="row-submit">
                                    <button
                                        className={"layout-button-dark"}
                                        type="button"
                                        onClick={backStep}
                                    >
                                        Torna indietro
                                    </button>
                                    <button
                                        className={"layout-button-dark"}
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
