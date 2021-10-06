import { memo } from "react";
import styles from "./style/Slider.module.css";

import LeftArrow from "./assets/left-arrow.svg";
import RightArrow from "./assets/right-arrow.svg";

const Arrow = ({ direction, handleClick }) => {
    return (
        <div
            onClick={handleClick}
            className={`${styles["arrowWrap"]} ${
                direction === "right"
                    ? styles["rightArrowStyle"]
                    : styles["leftArrowStyle"]
            }`}
        >
            {direction === "right" ? <RightArrow /> : <LeftArrow />}
        </div>
    );
};

export default memo(Arrow);
