import { Link } from "react-router-dom";

export default function StepC({ isFailed, isFinished, error }) {
    if (isFinished) {
        return <div>Messaggio inviato! Ti risponderemo al piú presto</div>;
    }

    if (isFailed) {
        return (
            <div>
                Messaggio non inviato! Cé stato un errore {error}
                <br />
                <Link to="/">Torna al sito</Link>
            </div>
        );
    } else return null;
}
