import { Link } from "react-router-dom";

export default function StepC({ isFailed, isFinished, error }) {
    isFailed && (
        <div>
            Messaggio non inviato! Cé stato un errore {error}
            <br />
            <Link to="/">Torna al sito</Link>
        </div>
    );
    isFinished && <div>Messaggio inviato! Ti risponderemo al piú presto</div>;
}
