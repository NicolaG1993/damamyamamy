export default function Confirmation({ isFinished, isFailed, backStep }) {
    if (isFinished) {
        return (
            <>
                <div className="success">
                    <p>Messaggio inviato!</p>
                </div>
                <p onClick={() => backStep()} style={{ cursor: "pointer" }}>
                    Torna indietro
                </p>
            </>
        );
    } else if (isFailed) {
        return (
            <>
                <div className="error">
                    <p>
                        Sembra esserci un errore, non abbiamo ricevuto questo
                        messaggio. Riprova o contattaci direttamente via email o
                        via telefono.
                    </p>
                </div>
                <p onClick={() => backStep()} style={{ cursor: "pointer" }}>
                    Torna indietro
                </p>
            </>
        );
    } else {
        return <div className="loader">Attendere, invio in corso...</div>;
    }
}
