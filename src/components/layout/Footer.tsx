import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                {/* Da Mamy a Mamy */}
                <div className={styles.wrap}>
                    <div>
                        <h4>Informazioni</h4>
                        <ul>
                            <li>
                                <Link href={"/info/regolamento"}>
                                    Regolamento
                                </Link>
                            </li>
                            {/* <li>
                                <Link href={"/info/note-legali"}>
                                    Note legali
                                </Link>
                            </li>
                            <li>
                                <Link href={"/info/cookie-policy"}>
                                    Cookies policy
                                </Link>
                            </li> */}

                            {/* <li>
                                <Link href={"/info/faq"}>
                                    Domande frequenti
                                </Link>
                            </li> */}
                            {/* <p>Metodi di pagamento / Spedizione</p> */}
                        </ul>
                    </div>

                    <div>
                        <h4>Da Mamy a Mamy</h4>
                        <ul>
                            <li>
                                <p>Via Tosin, 1, 37010</p>
                            </li>
                            <li>
                                <p>Cavaion, Verona, IT</p>
                            </li>
                            <li>
                                <a href="tel:+393479792644">
                                    (+39) 347 9792 644
                                </a>
                            </li>
                            <li>
                                <a href="mailto:damamyamamy@gmail.com">
                                    damamyamamy@gmail.com
                                </a>
                            </li>
                            {/* <li>
                                <Link href="/orari">
                                    <strong>Vedi orari di apertura</strong>
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>

            <Copyrights />
        </footer>
    );
}

function Copyrights() {
    const currentYear = new Date().getFullYear();
    return (
        <div className={styles.copyrights}>
            Da Mamy a Mamy, © {currentYear} • by{" "}
            <a
                href="https://nicogdesign.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                NGD
            </a>
        </div>
    );
}
