import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className={"footer-comp"}>
            <div className={"footer"}>
                <div className="website-footer">
                    <h4>Naviga</h4>
                    <p>
                        <Link to={"/about"}>Chi siamo</Link>
                    </p>
                    <p>
                        <Link to={"/shop"}>Prodotti</Link>
                    </p>
                    <p>
                        <Link to={"/contact"}>Contattaci</Link>
                    </p>
                </div>

                <div className="smt-footer">
                    <h4>Column 2</h4>
                    <p>link</p>
                    <p>link</p>
                    <p>link</p>
                </div>

                <div className="contact-footer">
                    <h4>Contatto</h4>
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
            </div>

            <div className={"copyrights"}>
                <h5>Da Mamy a Mamy, © {currentYear}</h5>
            </div>
        </div>
    );
}
