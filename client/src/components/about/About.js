import { useEffect } from "react";

export default function About(props) {
    console.log("props in About.js: ", props);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="aboutus-comp">
            <div className="aboutus-comp-div aboutus-box1">
                <div className="aboutus-box1-pic"></div>
                <div className="aboutus-box1-text">
                    <h1>Benvenuti da Mamy a Mamy</h1>
                    <p>
                        Volevi vendere dei giocattoli mai usati di tuo figlio, o
                        quel vestitino ancora nuovo che ormai non gli va piú
                        bene?
                    </p>
                    <br />
                    <p>
                        Oppure stai facendo acquisti per il tuo bambino ma
                        vorresti anche risparmiare in sicurezza? Niente di piú
                        facile!
                    </p>
                </div>
            </div>
            <div className="aboutus-comp-div aboutus-box2">
                <div className="aboutus-box2-text">
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
                    <br />
                    <p>
                        Da Mamy a Mamy infatti nasce dall'idea di Sara
                        Gagliardi, due volte mamma, che sa quindi riconoscere al
                        meglio le esigenze delle proprie clienti, sempre
                        disponibile a dare consiglio sul prossimo acquisto per i
                        piú piccoli
                    </p>
                </div>
            </div>
            <div className="aboutus-comp-div aboutus-box3">
                <div className="aboutus-box3-text">
                    <p>
                        I prodotti in vendita sono sicuri al 100% per i bambini,
                        ogni articolo viene controllato ed approvato
                        singolarmente prima di essere messo in vendita; Inoltre
                        offriamo un servizio di spedizione dei prodotti,
                        disponibile in tutta Italia
                    </p>

                    <p>
                        Venite a trovarci in negozio, aperto dal lunedí al
                        venerdi, dalle 9:00 alle 16:00
                    </p>
                </div>
                <div className="aboutus-box3-pic"></div>
            </div>
        </div>
    );
}

/*









You've asked for a JavaScript solution, so here's the shortest I can get it:
*/
