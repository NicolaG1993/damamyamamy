import React, { useState } from "react";

export default function StepA({ next }) {
    const [values, setValues] = useState({});
    // console.log("values: ", values);

    const handleForm = (e) => {
        // console.log("e: ", e);
        e.preventDefault();
        const form = e.target.form;
        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());
        setValues(allValues);
    };

    const handleSubmit = () => {
        // console.log("values: ", values);
        //handle error 🐔

        // if (
        //     !values.email ||
        //     !values.contactname ||
        //     !values.contactlast ||
        //     !values.message
        // ) {
        // }

        next(values);
    };

    return (
        <form
            className="contact-form"
            onChange={(e) => handleForm(e)}
            onSubmit={() => handleSubmit(values)}
        >
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
}
