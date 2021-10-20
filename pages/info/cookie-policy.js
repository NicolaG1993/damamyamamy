import Head from "next/head";
import Link from "next/link";
import styles from "../../components/Documents/Document.module.css";

export default function CookiePolicy() {
    return (
        <div className={styles["document-comp"]}>
            <Head>
                <title>Cookie Policy - Da Mamy a Mamy</title>
                <meta
                    property="og:title"
                    content="Cookie Policy - Da Mamy a Mamy"
                />
                <meta property="og:type" content="website" />
            </Head>

            <h1>Privacy & Cookie Policy</h1>

            <div className={styles["document-text-wrap"]}>
                <h3>
                    DA MAMY A MAMY utilizza cookies per migliorare l’esperienza
                    dell’utente, raccomandiamo di accettarne l’utilizzo per
                    sfruttare a pieno la navigazione
                </h3>
                <p>
                    I Dati personali del Cliente al momento della creazione del
                    conto cliente, sono destinati alla società DA MAMY A MAMY e
                    si riserva inoltre il diritto di trasmettere le informazioni
                    a terzi, previo accordo dato dal Cliente. Il Cliente che si
                    iscrive sul Sito, s&apos;impegna a fornire a DA MAMY A MAMY
                    informazioni veritiere e corrette. Le informazioni raccolte
                    sono necessarie alla gestione della relazione commerciale
                    tra ogni Cliente e la società DA MAMY A MAMY. Nel quadro
                    dell&apos;emissione dell&apos;ordine, le informazioni
                    comunicate dal Cliente sono indispensabili per
                    l&apos;evasione e la consegna dell&apos;ordine, nonché per
                    la preparazione della fattura. L&apos;assenza di queste
                    informazioni, comporta come conseguenza l&apos;annullamento
                    dell&apos;ordine. DA MAMY A MAMY s&apos;impegna a prendere
                    tutte le misure necessarie per assicurare la protezione, la
                    confidenzialità e la sicurezza dei dati personali
                    (d&apos;ora in poi «Dati Personali») che verranno trasmessi
                    a DA MAMY A MAMY da ogni Cliente e ciò nel rispetto delle
                    disposizioni di legge e applicabili. Il Cliente riconosce il
                    diritto di DA MAMY A MAMY di registrare ogni dato relativo
                    all&apos;uso del conto, soprattutto ogni informazione
                    relativa agli acquisti. Il Cliente riconosce di accettare
                    che le operazioni ed il trattamento automatizzato dei dati
                    Personali effettuato al momento della creazione del proprio
                    conto cliente e dopo la creazione dello stesso, potranno
                    essere effettuati da DA MAMY A MAMY e/o ogni altro partner
                    contrattualmente legato direttamente o indirettamente a DA
                    MAMY A MAMY. Le informazioni raccolte hanno come finalità di
                    rendere possibile gli acquisti e di proporre promozioni,
                    offerte commerciali e informazioni relative ai prodotti.
                    Queste offerte e informazioni saranno inviate al Cliente a
                    discrezione di DA MAMY A MAMY, previo accordo dato dalla
                    cliente, DA MAMY A MAMY si riserva anche il diritto di
                    trasmettere a terzi le informazioni raccolte.
                </p>

                <div className={styles["end-paragraph"]}></div>

                <h3>ACCESSO, MODIFICA, RITIRO DEI DATI PERSONALI</h3>
                <p>
                    In conformità alla legge sull&apos;informatica, i file e le
                    libertà n°78-17 del 6 gennaio 1978, il Cliente dispone del
                    diritto di accesso, modifica e rettifica, opposizione e
                    soppressione dei dati che lo riguardano presso DA MAMY A
                    MAMY e ciò dopo verifica condotta DA MAMY A MAMY - se
                    ritenuto opportuno - dell&apos;identità del Cliente tramite
                    documento d&apos;identità valido.
                </p>
                <p>
                    Il cliente ha inoltre facoltà di opporsi al trattamento dei
                    Dati Personali che lo riguardano.
                </p>
                <p>
                    • A questo fine, basta che il Cliente ne faccia domanda per
                    iscritto all&apos;indirizzo seguente:
                </p>
                <address>
                    DA MAMY A MAMY <br />
                    Vicolo Teatro, 4 37010
                </address>
                <address>CAVAION VERONESE (VR)</address>
                <address>E-mail: damamyamamy@gmail.com </address>
                <address>Tel: +39-347-9792-644 </address>

                <div className={styles["end-paragraph"]}></div>

                <p>
                    DA MAMY A MAMY propone al Cliente di ricevere via e-mail
                    (posta elettronica) informazioni che riguardano le novità,
                    le offerte promozionali, le offerte di svendita, le vendite
                    esclusive, i propri buoni affari.
                </p>
                {/* <p>
                    <Link>LEGGI LA PRIVACY POLICY COMPLETA QUI</Link>
                </p> */}

                <div className={styles["end-paragraph"]}></div>

                <h3>POLITICA DEI COOKIES</h3>
                <p>
                    Questa clausola permette di saperne di più sui dati di
                    navigazione trattati visitando il Sito da qualsiasi
                    terminale che permetta di accedere al Sito. (Esempio:
                    computer, tablet, smartphone).
                </p>

                <div className={styles["end-paragraph"]}></div>

                <h3>COS´É UN COOKIE ?</h3>
                <p>
                    Un cookie è un&apos;informazione deposta nel vostro hard
                    disk dal server del Sito che visitate. Esso contiene diversi
                    dati, tra cui:
                </p>
                <ul>
                    <li>il nome del server che lo ha deposto;</li>
                    <li>un identificativo sotto forma di un numero unico;</li>
                    <li>eventualmente una data di scadenza...</li>
                </ul>
                <p>
                    Queste informazioni sono a volte immagazzinate nel vostro
                    computer in un semplice file testo a cui il server accede
                    per leggere e registrare delle informazioni.
                </p>

                <div className={styles["end-paragraph"]}></div>

                <h3>A QUALI FINI VENGONO USATI I COOKIES ?</h3>
                <p>
                    Il Sito usa dei cookies detti «interni» e dei cookies detti
                    «terzi».
                </p>
                <p>
                    La funzione principale dei cookies è tecnica e permette di
                    migliorare la navigazione, di effettuare delle statistiche,
                    di conservare delle informazioni relative alla costituzione
                    del carrello e della sua validazione, nonché di conservare
                    gli identificativi di collegamento al conto fedeltà cliente.
                </p>
                <p>
                    Altri cookies aiutano a capire il comportamento degli utenti
                    per rendere l&apos;esperienza più pertinente e adeguata ai
                    centri d&apos;interesse (Esempio: raccomandazioni
                    personalizzate sugli articoli).
                </p>
                <p>
                    I cookies possono inoltre essere usati in maniera
                    personalizzata o anonima per mostrare delle pubblicità o
                    permettere l&apos;invio di e-mail secondo le abitudini di
                    navigazione. Inoltre, potrebbero essere attivati dei cookies
                    specialmente concepiti per «reti sociali». Essi permettono
                    all&apos;utente di interagire tramite le reti sociali
                    (Esempio: funzione condividi). Quando una pagina contiene
                    questo comando, si stabilisce un collegamento diretto con la
                    rete sociale selezionata tramite cui possono essere
                    trasmesse alcune informazioni.
                </p>

                <div className={styles["end-paragraph"]}></div>

                <h3>
                    A CHI SONO DESTINATE LE INFORMAZIONI IMMAGANIZZATE DAI
                    COOKIES ?
                </h3>
                <p>
                    Le informazioni immagazzinate dai cookies dei nostri Siti
                    sono destinate a DA MAMY A MAMY.
                </p>

                <div className={styles["end-paragraph"]}></div>

                <h3>COME ELIMINARE I COOKIES ?</h3>
                <p>
                    L&apos;eliminazione dei cookies si effettua attraverso la
                    funzione «opzioni»/«strumenti» del vostro browser.
                </p>
                <p>
                    La soppressione dei cookies può interrompere l&apos;iter
                    d&apos;acquisto, scollegare il conto fedeltà e far perdere
                    le funzionalità create per rendere più semplice la
                    navigazione e l&apos;acquisto. In questi casi, ma non solo,
                    DA MAMY A MAMY non potrà essere ritenuta responsabile del
                    malfunzionamento del Sito o della diminuita efficacia delle
                    sue funzionalità.
                </p>

                <div className={styles["end-paragraph"]}></div>

                <h3>COME REGOLARE I COOKIES SUL PROPRIO COMPUTER ?</h3>
                <p>
                    In questo caso, la totalità dei Siti visitata è messa in
                    questione. Questa regolazione può essere fatta in qualsiasi
                    momento e da qualsiasi browser internet, basta andare sul
                    menù d&apos;aiuto del navigatore.
                </p>
                <div className={styles["end-paragraph"]}></div>
                {/* <p>
                    <Link>LEGGI LA COOKIE POLICY COMPLETA QUI</Link>
                </p> */}
            </div>
        </div>
    );
}
