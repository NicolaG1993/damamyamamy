import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";

import Review from "./Review";

export default function PaymentForm({ checkoutToken, shippingData, backStep }) {
    const [values, setValues] = useState({});
    console.log("shippingData: ", shippingData);

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target.form;
        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());
        // console.log("form data: ", allValues);

        setValues(allValues);
    };

    const handleSubmit = (e) => {
        console.log("handleSubmit: ", e);
    };

    return (
        <div className={""}>
            <h3></h3>Payment Form Component
            <form
                onChange={(e) => handleForm(e)}
                onSubmit={() => handleSubmit(values)}
            >
                <Review checkoutToken={checkoutToken} />
                <label>
                    First name *
                    <input
                        required
                        type="text"
                        name="firstName"
                        id="firstName"
                    />
                </label>

                <div>
                    <Link to="/cart">
                        <button onClick={() => backStep()}>
                            Torna indietro
                        </button>
                    </Link>
                    <button type="submit">Prosegui</button>
                </div>
            </form>
        </div>
    );
}
