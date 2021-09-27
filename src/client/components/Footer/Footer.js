import loadable from "@loadable/component";
import { useState, useEffect } from "react";
import "./style/Footer.css";
import Nav from "./Nav/Nav";
import ContactCard from "./ContactCard/ContactCard";
import LegalInfos from "./LegalInfos/LegalInfos";
import SocialsIcons from "./SocialsIcons/SocialsIcons";
import useWindowDimensions from "../../utils/useWindowDimensions";
import useScrollPosition from "../../utils/useScrollPosition";

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
        <footer id="Footer">
            <div className="footer-wraper">
                <div className="footer-parallax-wraper" style={parallaxHeight}>
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
        <div className={"copyrights"}>
            <h5>Da Mamy a Mamy, © {currentYear}</h5>
        </div>
    );
}
