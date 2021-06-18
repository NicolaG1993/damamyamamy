import React, { useState } from "react";
import axios from "../../../axios";
import "../../../styles/ContactForm.css";

import StepA from "./steps/StepA";
import StepB from "./steps/StepB";
import StepC from "./steps/StepC";

const steps = ["Contact", "Robot Check"];

function ContactForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [contactReq, setContactReq] = useState({});
    const [error, setError] = useState();

    // console.log("contactReq: ", contactReq);

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const next = (data) => {
        setContactReq(data);
        nextStep();
    };
    const confirmAndSend = async () => {
        nextStep();
        try {
            const resp = await axios.post("/contact-us", contactReq);
            console.log("resp: ", resp);

            if (resp.data.emailSended) {
                setIsFinished(true);
            } else {
                setIsFailed(true);
            }
        } catch (err) {
            console.log("err in contact-us: ", err); //handle error 🐔
            setError(err);
            setIsFailed(true);
        }
    };

    const Form = () =>
        activeStep === 0 ? (
            <StepA
                next={next}
                nextStep={nextStep}
                setContactReq={setContactReq}
                contactReq={contactReq}
            />
        ) : (
            <StepB backStep={backStep} confirmAndSend={confirmAndSend} />
        );

    let Confirmation = () => {
        if (isFinished) {
            return <StepC isFinished={isFinished} />;
        } else {
            return <div className="loader"></div>;
        }
    };

    if (error || isFailed) {
        Confirmation = () => {
            return <StepC isFailed={isFailed} error={error} />;
        };
    }

    return (
        <div className="contact-form-wrap">
            <h1 className="contact-form-col-full">Contatta da Mamy a Mamy</h1>
            {activeStep === steps.length ? <Confirmation /> : <Form />}
        </div>
    );
}

export const MemoizedContactForm = React.memo(ContactForm);

// ho provato ad unire tutto in questo component, ma su ogni input nel form mi si resettava lo state o il component, why?
//sembrava come un reload
//adesso che é diviso per steps in altri files sembra funzionare
