import styles from "./style/ContactList.module.css";
import ShopFacade from "./assets/shop-facade.svg";
import Phone from "./assets/phone.svg";
import Email from "./assets/email.svg";
import Clock from "./assets/clock.svg";

export default function ContactList() {
    return (
        <div className={styles["contact-list"]}>
            <div className={styles["contact-list-wrap"]}>
                <div>
                    <h2>Contatto</h2>
                    <div className={styles["contact-list-box"]}>
                        <div className={styles["contact-address-small-icon"]}>
                            <ShopFacade />
                        </div>
                        <div
                            className={`${styles["contact-address-text"]} ${styles["contact-address-text1"]}`}
                        >
                            <p>Vicolo Teatro, 4, 37010</p>
                            <p>Cavaion, Verona, IT</p>
                        </div>
                    </div>

                    <div className={styles["contact-list-box"]}>
                        <div className={styles["contact-address-small-icon"]}>
                            <Phone />
                        </div>
                        <div
                            className={`${styles["contact-address-text"]} ${styles["contact-address-text2"]}`}
                        >
                            <p>
                                <a href="tel:+393479792644">
                                    (+39) 347 9792 644
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className={styles["contact-list-box"]}>
                        <div className={styles["contact-address-small-icon"]}>
                            <Email />
                        </div>
                        <div
                            className={`${styles["contact-address-text"]} ${styles["contact-address-text3"]}`}
                        >
                            <p>
                                <a href="mailto:damamyamamy@gmail.com">
                                    damamyamamy@&#8203;gmail.&#8203;com
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className={styles["contact-list-box"]}>
                        <div className={styles["contact-address-small-icon"]}>
                            <Clock />
                        </div>
                        <div
                            className={`${styles["contact-address-text"]} ${styles["contact-address-text4"]}`}
                        >
                            <p>
                                Siamo aperti{" "}
                                <span id="tablet-line-breaker"></span>
                                dal lunedí al venerdí
                            </p>
                            <p>dalle 09:00 alle 16:00</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2>Seguici</h2>
                    <div className={styles["contact-list-socials"]}>
                        <p>
                            <a
                                href="https://www.facebook.com/Da-Mamy-A-Mamy-105663897718034/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Facebook
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://www.instagram.com/damamyamamy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Instagram
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
