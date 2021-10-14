import Link from "next/link";
import styles from "./style/ContactCard.module.css";

export default function ContactCard() {
    return (
        <nav className={styles["contact-footer"]}>
            <h4>Contatto</h4>
            <ul>
                <li>
                    <p>Vicolo Teatro, 4, 37010</p>
                </li>
                <li>
                    <p>Cavaion, Verona, IT</p>
                </li>
                <li>
                    <a href="tel:+393479792644">(+39) 347 9792 644</a>
                </li>
                <li>
                    <a href="mailto:damamyamamy@gmail.com">
                        damamyamamy@gmail.com
                    </a>
                </li>
                <li>
                    <Link href="/contatto">
                        <a>
                            <strong>Vedi orari di apertura</strong>
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
