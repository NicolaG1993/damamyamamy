/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect } from "react";

export default function Contact() {
    const [parallaxHeight, setParallaxHeight] = useState();
    const [scrollTop, setScrollTop] = useState();

    const [contactReq, setContactReq] = useState({});
    console.log("contactReq: ", contactReq);
    console.log("scrollTop: ", scrollTop);

    useEffect(() => {
        // component did mount
        window.scrollTo(0, 0);
        window.addEventListener("scroll", handleScroll);

        // returned function will be called on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollTop > 70) {
            if (scrollTop > 250) {
                setParallaxHeight(`0px 20px 0px 20px`);
            } else {
                setParallaxHeight(`10px 20px 50px 20px`);
            }
        } else {
            setParallaxHeight(`125px 20px 160px 20px`);
        }

        console.log("parallaxHeight: ", parallaxHeight);
    }, [scrollTop]);

    const handleScroll = () => {
        setScrollTop(window.scrollY);

        // let scrollTop = window.scrollY;
        // scrollTopRef.current = window.scrollY;
    };

    // $(window).on("scroll", function () {
    //     var scrollTop = $(window).scrollTop();
    //     if (scrollTop > 50) {
    //         $("contact-comp").stop().animate({ height: "50%" }, 200);
    //     } else {
    //         $("contact-comp").stop().animate({ height: "100%" }, 200);
    //     }
    // });

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target.form;

        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());

        setContactReq(allValues);
    };

    return (
        <>
            <div
                className="contact-comp"
                css={css`
                    padding: ${parallaxHeight};
                    transition: 0.8s ease;
                `}
            >
                <div className="contact-wrap">
                    <form className="contact-form">
                        <h1 className="contact-form-col-full">
                            Contatta da Mamy a Mamy
                        </h1>
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
                        <div className="contact-list-wrap">
                            <h2>Contatto</h2>
                            <div className="contact-list-box">
                                <p>Vicolo Teatro, 4, 37010</p>
                                <p>Cavaion, Verona, IT</p>
                            </div>

                            <div className="contact-list-box">
                                <p>
                                    <a href="tel:+393479792644">
                                        (+39) 347 9792 644
                                    </a>{" "}
                                    (anche WhatsApp)
                                </p>
                                <p>
                                    <a href="mailto:damamyamamy@gmail.com">
                                        damamyamamy@gmail.com
                                    </a>
                                </p>
                            </div>

                            <div className="contact-list-box">
                                <p>Siamo aperti dal lunedí al venerdí</p>
                                <p>dalle 09:00 alle 16:00</p>
                            </div>

                            <h2>Seguici</h2>
                            <div className="contact-list-socials">
                                <p>
                                    <a href="http://www.facebook.com/">
                                        Facebook
                                    </a>
                                </p>
                                <p>
                                    <a href="http://www.instagram.com/">
                                        Instagram
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="contact-map">
                <div className="contact-map-div">
                    <h2>Some text here...</h2>
                </div>

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11178.56867680073!2d10.7683657!3d45.5374059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x49eb521541b62a58!2sDa%20Mamy%20a%20Mamy!5e0!3m2!1sit!2sde!4v1621274725301!5m2!1sit!2sde"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>

                <div className="contact-map-div">
                    <h2>Some text here...</h2>
                </div>
            </div>
        </>
    );
}
