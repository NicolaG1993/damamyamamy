import { useState, memo } from "react";
import axios from "../../../shared/libs/axios";
import styles from "./style/ContactForm.module.css";

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

        const endpoint =
            "https://2e2918qjnk.execute-api.eu-central-1.amazonaws.com/dev/contact-us";

        //here -> using try catch and axios
        try {
            const resp = await axios.post(endpoint, contactReq);
            console.log("resp: ", resp);
            if (resp.data.emailSended) {
                setIsFinished(true);
            } else {
                setIsFailed(true);
                setError(resp.data.body);
            }
        } catch (err) {
            console.log("err in /contact: ", err); //handle error
            setError(err);
            setIsFailed(true);
        }
    };

    const Form = () =>
        activeStep === 0 ? (
            <StepA next={next} contactReq={contactReq} styles={styles} />
        ) : (
            <StepB
                backStep={backStep}
                confirmAndSend={confirmAndSend}
                styles={styles}
            />
        );

    let Confirmation = () => {
        if (isFinished) {
            return <StepC isFinished={isFinished} styles={styles} />;
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
        <div className={styles["contact-form-component"]}>
            <h1 className={styles["contact-form-col-full"]}>
                Contatta <span id="line-breaker"></span>da Mamy a Mamy
            </h1>
            {activeStep === steps.length ? <Confirmation /> : <Form />}
        </div>
    );
}

export const MemoizedContactForm = memo(ContactForm);
