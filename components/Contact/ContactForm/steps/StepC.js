import Button from "../../../Button/Button";

export default function StepC({ isFailed, isFinished, error, styles }) {
    console.log("error: ", error);
    if (isFinished) {
        return <div>Messaggio inviato! Ti risponderemo al piú presto</div>;
    }

    if (isFailed) {
        return (
            <div>
                <p>Messaggio non inviato! Cé stato un errore</p>
                <p>{error && error}</p>
                <Button page="/" text="Torna al sito" type="internal" />
            </div>
        );
    } else return null;
}
