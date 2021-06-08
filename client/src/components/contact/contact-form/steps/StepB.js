import React, { useState } from "react";

let rightAnswer = 5;

export default function StepB({ backStep, confirmAndSend }) {
    const [answer, setAnswer] = useState();

    // const send = (e) => {
    //     e.preventDefault();

    //     axios
    //         .post("/contact-us", {
    //             contactReq,
    //         })
    //         .then((res) => {
    //             console.log(res);
    //         });
    // };

    const handleChange = (e) => {
        e.preventDefault();
        console.log("e in handleChange: ", e);
        setAnswer(e);
    };

    const handleSubmit = () => {
        if (rightAnswer === answer) {
            confirmAndSend();
        } else {
            console.log("wrong answer: ", answer);
        }
    };

    return (
        <div>
            <span>Quanto fa 2 + 3?</span>
            <input
                type="number"
                placeholder="Risposta..."
                name="robotcheck"
                id="robotcheck"
                onChange={(e) => handleChange(e)}
            />
            <button onClick={backStep}>Torna indietro</button>
            <button onClick={() => handleSubmit(answer)}>Invia</button>
        </div>
    );
}
