import { useState, useEffect } from "react";

export default function Contact() {
    const [contactReq, setContactReq] = useState({});
    console.log("contactReq: ", contactReq);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target.form;

        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());

        setContactReq(allValues);
    };

    return (
        <div className="contact-comp">
            <h1>Contatta da Mamy a Mamy</h1>
            <div className="contact-form">
                <form>
                    <label>
                        Nome
                        <input
                            type="text"
                            placeholder="Il tuo indirizzo nome"
                            name="contactname"
                            id="contactname"
                            onChange={(e) => handleForm(e)}
                        />
                    </label>
                    <br />
                    <label>
                        E-mail
                        <input
                            type="text"
                            placeholder="Il tuo indirizzo email"
                            name="email"
                            id="email"
                            onChange={(e) => handleForm(e)}
                        />
                    </label>
                    <br />
                    <label>
                        Messaggio
                        <textarea
                            placeholder="Scrivi qui il tuo messaggio"
                            name="message"
                            id="message"
                            onChange={(e) => handleForm(e)}
                        />
                    </label>
                    <br />
                </form>
            </div>

            <div className="contact-list">
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

            <div className="contact-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11178.56867680073!2d10.7683657!3d45.5374059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x49eb521541b62a58!2sDa%20Mamy%20a%20Mamy!5e0!3m2!1sit!2sde!4v1621274725301!5m2!1sit!2sde"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
}
