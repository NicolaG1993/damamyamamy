import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { cartClear, savePaymentMethod } from "../../../redux/Cart/cart.actions";
import { getError } from "../../../shared/utils/error";
import Button from "../../Button/Button";

export default function PayPalForm({
    styles,
    backStep,
    nextStep,
    createOrderDB,
    userInfo,
    total_price,
    loading,
}) {
    const dispatch = useDispatch();
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();

    // const [termsAccepted, setTermsAccepted] = useState(false);

    useEffect(() => {
        console.log("PP COMPONENT RENDERS!");

        const loadPayPalScript = async () => {
            const { data: clientId } = await axios.get(`/api/keys/paypal`, {
                headers: { authorization: `Bearer ${userInfo.token}` },
            }); //forse dotenv mi evita questo passaggio

            paypalDispatch({
                type: "resetOptions",
                value: { "client-id": clientId, currency: "EUR" },
            });
            paypalDispatch({ type: "setLoadingStatus", value: "pending" });
        };
        loadPayPalScript();
    }, []);

    // PAYPAL FUNCTIONS
    const [{ ispending }, paypalDispatch] = usePayPalScriptReducer();
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

    // FORM FUNCTIONS
    // const acceptTerms = (e) => {
    //     // e.preventDefault();
    //     e.persist();
    //     const checked = e.target.checked;

    //     checked ? setTermsAccepted(true) : setTermsAccepted(false);
    // };

    // SUB COMPONENTS
    // const TermsBox = () => (
    //     <div className={styles["check-terms"]}>
    //         <input
    //             type="checkbox"
    //             name="accept"
    //             onChange={(e) => acceptTerms(e)}
    //             checked={termsAccepted}
    //         />
    //         <label htmlFor="accept">
    //             Dichiaro di aver letto{" "}
    //             <a
    //                 href="/terms-conditions"
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //             >
    //                 Termini e Condizioni
    //             </a>
    //         </label>
    //     </div>
    // );

    // DOM
    return (
        <div className={styles["paypal-comp"]}>
            {/* {paypalError && (
                        <div>
                            Uh oh, an error occurred! {paypalError.message}
                        </div>
                    )} */}
            {/* <TermsBox /> */}
            {ispending ? (
                <p>Loading paypal...</p>
            ) : (
                <PayPalButtons
                    createOrder={createOrderPP}
                    onApprove={onApprove}
                    onCancel={onCancel}
                ></PayPalButtons>
            )}
            <Button
                fn={backStep}
                text="Torna indietro"
                type="function"
                style="inverted-btn"
            />
            {loading && <h4>Loading...</h4>}
        </div>
    );
}
