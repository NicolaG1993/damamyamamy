import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer>
                {/* Da Mamy a Mamy */}
                <div>
                    <h4>Da Mamy a Mamy</h4>
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
                                <strong>Vedi orari di apertura</strong>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4>Informazioni</h4>
                    <ul>
                        <li>
                            <Link href={"/info/regolamento"}>Regolamento</Link>
                        </li>
                        <li>
                            <Link href={"/info/note-legali"}>Note legali</Link>
                        </li>
                        <li>
                            <Link href={"/info/cookie-policy"}>
                                Cookies policy
                            </Link>
                        </li>

                        <li>
                            <Link href={"/info/faq"}>Domande frequenti</Link>
                        </li>
                        {/* <p>Metodi di pagamento / Spedizione</p> */}
                    </ul>
                </div>
            </footer>
            <Copyrights />
        </>
    );
}

function Copyrights() {
    const currentYear = new Date().getFullYear();
    return (
        <div className={"copyrights"}>
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
