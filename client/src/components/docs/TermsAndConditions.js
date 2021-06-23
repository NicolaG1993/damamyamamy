import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Docs.css";

export default function TermsAndConditions() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={"document-comp"}>
            <h1>Termini e condizioni</h1>

            <div className={"document-text-wrap"}>
                <h3>TERMINI LEGALI</h3>
                <p>
                    Accedendo alla vetrina dei negozi Mercatino gli utenti si
                    impegnano ad accettare e concordare di attenersi al rispetto
                    di tutte le condizioni contenute nel sito
                    www.mercatinousato.com. Gli utenti che non accettino o non
                    intendano rispettare tali termini sono pregati di astenersi
                    dall’utilizzo del sistema e-commerce. L&apos;accesso al sito
                    e ai relativi servizi è destinato esclusivamente
                    all’utilizzo personale. La visualizzazione del sito
                    www.mercatinousato.com fornisce al cliente informazioni sui
                    prodotti proposti dai negozi Mercatino insieme alla
                    possibilità di acquisto degli stessi.
                </p>
                <div className="end-paragraph"></div>

                <h3>DEFINIZIONE DI CLIENTE</h3>
                <p>
                    I prodotti in vendita nei negozi Mercatino sono destinati al
                    consumatore finale, per cui non possono essere emesse
                    fatture ad aziende con partita iva. Invitiamo gli utenti non
                    riconducibili alla definizione sopra descritta ad astenersi
                    dallo stabilire rapporti commerciali con i negozi Mercatino.
                </p>
                <div className="end-paragraph"></div>

                <h3>DISPONIBILITÀ DI PRODOTTI</h3>
                <p>
                    L’assortimento presente sul sito è collegato a tutti i
                    negozi affiliati alla catena Mercatino compra vendita usato.
                    Tuttavia una richiesta di prenotazione (non vincolante)
                    d’ordine sul sito potrebbe coincidere con un contemporaneo
                    acquisto nei Mercatini fisici da parte di clienti privati:
                    per questo motivo, ad ogni prenotazione/richiesta d’ordine
                    ricevuta, il negozio Mercatino si riserva il diritto di
                    confermare la disponibilità degli articoli prenotati.
                    Nell’eventualità in cui gli articoli richiesti non siano
                    disponibili e/o nel caso in cui l’ordine non possa essere
                    evaso come da richiesta, il negozio Mercatino darà
                    tempestiva comunicazione al cliente.
                </p>
                <div className="end-paragraph"></div>

                <h3>PROPRIETÀ DEI CONTENUTI</h3>
                <p>
                    Tutto il contenuto del sito www.mercatinousato.com è
                    proprietà della Mercatino S.r.l., ivi compresi documenti,
                    fotografie, immagini, caratteri, design, codici e format
                    scripts. Il materiale contenuto nel sito web è protetto da
                    diritto d’autore secondo la Legge 22 aprile 1941, n. 633 e
                    successive modifiche. Qualsiasi riproduzione, alterazione,
                    trasmissione, pubblicazione o ridistribuzione a terzi, per
                    scopi commerciali, è severamente vietata se priva di
                    espresso consenso scritto fornito dalla Mercatino S.r.l.
                </p>
                <div className="end-paragraph"></div>

                <h3>RESPONSABILITÀ DEL SITO</h3>
                <p>
                    Mercatino S.r.l. proprietaria del sito
                    www.mercatinousato.com pubblica informazioni sui propri siti
                    al fine di fornire un servizio ai clienti, ma declina ogni
                    responsabilità in caso di inesattezze tecniche o errori
                    tipografici, per i quali è prevista correzione in seguito a
                    segnalazione. Mercatino S.r.l. si riserva il diritto di
                    correggere testi o modificare aree dei siti ad ogni livello
                    nel momento in cui lo ritenga necessario e senza preavviso
                    alcuno. Mercatino S.r.l. non offre garanzie sulla conformità
                    delle informazioni pubblicate sui propri siti e dei siti dei
                    propri Affiliati e declina ogni responsabilità relativa a
                    eventuali problemi, danni o rischi che l&apos;utente può
                    incontrare durante l’utilizzo dei siti. Mercatino S.r.l.
                    garantisce che i propri siti sono protetti secondo gli
                    standard internazionali previsti per Internet: se li usa
                    correttamente, l’utente è protetto dal rischio di virus.
                    Mercatino S.r.l. declina ogni responsabilità relativa a
                    malfunzionamenti legati alla disattivazione dei cookies nel
                    browser dell&apos;utente. Mercatino S.r.l. si riserva il
                    diritto di rettificare in forma scritta i termini e le
                    condizioni contenute nel sito ogni qualvolta lo ritenga
                    opportuno, senza obbligo di preavviso. L&apos;utente è
                    altresì tenuto ad attenersi ai termini contenuti nelle varie
                    aree del sito, controllando periodicamente la presenza di
                    eventuali aggiornamenti.
                </p>
                <div className="end-paragraph"></div>

                <h3>LEGISLAZIONE ITALIANA</h3>
                <p>
                    Gli utenti che accedono al presente sito dichiarano di
                    accettare che tutte le questioni relative all&apos;utilizzo
                    del sito web www.mercatinousato.com e dei suoi servizi siano
                    regolate dalla legislazione vigente dello Stato italiano.
                    Dichiarano inoltre di assoggettarsi esclusivamente alla
                    competenza del Foro di Verona per le questioni sopracitate.
                    Mercatino S.r.l. non garantisce in alcun modo che il
                    contenuto del sito sia conforme alle normative vigenti in
                    altri paesi. L&apos;accesso al sito www.mercatinousato.com
                    da luoghi in cui i relativi contenuti sono considerati
                    illegali è espressamente proibito: gli utenti che decidano
                    di accedere al sito da tali paesi sono pienamente
                    consapevoli delle conseguenze legali e delle sanzioni in cui
                    rischiano di incorrere e saranno i soli responsabili del
                    rispetto delle leggi locali.
                </p>
                <div className="end-paragraph"></div>

                <h3>CONDIZIONI GENERALI DI VENDITA</h3>
                <p>
                    Tutti i negozi Mercatino operano come agenzia d’affari conto
                    terzi con soggetti privati pertanto svolgono attività di
                    intermediazione nella compravendita di oggetti usati tra
                    privati. Di conseguenza le cessioni degli oggetti avvengono
                    tra due consumatori finali, non sono soggette a
                    fatturazione, e saranno documentate tramite emissione di
                    ricevuta che ne comprova l’acquisto. L&apos;offerta e la
                    vendita di prodotti sul nostro sito web
                    www.mercatinousato.com sono regolate da queste Condizioni
                    Generali di Vendita. I prodotti acquistati sul sito della
                    Mercatino S.r.l. sono venduti direttamente dai negozi
                    affiliati alla catena in franchising “Mercatino compra
                    vendita usato” che agiscono in proprio. rif. ART 115 del
                    R.D. 773/1931 (&quot;MERCATINO S.r.l. via Messedaglia
                    8/c&quot;), P.IVA 04021490232 REA 385074, Cap. Soc.
                    100.000,00 € i.v &#41;
                </p>
            </div>
        </div>
    );
}
