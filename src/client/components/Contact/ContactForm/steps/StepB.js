import { useState } from "react";
import Button from "../../../Button/Button";

let rightAnswer = 5;

export default function StepB({ backStep, confirmAndSend }) {
    const [answer, setAnswer] = useState();

    const handleChange = (e) => {
        e.preventDefault();
        setAnswer(e.target.valueAsNumber);
    };

    const handleSubmit = () => {
        if (rightAnswer === answer) {
            console.log("right answer! ", answer);
            confirmAndSend();
        } else {
            console.log("wrong answer! ", answer);
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
                <Button text="Torna indietro" type="function" fn={backStep} />
                <Button
                    text="Invia"
                    type="function"
                    fn={() => handleSubmit(answer)}
                />
            </div>
        </div>
    );
}
