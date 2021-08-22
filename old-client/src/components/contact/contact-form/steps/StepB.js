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
        setAnswer(e.target.valueAsNumber);
    };

    const handleSubmit = () => {
        if (rightAnswer === answer) {
            console.log("right answer: ", answer);
            confirmAndSend();
        } else {
            console.log("wrong answer: ", answer);
        }
    };

    return (
        <div className="stepB">
            <div>
                <label>Quanto fa 2 + 3?</label>
                <input
                    type="number"
                    placeholder="Risposta..."
                    name="robotcheck"
                    id="robotcheck"
                    onChange={(e) => handleChange(e)}
                />
            </div>

            <div>
                <button className={"layout-button btn2"} onClick={backStep}>
                    Torna indietro
                </button>
                <button
                    className={"layout-button btn2"}
                    onClick={() => handleSubmit(answer)}
                >
                    Invia
                </button>
            </div>
        </div>
    );
}
