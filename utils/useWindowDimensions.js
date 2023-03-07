import { useState, useEffect } from "react";

export default function useWindowDimensions() {
    if (typeof window !== "undefined") {
        const [width, setWidth] = useState(window.innerWidth);
        const [height, setHeight] = useState(window.innerHeight);

        const updateWidthAndHeight = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        useEffect(() => {
            window.addEventListener("resize", updateWidthAndHeight);
            return () =>
                window.removeEventListener("resize", updateWidthAndHeight);
        });

        return {
            width,
            height,
        };
    } else {
        return {
            width: 0,
            height: 0,
        };
    }
}
