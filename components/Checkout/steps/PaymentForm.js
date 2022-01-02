import { useEffect, useState, useRef } from "react";

import {
    Elements,
    CardElement,
    ElementsConsumer,
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

// import { envs } from "../../../../config";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// import ReactDOM from "react-dom";

import Review from "./Review";
import Button from "../../Button/Button";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { cartClear, savePaymentMethod } from "../../../redux/Cart/cart.actions";
// import {
//     payFail,
//     payRequest,
//     paySuccess,
// } from "../../../redux/Checkout/checkout.actions";
import axios from "axios";
import { getError } from "../../../shared/utils/error";
import StripeForm from "../checkoutForms/Stripe";
import PayPalForm from "../checkoutForms/PayPal";

// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

// import { commerce } from "../../../shared/libs/commerce";

export default function PaymentForm({
    userInfo,
    cartItems,
    shippingAddress,
    nextStep,
    backStep,
    styles,
}) {
    console.log("shippingAddress: ", shippingAddress);

    const router = useRouter();
    const dispatch = useDispatch();
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();

    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
    const items_price = round2(
        cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    );
    const shipping_price = items_price > 200 ? 0 : 15;
    const tax_price = round2(items_price * 0.15);
    const total_price = round2(items_price + shipping_price + tax_price);

    let orderItems = [];
    cartItems.map((el) => {
        orderItems.push({
            itemId: el.id,
            name: el.name,
            price: el.price,
            quantity: el.quantity,
            image: el.image,
            slug: el.slug,
        });
    });

    const checkLiveData = async () => {
        axios
            .post(
                `/api/products-live/`,
                cartItems.map((el) => el.id)
            )
            .then(({ data }) =>
                cartItems.map((el) => {
                    const product = data.find((it) => el.id === it.id);
                    if (product.count_in_stock < el.quantity) {
                        if (product.count_in_stock < 1) {
                            router.push("/cart");
                            // mi basta fare il redirect a /cart, che ha giá funzione per aggiornare carrello
                        } else if (product.count_in_stock > 0) {
                            router.push("/cart");
                        }
                    } else {
                        return;
                    }
                })
            );
    };

    useEffect(() => {
        if (!shippingAddress.address) {
            backStep();
        } else {
            setPaymentMethod(Cookies.get("paymentMethod"));
            checkLiveData();
        }
        // else {
        //     setPaymentMethod(Cookies.get("paymentMethod"));

        //     const loadPayPalScript = async () => {
        //         const { data: clientId } = await axios.get(`/api/keys/paypal`, {
        //             headers: { authorization: `Bearer ${userInfo.token}` },
        //         });

        //         paypalDispatch({
        //             type: "resetOptions",
        //             value: { "client-id": clientId, currency: "EUR" },
        //         });
        //         paypalDispatch({ type: "setLoadingStatus", value: "pending" });
        //     };
        //     loadPayPalScript();
        // }
        console.log("paymentMethod:", Cookies.get("paymentMethod"));
    }, []);

    useEffect(() => checkLiveData(), [paymentMethod]);

    const createOrderDB = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                "/api/orders",
                {
                    user_id: userInfo.id,
                    order_items: orderItems,
                    shipping_address: shippingAddress,
                    payment_method: paymentMethod,
                    payment_result: null,
                    items_price,
                    shipping_price,
                    tax_price,
                    total_price,
                },
                { headers: { authorization: `Bearer ${userInfo.token}` } }
            );
            setLoading(false);
            console.log("🥶 data.order_id:", data.order_id);
            return data.order_id;
        } catch (err) {
            if (err.response.status === 500) {
                enqueueSnackbar(getError(err), { variant: "error" });
                router.push("/cart");
                //modificare carrello
                // err.response.data.soldOutItems.map((el) =>
                //     (el.newQuantity = 0)
                //         ? console.log("elimina")
                //         : console.log("aggiorna")
                // );
                // se el.newQuantity = 0 elimina
                // se el.newQuantity > 0 aggiorna quantity per el.id
                //reindirizza a /cart
                //forse meglio svolgere lí questo processo?
                //ancora meglio: faccio redirect ed applico un useEffect che controlla e aggiorna cart on render
                //cosí non mi serve nemmeno avere newQuantity
            } else {
                setLoading(false);
                enqueueSnackbar(getError(err), { variant: "error" });
            }
        }
    };

    // PAYPAL FUNCTIONS
    /*
    const [{ ispending }, paypalDispatch] = usePayPalScriptReducer();
    console.log("termsAccepted: ", termsAccepted);
    const createOrderPP = (data, actions) => {
        closeSnackbar();
        // console.log("termsAccepted: ", termsAccepted); // per qualche motivo quando in PP non si aggiorna

        return actions.order
            .create({
                purchase_units: [{ amount: { value: total_price } }],
            })
            .then((orderID) => {
                console.log("🥶 orderID:", orderID);
                return orderID;
            });

        // devo creare order id prima di fare render di paypal
        // posso creare ordine in db per poi avere un id unico
        // se peró viene annullato il checkout l'ordine rimane in db non pagato, io invece vorrei creare solo ordini giá pagati in db
        // anche se in teoria non dovrebbe essere un problema visto che il pagamento non sará disponibile dopo il checkout
        // quindi: devo creare ordine in db prima di tutto
        // o forse questo orderID viene da paypal? allora tutto ok
    };
    const onApprove = (data, actions) => {
        console.log("🥶 actions.order:", actions.order);

        createOrderDB().then(async (orderID) => {
            return actions.order.capture().then(async function (details) {
                console.log("🥶 details:", details);
                try {
                    // dispatch(payRequest());
                    const { data } = await axios.put(
                        `/api/orders/${orderID}/pay`,
                        details,
                        {
                            headers: {
                                authorization: `Bearer ${userInfo.token}`,
                            },
                        }
                    ); // 🧨 orderId viene da db, se ordine é gia stato creato
                    dispatch(cartClear());
                    Cookies.remove("cartItems");
                    // dispatch(paySuccess(data));
                    enqueueSnackbar("Order is paid", { variant: "success" });
                    console.log("🥶 paySuccess", data);
                    nextStep();
                } catch (err) {
                    // dispatch(payFail(getError(err)));
                    enqueueSnackbar(getError(err), { variant: "error" });
                    console.log("🥶 payFail:", getError(err));
                }
            });
        });
    };
    const onCancel = (err) => {
        enqueueSnackbar(getError(err), { variant: "error" });
    };
    */

    // FORM FUNCTIONS
    const acceptTerms = (e) => {
        // e.preventDefault();
        e.persist();
        const checked = e.target.checked;

        checked ? setTermsAccepted(true) : setTermsAccepted(false);
    };

    const handleSelection = (e) => {
        setPaymentMethod(e.target.value); //forse nn mi serve
        dispatch(savePaymentMethod(e.target.value));
        Cookies.set("paymentMethod", e.target.value);
    };

    const handleSubmit = async (e) => {
        // e.preventDefault(); // per qualche motivo qua non funziona "e"
        closeSnackbar();
        if (!termsAccepted) {
            enqueueSnackbar(
                "Accettare termini e condizioni prima di proseguire",
                { variant: "error" }
            );
            return; // ? non mi serve forse
        } else {
            createOrderDB().then(async (orderID) => {
                console.log("🐸 orderID: ", orderID); // invece di settare state (async) ritorno il valore direttamente da createOrderDB

                try {
                    // dispatch(payRequest());

                    const details = {
                        note: "id transazione eseguita su PayPal o Stripe",
                        email_address: "sb-kaxfo6042804@business.example.com",
                        status: "TEST COMPLETED",
                    };

                    const { data } = await axios.put(
                        `/api/orders/${orderID}/pay`,
                        details,
                        {
                            headers: {
                                authorization: `Bearer ${userInfo.token}`,
                            },
                        }
                    );
                    dispatch(cartClear());
                    Cookies.remove("cartItems");
                    // dispatch(paySuccess(data));
                    enqueueSnackbar("Order is paid", { variant: "success" });
                    console.log("🥶 paySuccess", data);
                    nextStep();
                } catch (err) {
                    setLoading(false);
                    enqueueSnackbar(getError(err), { variant: "error" });
                }
            });
        }
    };

    // STRIPE FUNCTIONS

    /* 
    quando seleziono "carta di credito" DOM renderizza stripe UI (da dove la prendo?)
    dopo che user inserisce i dati, accetta condizioni e conferma si crea l'obj ordine da passare a stripe (non db order)
    check possibili errori (non so se ci pensa gia stripe forse)
    se il pagamento avviene con successo allora si torna la response e si crea ordine in db
    */

    // const StripeForm = () => {
    //     const stripe = useStripe();
    //     const elements = useElements();
    //     return (
    //         <form onSubmit={(e) => handleStripeSubmit(e, elements, stripe)}>
    //             <CardElement />

    //             <TermsBox />

    //             <div className={styles["row2"]}>
    //                 <Button
    //                     fn={backStep}
    //                     text="Torna indietro"
    //                     type="function"
    //                     style="inverted-btn"
    //                 />
    //                 <button
    //                     className={`${styles["btn"]} ${styles["inverted-btn"]}`}
    //                     type="submit"
    //                     disabled={!stripe}
    //                 >
    //                     {`Conferma ${total_price} €`}
    //                 </button>
    //             </div>
    //         </form>
    //     );
    // };

    //elimina
    const handleStripeSubmit = async (e, elements, stripe) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        if (!termsAccepted) {
            enqueueSnackbar(
                "Accettare termini e condizioni prima di proseguire",
                {
                    variant: "error",
                }
            );
            return; // ? non mi serve forse
        }

        const cardElement = elements.getElement(CardElement);

        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: "card",
        //     card: cardElement,
        // });

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the cardElement
            elements,
            confirmParams: {
                return_url: "https://my-site.com/order/123/complete",
            },
        });

        if (error) {
            console.log("[error]", error);
        } else {
            console.log("result: ", result);
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
            const orderData = {
                line_items: cartItems,
                customer: {
                    firstname: shippingAddress.firstName,
                    lastname: shippingAddress.lastName,
                    email: shippingAddress.email,
                },
                shipping: {
                    name: "Domestico",
                    street: shippingAddress.address1,
                    town_city: shippingAddress.city,
                    county_state: shippingAddress.region,
                    postal_zip_code: shippingAddress.zip,
                    country: shippingAddress.country,
                },
                fulfillment: { shipping_method: shippingAddress.shipping },
                payment: {
                    gateway: "stripe",
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };

            console.log("paymentMethod: ", paymentMethod);
            console.log("orderData: ", orderData);
            // onCaptureCheckout(checkoutToken.id, orderData);

            nextStep();
        }
    };

    // COMPONENTS
    //elimina
    const TermsBox = () => (
        <div className={styles["check-terms"]}>
            <input
                type="checkbox"
                name="accept"
                onChange={(e) => acceptTerms(e)}
                checked={termsAccepted}
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

    return (
        <div className={styles["checkout-form-box"]}>
            <h3 className="">Pagamento</h3>
            <Review
                cartItems={cartItems}
                totalPrice={total_price}
                itemsPrice={items_price}
                taxPrice={tax_price}
                shippingPrice={shipping_price}
                styles={styles}
            />
            <h5>Metodi di pagamento:</h5>
            <select
                className={styles["payment-mode"]}
                onChange={handleSelection}
                value={paymentMethod}
            >
                <option value="Carta di credito">Carta di credito</option>
                <option value="PayPal">Paypal</option>
                <option value="test">Test</option>
            </select>

            {paymentMethod === "PayPal" && (
                <PayPalForm
                    styles={styles}
                    backStep={backStep}
                    nextStep={nextStep}
                    createOrderDB={createOrderDB}
                    userInfo={userInfo}
                    total_price={total_price}
                    loading={loading}
                />
            )}

            {paymentMethod === "Carta di credito" && (
                <Elements stripe={stripePromise}>
                    <StripeForm
                        styles={styles}
                        backStep={backStep}
                        nextStep={nextStep}
                        createOrderDB={createOrderDB}
                        userInfo={userInfo}
                        total_price={total_price}
                        cartItems={orderItems}
                        email={userInfo.email_address}
                        shipping={undefined}
                        loading={loading}
                    />

                    {/* <ElementsConsumer>
                        {({ elements, stripe }) => (
                            <form
                                onSubmit={(e) =>
                                    handleStripeSubmit(e, elements, stripe)
                                }
                            >
                                <CardElement />

                                <TermsBox />

                                <div className={styles["row2"]}>
                                    <Button
                                        fn={backStep}
                                        text="Torna indietro"
                                        type="function"
                                        style="inverted-btn"
                                    />
                                    <button
                                        className={`${styles["btn"]} ${styles["inverted-btn"]}`}
                                        type="submit"
                                        disabled={!stripe}
                                    >
                                        {`Conferma ${total_price} €`}
                                    </button>
                                </div>
                            </form>
                        )}
                    </ElementsConsumer> */}
                </Elements>
            )}
            {/* {paymentMethod === "test" && (
                <div className={styles["row"]}>
                    <TermsBox />
                    <Button
                        fn={backStep}
                        text="Torna indietro"
                        type="function"
                        style="inverted-btn"
                    />
                    <Button
                        fn={handleSubmit}
                        text={`Conferma ${total_price} €`}
                        type="function"
                        style="inverted-btn"
                    />
                    {loading && <h4>Loading...</h4>}
                </div>
            )} */}
        </div>
    );

    /*
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
                url: `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=${ppValues.currency}&disable-funding=${ppValues.disablefunding}&locale=${ppValues.locale}&intent=authorize`,
                callback: () => {
                    renderButtons();
                },
            });
        }

        // console.log(
        //     "checkoutToken.live.line_items",
        //     checkoutToken.live.line_items
        // );
        // console.log(
        //     "🤖🤖🤖orderData.line_items",
        //     checkoutToken.live.line_items.reduce(
        //         (list, item) => ({ ...list, [item.id]: item }),
        //         {}
        //     )
        // );
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
            const orderData = {
                line_items: checkoutToken.live.line_items.reduce(
                    (list, item) => ({
                        ...list,
                        [item.id]: { quantity: item.quantity },
                    }),
                    {}
                ),
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
            };

            commerce.checkout
                .capture(checkoutToken.id, {
                    ...orderData,
                    payment: {
                        gateway: "paypal",
                        paypal: {
                            action: "authorize",
                        },
                    },
                })
                .then((resp) => {
                    // Successful response
                    console.log("resp in AuthPP! 🥶🥶🥶", resp);
                    // devo usare payment_id della resp
                    window.paypal
                        .Buttons({
                            style: {
                                color: "blue",
                                shape: "pill",
                                label: "paypal",
                                tagline: false,
                            },
                            // env: "production", // Or 'sandbox',
                            // commit: true, // Show a 'Pay Now' button
                            payment: function () {
                                return resp.payment_id; // The payment ID from earlier
                            },
                            createOrder: (data, actions) => {
                                console.log(
                                    "createOrder! 🥶🥶🥶",
                                    resp.payment_id
                                );
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            description: "Your Order!",
                                            amount: {
                                                currency_code: "EUR",
                                                value: checkoutToken.live
                                                    .subtotal.raw,
                                            },
                                        },
                                    ], //questa array verra mappata, devo mettere ogni elemento al suo interno 🐔
                                });
                            },

                            onApprove: (data, actions) => {
                                console.log("onApprove data 🥶🥶🥶", data);
                                // Authorize the transaction
                                actions.order
                                    .authorize()
                                    .then((authorization) => {
                                        console.log(
                                            "onApprove authorization 🥶🥶🥶",
                                            authorization
                                        );
                                        // Get the authorization id
                                        const authorizationID =
                                            authorization.purchase_units[0]
                                                .payments.authorizations[0].id;
                                        alert(
                                            "You have authorized this transaction. Order ID:  " +
                                                data.orderID +
                                                ", Authorization ID: " +
                                                authorizationID
                                        ); // Optional message given to purchaser
                                        // Call your server to validate and capture the transaction;

                                        // ..code here..
                                        onCaptureCheckout(checkoutToken.id, {
                                            ...orderData,
                                            payment: {
                                                gateway: "paypal",
                                                paypal: {
                                                    action: "capture",
                                                    payment_id: data.orderID,
                                                    payer_id: data.payerID, // 🧨
                                                    authorizationID:
                                                        authorizationID,
                                                },
                                            },
                                        });

                                        nextStep();
                                    });
                            },

                            onApproveOldVersion: async (data, actions) => {
                                const order = await actions.order.capture();
                                console.log("🤖🤖🤖order", order);

                                onCaptureCheckout(checkoutToken.id, {
                                    ...orderData,
                                    payment: {
                                        gateway: "paypal",
                                        paypal: {
                                            action: "capture",
                                            payment_id: order.id,
                                            payer_id: order.payer.payer_id,
                                        },
                                    },
                                });

                                nextStep();
                            }, //con sandbox funzionava cosí

                            onCancel: function (data, actions) {
                                console.log("cancel order!");
                                // Handler if customer does not authorize payment
                            },
                            onError: (err) => {
                                console.log("order error!", err);
                                setPaypalError(err);
                                console.error(err);
                            },
                        })
                        .render(paypalRef.current);
                })
                .catch((error) => {
                    // Error handler
                    console.log("error in AuthPP! 🥶🥶🥶", error);
                });

            //devo fare prima la POST req a commerce con order + authorize
            //la response mi dará il payment_id
            // lo uso in paypal.Buttons(...)
            //dentro onAuthorize faccio la seconda POST req a commerce con order + capture
            // probabilmente const order = await actions.order.capture(); non serve piu
        }

        if (method === "pp-old") {
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
                    onAuthorize: async (data, actions) => {
                        const order = await actions.order.capture();
                        // devo vedere questo order e in caso modificarlo come orderData

                        // line_items: checkoutToken.live.line_items.map(item => item.id: item),
                        const orderData = {
                            line_items: checkoutToken.live.line_items.reduce(
                                (list, item) => ({
                                    ...list,
                                    [item.id]: { quantity: item.quantity },
                                }),
                                {}
                            ),
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
                        //devo vedere se action:capture é corretto
                        //forse usare authorize ?

                        console.log("🤖🤖🤖order", order);
                        console.log("🤖🤖🤖orderData", orderData);
                        console.log("🤖🤖🤖checkoutToken", checkoutToken);
                        onCaptureCheckout(checkoutToken.id, orderData);
                        nextStep();
                    },
                    onCancel: function (data, actions) {
                        // Handler if customer does not authorize payment
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
        // e.preventDefault();
        e.persist();
        const checked = e.target.checked;

        checked ? setTermsAccepted(true) : setTermsAccepted(false);
    };

    const TermsBox = () => (
        <div className={styles["check-terms"]}>
            <input
                type="checkbox"
                name="accept"
                onChange={(e) => acceptTerms(e)}
                checked={termsAccepted}
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

            nextStep();
        }
    };

    const handleFakeSubmit = async () => {
        onCaptureCheckout("test", {}); //this is for App, to empty the cart
        timeout(); //this come as a prop from Checkout
        nextStep();
    }; //this is only for test

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
        <div className={styles["checkout-form-box"]}>
            <h3 className="">Pagamento</h3>
            <Review checkoutToken={checkoutToken} styles={styles} />
            <h5>Metodi di pagamento:</h5>
            <select
                className={styles["payment-mode"]}
                onChange={handleSelection}
            >
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

                                <div className={styles["row2"]}>
                                    <Button
                                        fn={backStep}
                                        text="Torna indietro"
                                        type="function"
                                        style="inverted-btn"
                                    />
                                    <button
                                        className={`${styles["btn"]} ${styles["inverted-btn"]}`}
                                        type="submit"
                                        disabled={!stripe}
                                    >
                                        Conferma
                                        {" " +
                                            checkoutToken.live.subtotal
                                                .formatted_with_symbol}
                                    </button>
                                </div>
                            </form>
                        )}
                    </ElementsConsumer>
                </Elements>
            )}
            {method === "pp" && (
                <div className={styles["paypal-comp"]}>
                    {paypalError && (
                        <div>
                            Uh oh, an error occurred! {paypalError.message}
                        </div>
                    )}
                    <TermsBox />
                    <div
                        className={styles["checkout-paypal-btn"]}
                        ref={paypalRef}
                    />
                    <Button
                        fn={backStep}
                        text="Torna indietro"
                        type="function"
                        style="inverted-btn"
                    />
                </div>
            )}
            {method === "test" && (
                <div className={styles["row"]}>
                    <Button
                        fn={backStep}
                        text="Torna indietro"
                        type="function"
                        style="inverted-btn"
                    />
                    <Button
                        fn={handleFakeSubmit}
                        text={`Conferma ${checkoutToken.live.subtotal.formatted_with_symbol}`}
                        type="function"
                        style="inverted-btn"
                    />
                </div>
            )}
        </div>
    );
    */
}

/*
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
*/

/*

CODICI PER TEST VERSION 🤖

- aggiungere nuova opzione "test" per method
- attivare timeout() (anche in Chekout.js)
- attivare isfinished in Chekout.js
- attivare handleFakeSubmit per fingere il pagamento
- aggiungere allerts su checkout, per chiarire che non funziona veramente in test mode
- aggiungere "test" condition in App in handleCaptureCheckout
- modificare le varie keys da live a sandbox/test (script url for paypal + dati per checkout stripe gateway)

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
