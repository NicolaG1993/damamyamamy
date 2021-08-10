import "./HamburgerButton.css";

// import { toggleLayout } from "../../redux/ToggleLayout/toggleLayout.actions";
// import { useSelector, shallowEqual } from "react-redux";
// const selectLayouts = (state) => state.toggleLayout.layouts[1];

export default function HamburgerButton({ navIsActive, toggleNav }) {
    // let state = useSelector(selectLayouts, shallowEqual);
    // let navIsActive = state.active;

    return (
        <div
            id="hamBtn2"
            className={navIsActive ? "hamBtn2 active" : "hamBtn"}
            onClick={toggleNav}
        >
            <div className={"stick2"}></div>
        </div>
    );
}
