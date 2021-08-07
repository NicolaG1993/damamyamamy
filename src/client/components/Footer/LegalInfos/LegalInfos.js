import { Link } from "react-router-dom";
import "./style/LegalInfos.css";

export default function LegalInfos() {
    return (
        <div
            className="legal-footer"
            // css={css`
            //     margin-top: ${parallaxHeight};
            //     transition: 1.1s ease;
            // `}
        >
            <h4>Informazioni</h4>
            <p>
                <Link to={"/example-doc"} document="">
                    Note legali
                </Link>
            </p>
            <p>
                <Link to={"/cookie-policy"}>Cookies policy</Link>
            </p>
            <p>
                <Link to={"/terms-conditions"}>Termini e condizioni</Link>
            </p>
            {/* <p>Metodi di pagamento / Spedizione</p> */}
        </div>
    );
}
