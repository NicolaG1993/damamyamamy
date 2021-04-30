import { useState, useEffect } from "react";

export default function Contact() {
    const [contactReq, setContactReq] = useState({});
    console.log("contactReq: ", contactReq);

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
        </div>
    );
}
