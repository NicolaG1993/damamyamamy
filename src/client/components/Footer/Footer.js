import loadable from "@loadable/component";
import { useState, useEffect } from "react";
import "./style/Footer.css";
const Nav = loadable(() => import("./Nav/Nav"));
const ContactCard = loadable(() => import("./ContactCard/ContactCard"));
const LegalInfos = loadable(() => import("./LegalInfos/LegalInfos"));
const SocialsIcons = loadable(() => import("./SocialsIcons/SocialsIcons"));
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
        <div id="Footer">
            <div className="footer-wraper">
                <div className="footer-parallax-wraper" style={parallaxHeight}>
                    <Nav fallback={<div className="loader" />} />
                    <LegalInfos fallback={<div className="loader" />} />
                    <ContactCard fallback={<div className="loader" />} />
                    <SocialsIcons fallback={<div className="loader" />} />
                </div>
            </div>
            <Copyrights />
        </div>
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
