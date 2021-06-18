import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Docs.css";

import PrivacyAndCookiePolicy from "./PrivacyAndCookiePolicy";

export default function DocExample({ document }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const RenderDoc = () => {
        if (document === "cookies policy") {
            return <PrivacyAndCookiePolicy />;
        }
    }; // BUG

    return (
        <div className={"document-comp"}>
            {/* <h1>Documento</h1>

            <div>
                <p>Qui andrá il testo del documento</p>
            </div> */}

            <RenderDoc />
        </div>
    );
}

/*

solo per test , poi eliminare file

vedere qual'é il modo migliore per render ogni doc,
    sarebbe bello un component dinamico, ma ha senso? 🐔

*/
