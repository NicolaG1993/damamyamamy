import { useEffect, useState } from "react";
import { setTheme } from "../../../shared/utils/themes";
import styles from "./style/ColorModeButton.module.css";

// import { ReactComponent as MoonIcon } from "./assets/svg/moon.svg";
// import { ReactComponent as SunIcon } from "./assets/svg/sun.svg";

export default function ColorModeButton() {
    const [togClass, setTogClass] = useState("light");
    let theme;

    const toggleColors = () => {
        if (localStorage.getItem("theme") === "theme-dark") {
            setTheme("theme-light");
            setTogClass("light");
        } else {
            setTheme("theme-dark");
            setTogClass("dark");
        }
    };

    useEffect(() => {
        theme = localStorage.getItem("theme");
        // console.log("theme", togClass);
    }, []);

    useEffect(() => {
        if (localStorage.getItem("theme") === "theme-dark") {
            setTogClass("dark");
        } else if (localStorage.getItem("theme") === "theme-light") {
            setTogClass("light");
        }
    }, [theme]);

    return (
        <div className="color-mode-wrap">
            <div
                onClick={toggleColors}
                className={
                    styles[
                        `color-mode-toggle ${
                            togClass === "light" ? "sun" : "moon"
                        }`
                    ]
                }
            >
                <div className="color-mode-icons">
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
