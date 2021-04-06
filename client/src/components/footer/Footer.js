import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className={"footer"}>
            <div id="contact-footer">
                <p>Vicolo Teatro, 4, 37010</p>
                <p>Cavaion, Verona, IT</p>
                <p>
                    <a href="tel:+393479792644">(+39) 347 9792 644</a>
                </p>
                <p>
                    <a href="mailto:damamyamamy@gmail.com">
                        damamyamamy@gmail.com
                    </a>
                </p>
            </div>

            <div className={"copyrights"}>Da Mamy a Mamy, © 2021</div>
        </div>
    );
}
