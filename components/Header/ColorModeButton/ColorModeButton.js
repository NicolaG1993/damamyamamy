import { useCallback, useEffect, useState } from "react";
import { setTheme } from "../../../shared/utils/themes";
import styles from "./style/ColorModeButton.module.css";

// import { ReactComponent as MoonIcon } from "./assets/svg/moon.svg";
// import { ReactComponent as SunIcon } from "./assets/svg/sun.svg";

// REDUX
import { useDispatch } from "react-redux";
import { setColorButton } from "../../../redux/ToggleLayout/toggleLayout.actions";
import { useSelector, shallowEqual } from "react-redux";
const buttonStatus = (state) => state.toggleLayout.theme;

export default function ColorModeButton() {
    let togClass = useSelector(buttonStatus, shallowEqual);
    const [selectedTheme, setSelectedTheme] = useState();
    // let theme;

    const dispatch = useDispatch();
    const stabilizer = useCallback((arg) =>
        dispatch(setColorButton({ color: arg }))
    );
    //mi serve per usare dispatch (hook) in callback (useEffect)

    const toggleColors = () => {
        if (localStorage.getItem("theme") === "theme-dark") {
            setTheme("theme-light");
            setSelectedTheme("theme-light");
            dispatch(setColorButton({ color: "theme-light" }));
        } else {
            setTheme("theme-dark");
            setSelectedTheme("theme-dark");
            dispatch(setColorButton({ color: "theme-dark" }));
        }
    };

    useEffect(() => {
        let theme = localStorage.getItem("theme");
        console.log("theme", theme);
        stabilizer(theme);

        // if (theme === "theme-dark") {
        //     stabilizer("theme-dark");
        //     // dispatch(setColorButton({ color: "theme-dark" }));
        // } else if (theme === "theme-light") {
        //     stabilizer("theme-light");
        //     // dispatch(setColorButton({ color: "theme-light" }));
        // }
    }, []);

    useEffect(() => {
        let theme = localStorage.getItem("theme");
        console.log("theme", theme);
        stabilizer(theme);

        // if (localStorage.getItem("theme") === "theme-dark") {
        //     // setTogClass("theme-dark");
        //     stabilizer("theme-dark");
        //     // dispatch(setColorButton({ color: "theme-dark" }));
        // } else if (localStorage.getItem("theme") === "theme-light") {
        //     // setTogClass("theme-light");
        //     stabilizer("theme-light");
        //     // dispatch(setColorButton({ color: "theme-light" }));
        // }
    }, [selectedTheme]);

    const getBtnStyle = () => {
        if (localStorage.getItem("theme") === "theme-light") {
            return styles["color-mode-toggle-sun"];
        } else if (localStorage.getItem("theme") === "theme-dark") {
            return styles["color-mode-toggle-moon"];
        }
    };

    return (
        <div className={styles["color-mode-wrap"]}>
            <div onClick={toggleColors} className={getBtnStyle()}>
                <div className={styles["color-mode-icons"]}>
                    <div id={styles["Sun"]} />
                    <div id={styles["Moon"]} />
                </div>
                <input
                    id={styles["toggleColorMode"]}
                    name="toggleColorMode"
                    type="checkbox"
                    defaultChecked={togClass}
                />
            </div>
        </div>
    );
}

//ci vanno due svg dentro
