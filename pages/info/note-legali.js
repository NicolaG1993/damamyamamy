import Head from "next/head";
import styles from "../../components/Documents/Document.module.css";

export default function NoteLegali() {
    return (
        <div className={styles["document-comp"]}>
            <Head>
                <title>Note legali - Da Mamy a Mamy</title>
                <meta
                    property="og:title"
                    content="Note legali - Da Mamy a Mamy"
                />
                <meta property="og:type" content="website" />
            </Head>
            <h1>Dati dell&apos;Azienda</h1>

            <div className={styles["document-text-wrap"]}>
                <h3>Da Mamy a Mamy</h3>
                <p>di Sara Gagliardi</p>
                <p>Partita Iva: 04625930237</p>
                <p>C.F.: GGLSRA74P48H330M</p>
                <p>
                    Agenzia d&apos;affari per la vendita per conto di terzi
                    (art. 115 T.U.L.P.S.)
                </p>

                <div className={styles["end-paragraph"]}></div>

                <p>Telefono: 347 9792644</p>
                <div className={styles["end-paragraph"]}></div>
            </div>
        </div>
    );
}
