import Head from "next/head";
import Link from "next/link";

export default function ChiSiamo() {
    return (
        <>
            <Head>
                <title>Chi siamo • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Chi siamo • Da Mamy a Mamy"
                />
            </Head>
            <main>
                <section className="page" id="About">
                    <h1>Chi siamo</h1>

                    <div className={"document-text-wrap"}>
                        <div>
                            <p>
                                Volevi vendere dei giocattoli mai usati di tuo
                                figlio, o quel vestitino ancora nuovo che ormai
                                non gli va piú bene? Oppure stai facendo
                                acquisti per il tuo bambino ma vorresti anche
                                risparmiare in sicurezza? Niente di piú facile!
                                A Cavaion Veronese nasce il negozio di
                                abbigliamento e giocattoli di seconda mano per
                                bambini da 0 a 10 anni.
                            </p>
                        </div>

                        <div>
                            <h2>Su di noi</h2>
                            <p>
                                Da Mamy a Mamy ha aperto nel 2019, ed ha subito
                                attirato l&apos;attenzione di genitori e
                                famiglie, rivelandosi un&apos;interessante
                                novitá nella provincia di Verona; Non solo
                                perché si possono trovare prodotti di qualitá in
                                ottime condizioni, ma anche perché i nostri
                                clienti possono rivendere i loro articoli
                                trammite il nostro negozio, lasciandoci prendere
                                cura delle trattative e dei loro prodotti. Da
                                Mamy a Mamy infatti nasce dall&apos;idea di Sara
                                Gagliardi, due volte mamma, che sa quindi
                                riconoscere al meglio le esigenze delle proprie
                                clienti, sempre disponibile a dare consiglio sul
                                prossimo acquisto per i piú piccoli.
                            </p>
                        </div>

                        <div>
                            <p>
                                I prodotti in vendita sono sicuri al 100% per i
                                bambini, ogni articolo viene controllato ed
                                approvato singolarmente prima di essere messo in
                                vendita; Inoltre offriamo un servizio di
                                spedizione dei prodotti, disponibile in tutta
                                Italia.
                            </p>

                            {/* <p>
                                La pratica del riutilizzo fa bene al pianeta e
                                al tuo portafoglio!
                            </p>

                            <p>
                                Offriamo il migliore servizio, controllando ogni
                                prodotto
                            </p> */}
                        </div>

                        <div className={"document-button-wrap"}>
                            <Link
                                href={"/documenti/regolamento"}
                                className="button"
                            >
                                Leggi il regolamento
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
