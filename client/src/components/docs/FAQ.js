import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Docs.css";

const questions = [
    {
        id: 0,
        question: "Domanda 0",
        answer: "Io sono il testo che deve scendere dall'alto",
    },
    {
        id: 1,
        question: "Domanda 1",
        answer: "Io sono il testo che deve scendere dall'alto",
    },
    {
        id: 2,
        question: "Domanda 2",
        answer: "Io sono il testo che deve scendere dall'alto",
    },
];

export default function FAQ() {
    const [questionsState, setQuestionsState] = useState([]);

    useEffect(() => {
        //al caricamento aggiungere "open: false" ad ogni question
        let newObj = questions.map((el) => ({ ...el, open: false }));
        setQuestionsState(newObj);
        window.scrollTo(0, 0);
    }, []);

    const handleClick = (id) => {
        // crea nuovo array e loopa ogni el
        const newObj = questionsState.map((el) => {
            // se div(id) é chiuso aprilo
            if (el.id === id && !el.open) {
                return { ...el, open: true };
            }
            // altrimenti chiudi
            return { ...el, open: false };
        });
        setQuestionsState(newObj);
    };

    const setClassNames = (question) =>
        question.open ? "display-dropdown" : "hide-dropdown";
    const setClassNamesForP = (question) =>
        question.open ? "display-p" : "hide-p";

    console.log("questionsState ", questionsState);
    // potrei usare map per fare il render di ogni domanda con meno codice 🐲
    return (
        <div className={"document-comp"}>
            <h1>FAQ</h1>

            {questionsState &&
                questionsState.map((question) => (
                    <div key={question.id} className="dropdown-wrap">
                        <div onClick={() => handleClick(question.id)}>
                            <h3>{question.question}</h3>
                        </div>
                        <div className={setClassNames(question)}>
                            <p className={setClassNamesForP(question)}>
                                {question.answer}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
}
