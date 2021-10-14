import Link from "next/link";
import styles from "../../components/Documents/Document.module.css";

export default function Vendi() {
    return (
        <div className={styles["document-comp"]}>
            <h1>Qualche norma di selezione</h1>

            <div className={styles["document-text-wrap"]}>
                <div className={styles["end-paragraph"]}></div>
                <h4>
                    FAI UNA PRIMA SELEZIONE A CASA DEGLI OGGETTI CHE VUOI
                    VENDERE.
                </h4>

                <div className={styles["end-paragraph"]}></div>

                <h3>ABBIGLIAMENTO</h3>
                <p>
                    Da Mamy a Mamy lo ritira solo se perfettamente in ordine,
                    pulito, privo di difetto, senza riparazioni di alcun tipo.
                    L’abbigliamento dev’essere rigorosamente recente,
                    perfettamente lavato e stirato di fresco, non macchiato, non
                    sciupato, “senza un filo tirato. Il ritiro dei capi di
                    abbigliamento è stagionale, esclusivamente su appuntamento
                    dal Lunedì al Sabato, per un massimo di 20 capi; per non
                    creare spiacevoli disguidi consigliamo di contarli
                    precedentemente a casa. Si ritira abbigliamento da 0 a 10
                    anni. La biancheria intima: mutande e calzini/calzemaglie si
                    ritirano esclusivamente nuovi. Le scarpe si ritirano dai
                    primi passi al nr. 35; devono essere pulite sopra e sotto e
                    senza segni di usura.
                </p>

                <div className={styles["end-paragraph"]}></div>
                <h3>TUTTI GLI ALTRI ARTICOLI</h3>
                <p>
                    Puoi portarli tutti i giorni, purchè completi, puliti, e
                    dove necessario con pile (es. bilance, giochi, sdraiette...)
                    Non si ritirano articoli non funzionanti o incompleti.
                    Porta, se l’hai conservato, il libretto di istruzioni. Se
                    dotati di scatola e manuali di istruzioni, ovviamente
                    acquistano maggior valore. Le attrezzature, per esempio i
                    seggiolini auto, devono essere provvisti di omologazioni in
                    corso di validità. Per tutti gli articoli con montaggio di
                    parti sarà richiesta la dimostrazione della funzionalità e
                    la verifica della completezza dei componenti (vedi il punto
                    n.4 “Vizi Occulti” sul regolamento). Il controllo delle
                    condizioni degli oggetti da vendere deve essere effettuato a
                    casa in modo da evitare la mancata accettazione da parte di
                    “Da Mamy a Mamy”.
                </p>
                <div className={styles["end-paragraph"]}></div>
                <h3>CALENDARIO DEI RITIRI</h3>
                <p>da settembre: abbigliamento autunno/inverno</p>
                <p>da novembre: abbigliamento e attrezzature da neve</p>
                <p>da febbraio: costumi di carnevale</p>
                <p>da febbraio: primavera</p>
                <p> da marzo: estate da maggio: capi e attrezzature mare.</p>
                <div className={styles["end-paragraph"]}></div>

                <p>
                    <Link href={"/info/regolamento"}>
                        <a>LEGGI IL REGOLAMENTO COMPLETO QUI</a>
                    </Link>
                </p>

                <div className={styles["end-paragraph"]}></div>

                <h3>NON ESISTE GARANZIA</h3>
                <p>
                    Onde evitare spiacevoli disguidi e nel rispetto dell’etica
                    professionale, sarebbe buona cosa non mettere in vendita su
                    altri canali (marketplace, subito.it, ebay ecc…) la merce
                    esposta
                </p>
                <p>
                    Per favore: sono davvero poche e semplici regole; Vi
                    preghiamo di rispettarle, onde evitare spiacevoli disguidi
                    e/o inconvenienti.
                </p>
                <p>Grazie.</p>
                <div className={styles["end-paragraph"]}></div>
            </div>
        </div>
    );
}
