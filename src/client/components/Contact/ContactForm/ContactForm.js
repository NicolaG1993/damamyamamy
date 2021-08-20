import { useState, memo } from "react";
import axios from "../../../lib/axios";
import "./style/ContactForm.css";

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
        //here -> using try catch and axios
        try {
            const resp = await axios.post("/contact", contactReq);
            console.log("resp: ", resp);
            if (resp.data.emailSended) {
                setIsFinished(true);
            } else {
                setIsFailed(true);
            }
        } catch (err) {
            console.log("err in /contact: ", err); //handle error
            setError(err);
            setIsFailed(true);
        }
    };

    const Form = () =>
        activeStep === 0 ? (
            <StepA next={next} contactReq={contactReq} />
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
        <div className="contact-form-component">
            <h1 className="contact-form-col-full">
                Contatta <span id="line-breaker"></span>da Mamy a Mamy
            </h1>
            {activeStep === steps.length ? <Confirmation /> : <Form />}
        </div>
    );
}

export const MemoizedContactForm = memo(ContactForm);
