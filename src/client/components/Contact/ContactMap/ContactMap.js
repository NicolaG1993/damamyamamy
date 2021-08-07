import "./style/ContactMap.css";
import ShopFacade from "./assets/shop-facade.svg";
import Phone from "./assets/phone.svg";
import Clock from "./assets/clock.svg";

export default function ContactMap() {
    return (
        <div id="contact-map">
            <div className="contact-map-div">
                <h2>Come venire a trovarci...</h2>
            </div>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11178.56867680073!2d10.7683657!3d45.5374059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x49eb521541b62a58!2sDa%20Mamy%20a%20Mamy!5e0!3m2!1sit!2sde!4v1621274725301!5m2!1sit!2sde"
                allowFullScreen=""
                loading="lazy"
            ></iframe>

            <div className="contact-icons-div">
                <div>
                    <ShopFacade />
                    <div className="contact-icons-text">
                        <h3>Orario negozio</h3>
                        <p>Lunedí - Venerdí</p>
                        <p>09:00 - 16:00</p>
                    </div>
                </div>
                <div>
                    <Phone />
                    <div className="contact-icons-text">
                        <h3>Spedizioni</h3>
                        <p>Servizio di spedizione </p>
                        <p>disponibile in tutta Italia</p>
                    </div>
                </div>
                <div>
                    <Clock />
                    <div className="contact-icons-text">
                        <h3>Assistenza</h3>
                        <p>Sempre disponibili ad</p>
                        <p>assistere i nostri clienti</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
