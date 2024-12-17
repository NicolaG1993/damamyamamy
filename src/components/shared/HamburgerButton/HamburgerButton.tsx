import styles from "./HamburgerButton.module.css";

interface ComponentProps {
    onClick: () => void;
    isActive: boolean;
}

export default function HamburgerButton({ onClick, isActive }: ComponentProps) {
    const getBtnClass = () =>
        isActive ? styles["hamBtn-active"] : styles["hamBtn"];

    return (
        <div id={styles["hamBtn"]} className={getBtnClass()} onClick={onClick}>
            <div className={styles["stick"]}></div>
        </div>
    );
}
