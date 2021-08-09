import { Link } from "react-router-dom";
import "./style/LegalInfos.css";

export default function LegalInfos() {
    return (
        <nav className="legal-footer">
            <h4>Informazioni</h4>
            <ul>
                <li>
                    <Link to={"/example-doc"}>Note legali</Link>
                </li>
                <li>
                    <Link to={"/cookie-policy"}>Cookies policy</Link>
                </li>
                <li>
                    <Link to={"/terms-conditions"}>Termini e condizioni</Link>
                </li>
                {/* <p>Metodi di pagamento / Spedizione</p> */}
            </ul>
        </nav>
    );
}
