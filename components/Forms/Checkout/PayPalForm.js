import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import styles from "../Form.module.css";
import { getError } from "@/utils/error";

function PayPalForm({
    createOrder,
    updateDB,
    userInfo,
    total_price,
    cartItems,
    shipping,
    loading,
}) {
    //================================================================================
    // Component State
    //================================================================================
    const [{ ispending }, paypalDispatch] = usePayPalScriptReducer();

    useEffect(() => {
        loadPayPalScript();
    }, []);

    //================================================================================
    // Functions
    //================================================================================
    const createPaymentIntent = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [{ amount: { value: total_price } }],
            })
            .then((orderID) => {
                return orderID;
            });
    };

    //================================================================================
    // API Req
    //================================================================================
    const loadPayPalScript = async () => {
        paypalDispatch({
            type: "resetOptions",
            value: {
                "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
                // "client-id": "sb",
                currency: "EUR",
            }, // 🧠 is it safe to use it like this? (exposed!)
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };

    const onApprove = async (data, actions) => {
        try {
            let newOrderID = await createOrder();
            if (newOrderID) {
                let details = await actions.order.capture();

                updateDB(details, userInfo, newOrderID);
            }
        } catch (err) {
            alert(getError(err));
        }
    };

    const onCancel = (err) => {
        alert(getError(err));
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <>
            <div className={styles["paypal-comp"]}>
                {/* {paypalError && (
                        <div>
                            Uh oh, an error occurred! {paypalError.message}
                        </div>
                    )} */}
                {ispending ? (
                    <p>Loading paypal...</p>
                ) : (
                    <PayPalButtons
                        createOrder={createPaymentIntent}
                        onApprove={onApprove}
                        onCancel={onCancel}
                    ></PayPalButtons>
                )}
                {loading && <h4>Loading...</h4>}
            </div>
        </>
    );
}

function ProviderWrapper(props) {
    return (
        <PayPalScriptProvider deferLoading={true}>
            <PayPalForm {...props} />
        </PayPalScriptProvider>
    );
}

export default ProviderWrapper;
