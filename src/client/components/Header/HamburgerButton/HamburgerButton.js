import "./HamburgerButton.css";

// import { toggleLayout } from "../../redux/ToggleLayout/toggleLayout.actions";
import { useSelector, shallowEqual } from "react-redux";
const selectLayouts = (state) => state.toggleLayout.layouts[1];

export default function HamburgerButton({ toggleNav }) {
    let state = useSelector(selectLayouts, shallowEqual);
    let navIsActive = state.active;

    return (
        <div
            id="hamBtn"
            className={navIsActive ? "hamBtn active" : "hamBtn"}
            onClick={toggleNav}
        >
            <div className={"stick"}></div>
        </div>
    );
}
