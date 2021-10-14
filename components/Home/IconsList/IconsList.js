import styles from "./style/IconsList.module.css";

export default function IconsList({ iconslistHeight }) {
    console.log("iconslistHeight", iconslistHeight);
    return (
        <div
            className={styles["iconslist"]}
            style={{ height: iconslistHeight }}
        >
            <div className={styles["iconslist-wrap"]}>
                <div className={styles["iconslist-icon-box"]}>
                    <div className={styles["iconslist-icon"]}></div>
                    <h3>Affidabilità</h3>
                    <p>
                        Offriamo il migliore servizio, controllando ogni
                        prodotto
                    </p>
                </div>
                <div className={styles["iconslist-icon-box"]}>
                    <div className={styles["iconslist-icon"]}></div>
                    <h3>Qualità</h3>
                    <p>
                        Da noi puoi aspettarti solo articoli in ottime
                        condizioni
                    </p>
                </div>
                <div className={styles["iconslist-icon-box"]}>
                    <div className={styles["iconslist-icon"]}></div>
                    <h3>Sicurezza</h3>
                    <p>I prodotti per bambini sono sicuri al 100% </p>
                </div>
                <div className={styles["iconslist-icon-box"]}>
                    <div className={styles["iconslist-icon"]}></div>
                    <h3>Spedizioni</h3>
                    {/*  <h3>Rimborsi</h3>
                   <p>In caso di prodotti rovinati é previsto il rimborso</p> */}
                    <p>
                        Ritira in negozio o ricevi gli articoli direttamente a
                        casa tua
                    </p>
                </div>
            </div>
        </div>
    );
}
