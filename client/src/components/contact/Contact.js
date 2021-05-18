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

            <form className="contact-form">
                <div className="contact-form-col-left">
                    <input
                        type="text"
                        placeholder="Nome*"
                        name="contactname"
                        id="contactname"
                        onChange={(e) => handleForm(e)}
                    />
                </div>

                <div className="contact-form-col-right">
                    <input
                        type="text"
                        placeholder="Cognome*"
                        name="contactlast"
                        id="contactlast"
                        onChange={(e) => handleForm(e)}
                    />
                </div>

                <div className="contact-form-col-left">
                    <input
                        type="text"
                        placeholder="Email*"
                        name="email"
                        id="email"
                        onChange={(e) => handleForm(e)}
                    />
                </div>

                <div className="contact-form-col-right">
                    <input
                        type="text"
                        placeholder="Numero di telefono"
                        name="phone"
                        id="phone"
                        onChange={(e) => handleForm(e)}
                    />
                </div>

                <div className="contact-form-col-full">
                    <textarea
                        placeholder="Messaggio"
                        name="message"
                        id="message"
                        onChange={(e) => handleForm(e)}
                    />
                </div>

                <div className="contact-form-col-full">
                    <button>Invia</button>
                </div>
            </form>

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
