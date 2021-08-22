import { useEffect, useState } from "react";
import { setTheme } from "../../utils/themes";
import "../../styles/ColorModeButton.css";

// import { ReactComponent as MoonIcon } from "./assets/svg/moon.svg";
// import { ReactComponent as SunIcon } from "./assets/svg/sun.svg";

export default function ColorModeButton() {
    const [togClass, setTogClass] = useState("light");
    let theme = localStorage.getItem("theme");
    // console.log("theme", togClass);

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
        if (localStorage.getItem("theme") === "theme-dark") {
            setTogClass("dark");
        } else if (localStorage.getItem("theme") === "theme-light") {
            setTogClass("light");
        }
    }, [theme]);

    return (
        <div className={"color-mode-wrap"}>
            <div
                onClick={toggleColors}
                className={`color-mode-toggle ${
                    togClass === "light" ? "sun" : "moon"
                }`}
            >
                <div className="color-mode-icons">
                    <div id="Sun" />
                    <div id="Moon" />
                </div>
                <input
                    id="toggleColorMode"
                    name="toggleColorMode"
                    type="checkbox"
                    defaultChecked={togClass}
                />
            </div>

            {/* <button id="color-mode-btn">O</button> */}

            {/* {togClass === "light" ? (
                <input
                    type="checkbox"
                    id="color-mode-btn"
                    className="toggle--checkbox"
                    onClick={toggleColors}
                    checked
                />
            ) : (
                <input
                    type="checkbox"
                    id="color-mode-btn"
                    className="toggle--checkbox"
                    onClick={toggleColors}
                />
            )}
            <label htmlFor="toggle" className="toggle--label">
                <span className="toggle--label-background"></span>
            </label> */}
        </div>
    );
}

//ci vanno due svg dentro