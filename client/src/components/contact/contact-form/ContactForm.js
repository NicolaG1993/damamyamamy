import React, { useState } from "react";
import axios from "../../../axios";

const steps = ["Contact", "Robot Check"];

export default function ContactForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [contactReq, setContactReq] = useState({});

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    // const next = (data) => {
    //     setShippingData(data);
    //     nextStep();
    // };

    const Form = () =>
        activeStep === 0 ? (
            <StepA />
        ) : (
            <StepB
                activeStep={activeStep}
                nextStep={nextStep}
                backStep={backStep}
            />
        );

    let Confirmation = () => {
        isFinished ? <StepC /> : <div className="loader"></div>;
    };

    // if (error) {
    //     Confirmation = () => (
    //         <>
    //             <h5>Errore: {error}</h5>
    //             <br />
    //             <Link to="/">Torna al sito</Link>
    //         </>
    //     );
    // } dovrei ricevere error da App per farla funzionare

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target.form;
        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());
        setContactReq(allValues);
    };

    const handleSubmit = async (contactReq) => {
        console.log("contactReq: ", contactReq);

        try {
            if (
                !contactReq.email ||
                !contactReq.contactname ||
                !contactReq.contactlast ||
                !contactReq.message
            )
                return; //return error? 🐔

            const resp = await axios.post("/contact-us", contactReq);
            console.log("resp: ", resp);
            resp.emailSended && nextStep(); //non so se é scritta giusta ancora 🐔
        } catch (err) {
            console.log("err in getFollowers(actions): ", err); //handle error 🐔
        }
    };

    const handleRobotCheck = () => {};
    const handleSubmitRobotCheck = () => {};

    const StepA = () => (
        <form
            className="contact-form"
            onChange={(e) => handleForm(e)}
            onSubmit={() => handleSubmit(contactReq)}
        >
            {/* <form className="contact-form" onSubmit={(e) => send(e)}> */}
            <h1 className="contact-form-col-full">Contatta da Mamy a Mamy</h1>

            <div className="contact-form-col-left">
                <input
                    type="text"
                    placeholder="Nome*"
                    name="contactname"
                    id="contactname"
                />
            </div>
            <div className="contact-form-col-right">
                <input
                    type="text"
                    placeholder="Cognome*"
                    name="contactlast"
                    id="contactlast"
                />
            </div>
            <div className="contact-form-col-left">
                <input
                    type="text"
                    placeholder="Email*"
                    name="email"
                    id="email"
                />
            </div>
            <div className="contact-form-col-right">
                <input
                    type="text"
                    placeholder="Numero di telefono"
                    name="phone"
                    id="phone"
                />
            </div>
            <div className="contact-form-col-full">
                <textarea placeholder="Messaggio" name="message" id="message" />
            </div>
            <div className="contact-form-col-full">
                <button type="submit">Invia</button>
            </div>
        </form>
    );

    const StepB = () => (
        <div>
            <input
                type="number"
                placeholder="Risposta..."
                name="robotcheck"
                id="robotcheck"
                onChange={(e) => handleRobotCheck(e)}
            />
            <button
                onClick={() => handleSubmitRobotCheck("inserisci val di input")}
            >
                Invia
            </button>
        </div>
    );

    const StepC = () => (
        <div>Messaggio inviato! Ti risponderemo al piú presto</div>
    );

    return <>{activeStep === steps.length ? <Confirmation /> : <Form />}</>;
}
