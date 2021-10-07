import styles from "./HamburgerButton.module.css";

// import { toggleLayout } from "../../redux/ToggleLayout/toggleLayout.actions";
// import { useSelector, shallowEqual } from "react-redux";
// const selectLayouts = (state) => state.toggleLayout.layouts[1];

export default function HamburgerButton({ navIsActive, toggleNav }) {
    // let state = useSelector(selectLayouts, shallowEqual);
    // let navIsActive = state.active;

    return (
        <div
            id={styles["hamBtn2"]}
            className={`${
                navIsActive
                    ? `${styles["hamBtn2"]} ${styles["active"]}`
                    : styles["hamBtn2"]
            }`}
            onClick={toggleNav}
        >
            <div className={styles["stick2"]}></div>
        </div>
    );
}
