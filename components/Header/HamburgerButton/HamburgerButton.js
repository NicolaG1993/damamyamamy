import styles from "./HamburgerButton.module.css";

import { useSelector, shallowEqual } from "react-redux";
const selectLayouts = (state) => state.toggleLayout.layouts[1];

export default function HamburgerButton({ toggleNav }) {
    let state = useSelector(selectLayouts, shallowEqual);
    let navIsActive = state.active;

    return (
        <div
            id={styles["hamBtn"]}
            className={styles[navIsActive ? "hamBtn active" : "hamBtn"]}
            onClick={toggleNav}
        >
            <div className={styles["stick"]}></div>
        </div>
    );
}
