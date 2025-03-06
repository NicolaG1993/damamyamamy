import Link from "next/link";

export default function Regolamento() {
    return (
        <div className="document">
            <main>
                <section>
                    <div className={"textWrap"}>
                        <h1>Regolamento</h1>
                        <div>
                            <h2>
                                Da Mamy a Mamy è un&apos;agenzia d&apos;affari
                                che mette a disposizione dei privati un servizio
                                di esposizione e di intermediazione per la
                                compravendita di articoli usati.
                            </h2>
                        </div>

                        <div>
                            <h3>PER CHI VENDE</h3>
                            <div className={"textBlock"}>
                                <p className={"strong"}>
                                    1) Il codice cliente.
                                </p>
                                <p>
                                    È strettamente personale e deve essere
                                    presentato ad ogni operazione di carico
                                    merce in conto vendita, di acquisto, di
                                    ritiro del rimborso o caparra. Alla prima
                                    registrazione bisogna presentare un
                                    documento d&apos;identità e codice fiscale.
                                </p>
                            </div>
                            <div className={"textBlock"}>
                                <p className={"strong"}>
                                    2) La merce viene esposta gratuitamente per
                                    60 giorni al prezzo di valutazione.
                                </p>
                                <p>
                                    E&apos;compito dell&apos;intermediario
                                    decidere il prezzo di vendita al cliente
                                    finale; di solito il prezzo sarà di circa il
                                    50% rispetto al valore commerciale
                                    dell&apos;articolo nuovo. Dopo 60 gg la
                                    merce sarà scontata del 50% e rimarrà
                                    esposta per ulteriori 90 gg. Gli oggetti non
                                    venduti entro i 3 mesi verranno dismessi nei
                                    seguenti modi: cessione al miglior realizzo,
                                    devoluzione in beneficenza o smaltimento
                                    presso discariche. Se nel periodo di
                                    esposizione dei tuoi articoli cambi idea,
                                    puoi ritirarli non prima dei 60 giorni di
                                    esposizione, avvisando almeno tre giorni
                                    prima per poter preparare il reso.
                                    L&apos;intermediario può rifiutarsi di
                                    prendere in custodia beni ritenuti non
                                    adatti alla vendita per qualsiasi motivo.
                                </p>
                            </div>
                            <div className={"textBlock"}>
                                <p className={"strong"}>
                                    3) Sarà cura del proprietario verificare i
                                    tempi di esposizione.
                                </p>
                                <p>
                                    Con una semplice telefonata puoi monitorare
                                    lo stato delle tue vendite e incassare il
                                    tuo rimborso. I rimborsi vengono eseguiti in
                                    contanti, dopo 15 giorni dalla vendita,
                                    passando in negozio e presentando il codice
                                    cliente e solo al titolare dello stesso. Il
                                    rimborso viene eseguito per il valore di
                                    vendita concordato dell&apos;oggetto,
                                    detratto del 50% di provvigione per il
                                    servizio di “Da Mamy a Mamy”; per importi
                                    superiori ai 50€ verranno emessi solo previo
                                    appuntamento. Dopo un anno dallo scadere del
                                    mandato, il mandante perde il diritto di
                                    riscossione (art.2964 Codice Civile).
                                </p>
                            </div>
                            <div className={"textBlock"}>
                                <p className={"strong"}>
                                    4) Si consiglia di evidenziare eventuali
                                    difetti.
                                </p>
                                <p>
                                    Alcune volte possono sfuggire al momento
                                    dell&apos;accettazione del pezzo (vizi
                                    occulti), non necessariamente pregiudicano
                                    l&apos;accettazione dello stesso, ma
                                    piuttosto una semplice riduzione del prezzo
                                    di vendita, con la messa in evidenza, a chi
                                    acquista, del difetto medesimo.
                                    Diversamente, un reso, accettato dal
                                    mandatario, per un difetto occulto, dovrà
                                    essere restituito al mandante. Lo stesso
                                    sarà avvisato telefonicamente al numero
                                    fornito nel momento del conferimento del
                                    mandato di vendita e dopo 5 giorni solari,
                                    se non ritirato, sarà devoluto in
                                    beneficenza o scontato di una percentuale a
                                    totale discrezione del mandatario.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3>PER CHI COMPRA</h3>
                            <p>
                                Come tutte le agenzie di intermediazione, non
                                siamo tenuti all&apos;emissione di scontrino
                                fiscale nei confronti dei compratori in quanto
                                trattiamo beni di provenienza da privati.
                            </p>
                        </div>

                        <div>
                            <h3>RESO \ CAMBIO</h3>
                            <p>
                                I resi\cambi sono ammessi se effettuati entro 12
                                ore successive all’acquisto solo ed
                                esclusivamente con etichetta identificativa
                                dell’articolo da rendere\cambiare, integra e
                                leggibile. Per le attrezzature possono essere
                                valutati eventuali resi solo se effettuati nelle
                                12 ore successive all’acquisto. I resi\cambi non
                                saranno rimborsati in denaro ma con buoni
                                acquisto della durata di 3 mesi. Sono sempre
                                esclusi dalla possibilità di reso\cambio:
                                costumi di carnevale, abbigliamento e accessori
                                sci, accessori mare e gli abiti da cerimonia.
                            </p>
                        </div>

                        <div>
                            <h3>NON ESISTE GARANZIA</h3>
                            <p>
                                Il Compratore riconosce e accetta che gli
                                oggetti acquistati sono di provenienza privata e
                                di seconda mano. Il Venditore, con la stipula
                                del mandato di vendita e il conferimento degli
                                oggetti da vendere all’Agenzia, si è avvalso
                                dell’esclusione della garanzia sugli stessi.
                            </p>
                        </div>

                        <div className={"ctas"}>
                            <Link className="primary" href={"/contatto"}>
                                Contattaci per maggiori informazioni
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
