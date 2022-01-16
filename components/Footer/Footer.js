import { useState, useEffect } from "react";
import styles from "./style/Footer.module.css";
import Nav from "./Nav/Nav";
import ContactCard from "./ContactCard/ContactCard";
import LegalInfos from "./LegalInfos/LegalInfos";
import SocialsIcons from "./SocialsIcons/SocialsIcons";
import useWindowDimensions from "../../shared/utils/useWindowDimensions";
import useScrollPosition from "../../shared/utils/useScrollPosition";

export default function Footer() {
    const { width } = useWindowDimensions();
    const { scrollTop } = useScrollPosition();

    const [parallaxHeight, setParallaxHeight] = useState({
        marginTop: "0",
    });

    useEffect(() => {
        if (
            scrollTop + window.innerHeight + 200 >=
            document.documentElement.offsetHeight
        ) {
            setParallaxHeight({
                marginTop: "0",
            });
        } else {
            if (width <= 720) {
                setParallaxHeight({
                    marginTop: "0",
                });
            } else
                setParallaxHeight({
                    marginTop: "190px",
                });
        }
    }, [scrollTop]);

    return (
        <footer id={styles["Footer"]}>
            <div className={styles["footer-wraper"]}>
                <div
                    className={styles["footer-parallax-wraper"]}
                    style={parallaxHeight}
                >
                    <Nav />
                    <LegalInfos />
                    <ContactCard />
                    <SocialsIcons />
                </div>
            </div>
            <Copyrights />
        </footer>
    );
}

function Copyrights() {
    const currentYear = new Date().getFullYear();
    return (
        <div className={styles["copyrights"]}>
            <h5>
                Da Mamy a Mamy, © {currentYear} • Creato da{" "}
                <a
                    href="https://nicogdesign.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    NGDesign
                </a>
            </h5>
        </div>
    );
}
