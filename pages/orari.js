import ContactForm from "@/components/Forms/ContactForm";
import Head from "next/head";
import { selectUserState } from "@/redux/slices/userSlice";
import { shallowEqual, useSelector } from "react-redux";
import { createRef, useState } from "react";
import axios from "axios";

export default function Contatto() {
    //================================================================================
    // Component State
    //================================================================================
    let userInfo = useSelector(selectUserState);
    const [formState, setFormState] = useState({
        first: userInfo ? userInfo.firstName : "",
        last: userInfo ? userInfo.lastName : "",
        email: userInfo ? userInfo.email : "",
        phone: userInfo ? userInfo.phone : "",
        message: "",
        sender: "Da Mamy a Mamy • Contattaci",
        domain: "damamyamamy.com",
    });
    const [activeStep, setActiveStep] = useState(1);
    const [isFinished, setIsFinished] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    //================================================================================
    // Functions
    //================================================================================
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let newState = { ...formState, [name]: value };
        setFormState(newState);
    };

    const nextStep = () => {
        setActiveStep((prev) => (prev <= 2 ? prev + 1 : 2));
    };
    const backStep = () => {
        setActiveStep((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const sendEmail = async () => {
        nextStep();
        try {
            const resp = await axios.post("/api/email/contact-us", formState);
            // console.log("resp: ", resp);
            if (resp.data.emailSended) {
                setIsFailed(false);
                setIsFinished(true);
            } else {
                setIsFailed(resp.data.body);
            }
        } catch (err) {
            console.log("🐞 ERR: ", err); //handle error
            setIsFailed(err);
        }
    };

    //================================================================================
    // Sub-Components
    //================================================================================

    let Confirmation = () => {
        if (isFinished) {
            return (
                <>
                    <div className="success">
                        <p>Messaggio inviato!</p>
                    </div>
                    <p onClick={backStep} style={{ cursor: "pointer" }}>
                        Torna indietro
                    </p>
                </>
            );
        } else if (isFailed) {
            return (
                <>
                    <div className="error">
                        <p>
                            Sembra esserci un errore, non abbiamo ricevuto
                            questo messaggio. Riprova o contattaci direttamente
                            via email o via telefono.
                        </p>
                    </div>
                    <p onClick={backStep} style={{ cursor: "pointer" }}>
                        Torna indietro
                    </p>
                </>
            );
        } else {
            return <div className="loader">Attendere, invio in corso...</div>;
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <>
            <Head>
                <title>Orari di apertura • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Orari di apertura • Da Mamy a Mamy"
                />
            </Head>

            <main id="Contact">
                <section className="page">
                    <h1>Orari di apertura</h1>
                    <div>
                        <p>09:00 - 14:00 | Lunedí, Venerdí e Sabato</p>
                        <p>09:00 - 18:30 | Martedí, Mercoledí e Giovedí</p>
                    </div>
                </section>
            </main>
        </>
    );
}
