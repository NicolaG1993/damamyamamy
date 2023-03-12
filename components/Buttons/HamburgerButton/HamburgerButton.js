import { useEffect } from "react";
import styles from "./HamburgerButton.module.css";

// import { useSelector, shallowEqual } from "react-redux";
// const selectLayouts = (state) => state.toggleLayout.layouts[1];

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectLayoutsState } from "@/redux/slices/uiSlice";

export default function HamburgerButton({ toggleNav }) {
    let layouts = useSelector(selectLayoutsState, shallowEqual);

    const getBtnStyle = () => {
        if (layouts[1].status) {
            return styles["hamBtn-active"];
        } else {
            return styles["hamBtn"];
        }
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
