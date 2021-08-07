import { Link } from "react-router-dom";
import "./style/Nav.css";

export default function Nav() {
    return (
        <nav className="footer-nav">
            <h4>Links</h4>
            <ul>
                <li>
                    <Link to="/about">Chi siamo</Link>
                </li>
                <li>
                    <Link to="/shop">Prodotti</Link>
                </li>
                <li>
                    <Link to="/document">Vendi</Link>
                </li>
                <li>
                    <Link to="/FAQ">Domande frequenti</Link>
                </li>
                <li>
                    <Link to="/contact">Contattaci / Assistenza</Link>
                </li>
            </ul>
        </nav>
    );
}
