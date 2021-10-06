import styles from "./style/SocialsIcons.module.css";
import Facebook from "./assets/facebook.svg";
import Instagram from "./assets/instagram.svg";
import Like from "./assets/like.svg";
import WhatsApp from "./assets/whatsapp.svg";

export default function SocialsIcons() {
    return (
        <div className={styles["social-footer"]}>
            <a
                href="https://www.instagram.com/damamyamamy"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Facebook />
            </a>
            <a
                href="https://www.facebook.com/Da-Mamy-A-Mamy-105663897718034/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Instagram />
            </a>
            <a
                href="https://wa.me/393479792644"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Like />
            </a>
            <a
                href="https://www.facebook.com/Da-Mamy-A-Mamy-105663897718034/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <WhatsApp />
            </a>
        </div>
    );
}
