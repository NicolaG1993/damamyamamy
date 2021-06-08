import React, { useState } from "react";
import axios from "../../../axios";

import StepA from "./steps/StepA";
import StepB from "./steps/StepB";
import StepC from "./steps/StepC";

const steps = ["Contact", "Robot Check"];

export default function ContactForm() {
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
            //non so se é scritta giusta ancora 🐔
        } catch (err) {
            console.log("err in contact-us: ", err); //handle error 🐔
            setError(err);
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

    if (error) {
        Confirmation = () => {
            return <StepC isFailed={isFailed} error={error} />;
        };
    }

    return <>{activeStep === steps.length ? <Confirmation /> : <Form />}</>;
}

// ho provato ad unire tutto in questo component, ma su ogni input nel form mi si resettava lo state o il component, why?
//sembrava come un reload
//adesso che é diviso per steps in altri files sembra funzionare
