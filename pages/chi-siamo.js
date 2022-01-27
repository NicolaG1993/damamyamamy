import Head from "next/head";
import Link from "next/link";
import styles from "../components/About/About.module.css";

function About() {
    return (
        <div id={styles["About"]}>
            <Head>
                <title>Chi siamo - Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Chi siamo - Da Mamy a Mamy"
                />
            </Head>

            <div
                className={`${styles["aboutus-comp-div"]} ${styles["aboutus-box1"]}`}
            >
                <div className={styles["aboutus-box1-text"]}>
                    <h1>Benvenuti da Mamy a Mamy</h1>
                    <p>
                        Volevi vendere dei giocattoli mai usati di tuo figlio, o
                        quel vestitino ancora nuovo che ormai non gli va piú
                        bene?
                    </p>

                    <p>
                        Oppure stai facendo acquisti per il tuo bambino ma
                        vorresti anche risparmiare in sicurezza? Niente di piú
                        facile!
                    </p>
                </div>
            </div>
            <div
                className={`${styles["aboutus-comp-div"]} ${styles["aboutus-box2"]}`}
            >
                <div className={styles["aboutus-box2-text"]}>
                    <h2>Chi siamo</h2>
                    <br />
                    <br />
                    <p>
                        Nasce Da Mamy a Mamy, il mercatino dell'usato dei
                        genitori, per gli acquisti per i vostri bambini.
                    </p>

                    <p>
                        Il nostro negozio ha aperto nel 2019 a Cavaion Veronese,
                        ed ha subito attirato l'attenzione di genitori e
                        famiglie, rivelandosi un'interessante novitá nella
                        provincia di Verona; Non solo perché si possono trovare
                        prodotti di qualitá in ottime condizioni, ma anche
                        perché i nostri clienti possono rivendere i loro
                        articoli trammite di noi, lasciandoci prendere cura
                        delle trattative e dei loro prodotti.
                    </p>

                    <p>
                        Da Mamy a Mamy infatti nasce dall'idea di Sara
                        Gagliardi, due volte mamma, che sa quindi riconoscere al
                        meglio le esigenze delle proprie clienti, sempre
                        disponibile a dare consiglio sul prossimo acquisto per i
                        piú piccoli
                    </p>
                    <br />

                    <h4>
                        <Link href={"/contatto"}>
                            <a>Contattaci!</a>
                        </Link>
                    </h4>
                </div>
                <div className={styles["aboutus-box2-pic"]}>
                    <div></div>
                </div>
            </div>
            <div
                className={`${styles["aboutus-comp-div"]} ${styles["aboutus-box3"]}`}
            >
                <div className={styles["aboutus-box3-text"]}>
                    <div>
                        <div></div>
                        <p>
                            I prodotti in vendita sono sicuri al 100% per i
                            bambini, ogni articolo viene controllato ed
                            approvato singolarmente prima di essere messo in
                            vendita; Inoltre offriamo un servizio di spedizione
                            dei prodotti, disponibile in tutta Italia
                        </p>
                    </div>

                    <div>
                        <p>
                            La pratica del riutilizzo fa bene al pianeta e al
                            portafoglio
                            {/* Per noi é importante il pianeta, comprare articoli
                            di seconda mano aiuta a sensibilizzare alla
                            sostenibilitá ed al riutilizzo di oggetti. Educando
                            inoltre i piú piccoli al riutilizzo, che saranno il
                            nostro futuro, bla bla sistemare */}
                        </p>
                        <div></div>
                    </div>

                    <div>
                        <div></div>
                        <p>
                            {/* 1 Qualitá 2 Pianeta 3 Servizio Accessori
                            Abbigliamento e Giocattoli di seconda mano Bambini
                            0-10 Anni */}
                        </p>
                    </div>
                </div>
                {/* <div className="aboutus-box3-pic">
                    <div></div>
                </div> */}
            </div>
        </div>
    );
}

export default About;
