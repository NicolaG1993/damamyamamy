import "./style/ContactCard.css";

export default function ContactCard() {
    return (
        <div className="contact-footer">
            <h4>Contatto</h4>
            <div className="contact-wraper">
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
    );
}
