import Link from "next/link";
import styles from "./style/Nav.module.css";

export default function Nav() {
    return (
        <nav className={styles["footer-nav"]}>
            <h4>Links</h4>
            <ul>
                <li>
                    <Link href="/chi-siamo">
                        <a>Chi siamo</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop">
                        <a>Prodotti</a>
                    </Link>
                </li>
                <li>
                    <Link href="/document">
                        <a>Vendi</a>
                    </Link>
                </li>
                <li>
                    <Link href="/FAQ">
                        <a>Domande frequenti</a>
                    </Link>
                </li>
                <li>
                    <Link href="/contatto">
                        <a>Contattaci / Assistenza</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
