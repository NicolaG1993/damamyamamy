"use client";

import ContactForm from "@/components/forms/ContactForm";
import { useState } from "react";
import Confirmation from "./Confirmation";
import {
    emailValidation,
    nameValidation,
    textValidation,
} from "@/utils/validateInput";

export default function Contatto() {
    //================================================================================
    // Component State
    //================================================================================
    const [formState, setFormState] = useState({
        first: "",
        last: "",
        email: "",
        phone: "",
        message: "",
        sender: "Da Mamy a Mamy • Contattaci",
        domain: "damamyamamy.com",
    });
    const [activeStep, setActiveStep] = useState(1);
    const [isFinished, setIsFinished] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [errors, setErrors] = useState({});

    //================================================================================
    // Functions
    //================================================================================
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const newState = { ...formState, [name]: value };
        setFormState(newState);
    };

    const nextStep = () => {
        setActiveStep((prev) => (prev <= 2 ? prev + 1 : 2));
    };
    const backStep = () => {
        setActiveStep((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const validateData = (key, value) => {
        // e.preventDefault();
        if (!value) {
            value = "";
        }
        // validate data + setErrors
        let newErrObj = errors;
        if (key === "first" || key === "last") {
            const resp = nameValidation("nome", value);
            if (resp) {
                newErrObj[key] = resp;
            } else {
                delete newErrObj[key];
            }
        }
        if (key === "email") {
            const resp = emailValidation(value);
            if (resp) {
                newErrObj[key] = resp;
            } else {
                delete newErrObj[key];
            }
        }
        if (key === "message") {
            const resp = textValidation(value);
            if (resp) {
                newErrObj[key] = resp;
            } else {
                delete newErrObj[key];
            }
        }

        setErrors((prev) => ({ ...prev, ...newErrObj }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Object.entries(formState).map(([key, value]) =>
            validateData(key, value)
        );

        if (Object.keys(errors).length === 0) {
            recaptchaRef.current.execute();
        }
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
    // Render UI
    //================================================================================
    if (activeStep === 1) {
        return (
            <ContactForm
                handleChange={handleChange}
                formState={formState}
                sendEmail={sendEmail}
                errors={errors}
                validateData={validateData}
                handleSubmit={handleSubmit}
            />
        );
    } else if (activeStep === 2) {
        return (
            <div className="center">
                <Confirmation
                    isFinished={isFinished}
                    isFailed={isFailed}
                    backStep={backStep}
                />
            </div>
        );
    }
}
