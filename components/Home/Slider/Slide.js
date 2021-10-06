import { memo } from "react";
import Image from "next/image";
import styles from "./style/Slider.module.css";

const Slide = ({ content, width }) => {
    // console.log("content", content);
    return (
        <Image
            src={content.src}
            alt={"slide"}
            width={`${width}px`}
            height="100%"
            objectFit="cover"
            className={styles["slide"]}
        />
    );
};

export default memo(Slide);

{
    /* <Image
    style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    }}
/>; */
}
