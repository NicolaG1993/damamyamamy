import { Link } from "react-router-dom";

export default function Auth() {
    return <div className="auth-container"></div>;
}

/*
if userId -> vai a profilo
else vai a login o registration

secondo me posso usare solo la route profilo in app e reindirizzo con middleware?
forse non va bene perché vorrei che l'utente puo scegliere se andare a login o registration

!!!
meglio fare un if su cosa ritorna: profilePic con link
oppure i due button per accedere o registrarsi

lo userId posso riceverlo con una axios req qui oppure passarlo da App con props

anzi, si va direttamente ad accedi
*/
