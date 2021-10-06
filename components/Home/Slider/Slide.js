import { memo } from "react";
import Image from "next/image";
import styles from "./style/Slider.module.css";

const Slide = ({ content, width }) => {
    // console.log("content", content);
    return (
        <div
            style={{
                height: "100%",
                width: `${width}px`,
                backgroundImage: `url(${content.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        />
    );
};

export default memo(Slide);
