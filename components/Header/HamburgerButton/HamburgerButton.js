import styles from "./HamburgerButton.module.css";

import { useSelector, shallowEqual } from "react-redux";
const selectLayouts = (state) => state.toggleLayout.layouts[1];

export default function HamburgerButton({ toggleNav }) {
    let state = useSelector(selectLayouts, shallowEqual);
    let navIsActive = state.active;

    const getBtnStyle = () => {
        if (navIsActive) return styles["hamBtn-active"];
        else return styles["hamBtn"];
    };

    return (
        <div
            id={styles["hamBtn"]}
            className={getBtnStyle()}
            onClick={toggleNav}
        >
            <div className={styles["stick"]}></div>
        </div>
    );
}
