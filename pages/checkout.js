import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { getError } from "@/utils/error";
import Link from "next/link";
import styles from "@/styles/Shop.module.css";
import { useRouter } from "next/router";
import { selectUserState } from "@/redux/slices/userSlice";
import { selectCartState, saveShippingAddress } from "@/redux/slices/cartSlice";
import AddressForm from "@/components/Forms/Checkout/AddressForm";
import PaymentForm from "@/components/Forms/Checkout/PaymentForm";

export default function Checkout() {
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    const dispatch = useDispatch();

    let userInfo = useSelector(selectUserState, shallowEqual);
    let cartState = useSelector(selectCartState, shallowEqual);
    let { cart, shippingAddress, paymentMethod } = cartState;

    const [activeStep, setActiveStep] = useState(1);

    useEffect(() => {
        if (!userInfo) {
            router.push("/profilo/login?redirect=/checkout"); // 🧠 devo ancora collegarlo
        }
        if (!cart) {
            router.push("/carrello");
        }
    }, []);

    //================================================================================
    // Functions
    //================================================================================
    const nextStep = () => {
        setActiveStep((prev) => prev > 0 && prev < 3 && prev + 1);
    };
    const backStep = () => {
        setActiveStep((prev) => prev > 1 && prev <= 3 && prev - 1);
    };
    const confirmShippingAddress = (data) => {
        dispatch(saveShippingAddress(data));
        nextStep();
    };

    //================================================================================
    // Sub-Components
    //================================================================================
    const ProgressBar = () => (
        <ul className={styles["progressbar"]}>
            <li className={styles["active"]}>Indirizzo</li>
            <li
                className={`${
                    activeStep > 1 ? styles["active"] : styles["not-active"]
                }`}
            >
                Pagamento
            </li>
            <li
                className={`${
                    activeStep > 2 ? styles["active"] : styles["not-active"]
                }`}
            >
                Ordine
            </li>
        </ul>
    );

    const Forms = () =>
        activeStep === 1 ? (
            <AddressForm
                next={confirmShippingAddress}
                shippingAddress={shippingAddress}
                cartItems={cart}
            />
        ) : (
            <PaymentForm
                userInfo={userInfo}
                cartItems={cart}
                shippingAddress={shippingAddress}
                paymentMethod={paymentMethod}
                nextStep={nextStep}
                backStep={backStep}
            />
        );

    let Confirmation = () => (
        <div className={styles["confirmation-wrap"]}>
            <div>
                <h3>Grazie per il tuo acquisto {userInfo.firstName}!</h3>
                <p>Il tuo ordine é andato a buon fine</p>
                <p>ID ordine: #{}</p>
            </div>

            <div>
                <Link href={"/"} className="button">
                    Vedi il tuo ordine
                </Link>
                <Link href={"/"} className="button">
                    Torna al sito
                </Link>
            </div>
        </div>
    );

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main id={styles["Checkout"]}>
            <Head>
                <title>Checkout • Da Mamy a Mamy</title>
                <meta property="og:title" content="Checkout • Da Mamy a Mamy" />
                <meta property="og:type" content="website" />
            </Head>
            <section className="page">
                <h1>Checkout</h1>
                <ProgressBar />
                {activeStep === 3 ? <Confirmation /> : <Forms />}
            </section>
        </main>
    );
}

// fare check prodotti prima di piazzare ordine 🧠
