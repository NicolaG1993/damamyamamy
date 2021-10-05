import styles from "./style/Logo.module.css";
import LogoSVG from "./assets/Logo.svg";
// import logo from "./assets/logo512.png";

export default function Logo() {
    return (
        <div className={styles["logo"]}>
            <LogoSVG />
        </div>
    );
}
