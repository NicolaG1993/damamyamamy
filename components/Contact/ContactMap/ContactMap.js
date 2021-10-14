import Image from "next/image";
import styles from "./style/ContactMap.module.css";
import ShopFacade from "./assets/shop-facade.svg";
// import HelpOperator from "./assets/help-operator.svg";
// import CargoTruck from "./assets/cargo-truck.svg";
import HelpOperator from "./assets/help-operator.png"; // convert to svg
import CargoTruck from "./assets/cargo-truck.png"; // convert to svg

export default function ContactMap() {
    // console.log("CargoTruck", CargoTruck);
    return (
        <div id={styles["contact-map"]}>
            <div className={styles["contact-map-div"]}>
                <h2>Come venire a trovarci...</h2>
            </div>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11178.56867680073!2d10.7683657!3d45.5374059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x49eb521541b62a58!2sDa%20Mamy%20a%20Mamy!5e0!3m2!1sit!2sde!4v1621274725301!5m2!1sit!2sde"
                allowFullScreen=""
                loading="lazy"
            ></iframe>

            <div className={styles["contact-icons-div"]}>
                <div>
                    <ShopFacade />
                    <div className={styles["contact-icons-text"]}>
                        <h3>Orari negozio</h3>
                        <p>
                            Lunedí Venerdí Sabato
                            <br />
                            09:00 - 14:00
                        </p>
                        <p>
                            Martedí Mercoledí Giovedí
                            <br />
                            09:00 - 18:30
                        </p>
                    </div>
                </div>
                <div>
                    <img
                        className={styles["not-svg-small"]}
                        src={CargoTruck.src}
                        alt={"Cargo Truck Icon"}
                    ></img>
                    {/* <CargoTruck /> */}
                    <div className={styles["contact-icons-text"]}>
                        <h3>Spedizioni</h3>
                        <p>
                            Servizio di spedizione
                            <br />
                            disponibile in tutta Italia
                        </p>
                        <p>
                            Il costo dipenderá dal
                            <br />
                            peso dell'articolo richiesto
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/*
Questa é la terza icona in caso servisse un giorno
<HelpOperator /> va al posto di <img> se vogliamo usare una svg

<div>
    <img
        className={styles["not-svg"]}
        src={HelpOperator.src}
        alt={"Help Operator Icon"}
    ></img>
    <HelpOperator /> 

    <div className={styles["contact-icons-text"]}>
        <h3>Assistenza</h3>
        <p>Sempre disponibili ad</p>
        <p>assistere i nostri clienti</p>
    </div>
</div>;
*/
