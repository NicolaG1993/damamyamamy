import { useState } from "react";
import { Link } from "react-router-dom";
import "./style/Button.css";

const STATUS = {
    HOVERED: "hovered",
    NORMAL: "normal",
};

export default function Button({ page, text, type, fn, style }) {
    const [status, setStatus] = useState(STATUS.NORMAL);

    const onMouseEnter = () => {
        setStatus(STATUS.HOVERED);
    };

    const onMouseLeave = () => {
        setStatus(STATUS.NORMAL);
    };

    const handleFunction = () => {
        if (typeof fn === "function") {
            fn();
        } else {
            return;
        }
    };

    if (type === "function")
        return (
            <button
                type="button"
                onClick={() => handleFunction()} //activate fn here! 🧨
                className={`btn ${status} ${style}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {text}
            </button>
        );

    if (type === "internal")
        return (
            <Link to={page || "#"} onClick={() => handleFunction()}>
                <button
                    type="button"
                    className={`btn ${status} ${style}`}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {text}
                </button>
            </Link>
        );

    if (type === "external")
        return (
            <a
                target="_blank"
                href={page || "#"}
                rel="noopener noreferrer"
                onClick={() => handleFunction()}
            >
                <button
                    type="button"
                    className={`btn ${status} ${style}`}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {text}
                </button>
            </a>
        );

    if (type === "submit")
        return (
            <button
                type="submit"
                className={`btn ${status} ${style}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => handleFunction()}
            >
                {text}
            </button>
        );
}
