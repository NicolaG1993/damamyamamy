import { memo } from "react";

import LeftArrow from "./assets/left-arrow.svg";
import RightArrow from "./assets/right-arrow.svg";

const Arrow = ({ direction, handleClick }) => {
    return (
        <div
            onClick={handleClick}
            className={`arrowWrap ${
                direction === "right" ? "rightArrowStyle" : "leftArrowStyle"
            }`}
        >
            {direction === "right" ? <RightArrow /> : <LeftArrow />}
        </div>
    );
};

export default memo(Arrow);
