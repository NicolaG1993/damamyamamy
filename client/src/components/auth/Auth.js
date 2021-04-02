import { Link } from "react-router-dom";
import ProfilePic from "../profile/ProfilePic";

export default function Auth(props) {
    console.log("props in Auth.js: ", props);

    if (!props.userId) {
        return (
            <div className="auth-container" onClick={props.toggleAccessForm}>
                Accedi
            </div>
        );
    }
    if (props.userId) {
        return (
            <Link className="auth-container" to={"/profile"}>
                <ProfilePic
                    firstName={props.first}
                    lastName={props.last}
                    profilePicUrl={props.profilePicUrl}
                    size="small"
                />
            </Link>
        );
    }
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
🐲
*/

/*
AGGIORNAMENTO!!!
come migliore questa parte:
in caso non cé userId, sarebbe da avere un toggleForm al posto del link /login (che passiamo in props)
cosí il form per accedere sará un component che apparirá in fronte della pagina attuale, con un btn per chiuderlo
e la possibilitá di switchare fra login e registration
inoltre questo form sará disponibile in app solo se non cé userId, altrimenti non verrá caricato nell'html
🐔
*/
