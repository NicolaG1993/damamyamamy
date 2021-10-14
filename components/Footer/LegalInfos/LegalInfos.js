import Link from "next/link";
import styles from "./style/LegalInfos.module.css";

export default function LegalInfos() {
    return (
        <nav className={styles["legal-footer"]}>
            <h4>Informazioni</h4>
            <ul>
                {/* <li>
                    <Link href={"/info/vendi"}>
                        <a>Come vendere</a>
                    </Link>
                </li>*/}
                <li>
                    <Link href={"/info/regolamento"}>
                        <a>Regolamento</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/info/note-legali"}>
                        <a>Note legali</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/info/cookie-policy"}>
                        <a>Cookies policy</a>
                    </Link>
                </li>
                {/* <li>
                    <Link href={"/info/termini-e-condizioni"}>
                        <a>Termini e condizioni</a>
                    </Link>
                </li> */}
                <li>
                    <Link href={"/info/faq"}>
                        <a>Domande frequenti</a>
                    </Link>
                </li>
                {/* <p>Metodi di pagamento / Spedizione</p> */}
            </ul>
        </nav>
    );
}
