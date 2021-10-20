import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../../components/Documents/faq.module.css";

const questions = [
    {
        id: 0,
        question: "Domanda 0",
        answer: "Nessun testo inserito",
    },
    {
        id: 1,
        question: "Domanda 1",
        answer: "Nessun testo inserito",
    },
    {
        id: 2,
        question: "Domanda 2",
        answer: "Nessun testo inserito",
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
    // uso map per fare il render di ogni domanda con meno codice
    return (
        <div id={styles["FAQ"]}>
            <Head>
                <title>Domande frequenti - Da Mamy a Mamy</title>
                <meta
                    property="og:title"
                    content="Domande frequenti - Da Mamy a Mamy"
                />
                <meta property="og:type" content="website" />
            </Head>
            <h1>Domande frequenti</h1>

            {questionsState &&
                questionsState.map((question) => (
                    <div key={question.id} className={styles["dropdown-wrap"]}>
                        <div onClick={() => handleClick(question.id)}>
                            <h3>{question.question}</h3>
                        </div>
                        <div className={styles[setClassNames(question)]}>
                            <p className={styles[setClassNamesForP(question)]}>
                                {question.answer}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
}
