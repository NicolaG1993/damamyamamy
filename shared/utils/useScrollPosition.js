import { useState, useEffect } from "react";

export default function useScrollPosition() {
    if (typeof window !== "undefined") {
        //window non esiste quando siamo server side
        const [scrollTop, setScrollTop] = useState(window.scrollY);

        const updateScrollPosition = () => {
            setScrollTop(window.scrollY);
        };

        useEffect(() => {
            window.addEventListener("scroll", updateScrollPosition);
            return () =>
                window.removeEventListener("scroll", updateScrollPosition);
        });

        return {
            scrollTop,
        };
    } else {
        return {
            scrollTop: 0,
        };
    }
}
