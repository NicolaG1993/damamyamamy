import { useState, useEffect } from "react";

export default function useScrollPosition() {
    const [scrollTop, setScrollTop] = useState(window.scrollY);

    const updateScrollPosition = () => {
        setScrollTop(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScrollPosition);
        return () => window.removeEventListener("scroll", updateScrollPosition);
    });

    return {
        scrollTop,
    };
}
