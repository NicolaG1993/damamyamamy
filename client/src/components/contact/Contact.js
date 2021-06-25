/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect } from "react";
import "../../styles/Contact.css";

import { MemoizedContactForm } from "./contact-form/ContactForm";

export default function Contact({ scrollTop }) {
    const [parallaxHeight, setParallaxHeight] = useState();

    useEffect(() => {
        // component did mount
        window.scrollTo(0, 0);
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
            // per screen > 1110px = 160px 20px 160px 20px
        }

        // console.log("parallaxHeight: ", parallaxHeight);
    }, [scrollTop]);

    // const handleScroll = () => {
    //     setScrollTop(window.scrollY);
    // };

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
                    <MemoizedContactForm />
                    <div className="contact-list">
                        <div className="contact-list-wrap">
                            <div>
                                <h2>Contatto</h2>
                                <div className="contact-list-box">
                                    <div className="contact-address-small-icon ">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 432.38"
                                        >
                                            <g
                                                id="Livello_2"
                                                data-name="Livello 2"
                                            >
                                                <g
                                                    id="Livello_1-2"
                                                    data-name="Livello 1"
                                                >
                                                    <path d="M0,.19C26.8.16,53.6.19,80.4,0,84.51,0,86,1.49,86,5.57c-.11,29.46.1,58.92-.13,88.38-.12,15.52-4.27,29.79-16.6,40.25C46.29,153.67,13.61,144,3,114.7c-1.13-3.12-2-6.34-3-9.51Z" />
                                                    <path d="M512,105.19c-1.71,4.85-2.68,9.94-5.13,14.55-8.67,16.3-21.81,25.73-40.63,24.31-18.07-1.36-29.67-12.16-36.36-28.57-3.07-7.54-3.69-15.55-3.73-23.53-.15-28.3-.07-56.59,0-84.89,0-6.82.15-7,7-6.95q39.45,0,78.9.08Z" />
                                                    <path d="M175.77,432.27H49.31c-7.16,0-7.21,0-7.22-7.27V173.07c0-5.5-.79-7.46,7.22-8.29,18-1.87,32.31-10.72,43.25-25.07,3.44-4.52,3.43-4.53,7,.17,26,34.17,74.88,33.79,100.09-.94,3-4.09,4.08-2.52,6.29.4,18.4,24.31,47.55,32.43,74.72,20.66A58.52,58.52,0,0,0,306,139.46c2.39-3.45,3.7-4.16,6.65-.3,23.95,31.33,63.7,35,92.82,8.69,3.18-2.87,5.72-6.48,8.33-9.92,1.7-2.24,2.82-2.3,4.47,0,11.77,16.36,27.58,25.7,47.8,27.26,2.4.19,3.67,1.36,3.78,3.74.08,1.66.11,3.33.11,5V423.86c0,8.41,0,8.41-8.58,8.41-13,0-26-.2-39,.1-5.1.12-6.54-1.62-6.53-6.61q.23-83.22.09-166.45c0-8.11,0-8.11-8.31-8.11h-91c-6.48,0-6.7.23-6.7,6.8q0,83.22,0,166.46c0,7.8,0,7.81-7.67,7.81Zm.26-86h73c6.71,0,6.87-.15,6.87-6.58,0-27.34-.1-54.67.11-82,0-5-1.47-6.61-6.54-6.59q-73.5.24-147,0c-5.13,0-6.51,1.69-6.48,6.64.2,27.33.09,54.67.11,82,0,6.3.21,6.52,6.43,6.53Q139.28,346.3,176,346.28Z" />
                                                    <path d="M299,52.51c0,15,.39,30-.1,45-.63,19.44-8.71,35.1-26.93,43.35-21.3,9.65-45.7-1.23-54.72-23.44A56.29,56.29,0,0,1,213,96Q213,51.51,213,7c0-6.82.11-6.92,7-6.93,24.15,0,48.3.12,72.45-.1,5,0,6.71,1.47,6.62,6.54C298.83,21.86,299,37.19,299,52.51Z" />
                                                    <path d="M319.92,53c0-15.66.13-31.31-.09-47-.06-4.62,1.58-6,6.09-6q37,.24,73.95,0c4.57,0,6.13,1.48,6.11,6-.14,29.15.07,58.3-.14,87.44-.11,15.69-4.14,30.17-16.66,40.76-22.84,19.3-55.27,9.8-66.1-19.19A47.87,47.87,0,0,1,319.9,98C320,83,319.92,68,319.92,53Z" />
                                                    <path d="M192.06,53.58c0,15.33.16,30.65,0,46-.27,20.64-15.21,39.75-33.88,43.75-20.61,4.42-40.58-7.15-48.31-27.84a65,65,0,0,1-3.66-22.56c-.19-28.81,0-57.63-.17-86.44C106,1.3,107.81,0,112.71,0q36.48.3,73,0c5.1,0,6.61,1.64,6.52,6.62-.26,15.65-.09,31.31-.09,47Z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="contact-address-text contact-address-text1">
                                        <p>Vicolo Teatro, 4, 37010</p>
                                        <p>Cavaion, Verona, IT</p>
                                    </div>
                                </div>

                                <div className="contact-list-box">
                                    <div className="contact-address-small-icon ">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 383.51 384"
                                        >
                                            <g
                                                id="Livello_2"
                                                data-name="Livello 2"
                                            >
                                                <g
                                                    id="Livello_1-2"
                                                    data-name="Livello 1"
                                                >
                                                    <path d="M111.53,0c4,2,6.25,5.41,7.89,9.54q23,57.8,46.08,115.52c3.64,9.12,1.24,14.81-7.84,18.48-15.26,6.15-30.52,12.34-45.85,18.33-3.2,1.25-4.45,2.47-4,6.4a120.93,120.93,0,0,0,89.92,104.57,155.31,155.31,0,0,0,19.86,3.45c2.79.35,3-1.68,3.7-3.31q8.37-20.85,16.66-41.75c.84-2.09,1.66-4.18,2.52-6.25,3.23-7.72,9.15-10.29,17-7.18q33.89,13.48,67.72,27.1,24,9.6,47.92,19.2c8.87,3.54,10.5,5.91,10.48,15.37-.14,49.64-39.72,95.71-88.74,103.3-2.2.34-4.39.82-6.58,1.23H256a15,15,0,0,0-2.17-.47,248.24,248.24,0,0,1-41.65-6.5q-85.54-20.61-143.84-86.67C33.81,251.19,12.42,205.64,3.45,154.18,1.91,145.33,1.2,136.39,0,127.5V95.25c.17-.72.39-1.44.5-2.17Q9,38.86,56.88,12.15C68.78,5.53,81.71,2.08,95.06,0Z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="contact-address-text contact-address-text2">
                                        <p>
                                            <a href="tel:+393479792644">
                                                (+39) 347 9792 644
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-list-box">
                                    <div className="contact-address-small-icon ">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 409.1 288.06"
                                        >
                                            <g
                                                id="Livello_2"
                                                data-name="Livello 2"
                                            >
                                                <g
                                                    id="Livello_1-2"
                                                    data-name="Livello 1"
                                                >
                                                    <path d="M409.1,258.21c-.82,2.52-1.58,5.06-2.48,7.55-.68,1.87-1.85,2.11-3.28.66l-1.14-1.11q-59-59.22-118-118.39c-2.2-2.21-2.23-3.6,0-5.79,8.56-8.36,17-16.88,25.4-25.36Q355.22,70,400.79,24.16C405.63,19.3,406,19.4,408,26c.38,1.27.74,2.55,1.1,3.82Z" />
                                                    <path d="M205,0q84,0,168,0A37.52,37.52,0,0,1,385.2,1.92c2.58.87,3.79,2.06,1.13,4.31-.4.34-.75.75-1.13,1.13L217,176.16c-8.28,8.31-16.31,8.36-24.52.13L24,7.2c-3.61-3.63-3.47-4.07,1.54-5.69A34.19,34.19,0,0,1,36.18,0Q120.6.06,205,0Z" />
                                                    <path d="M204.41,288q-84,0-168,0A37.15,37.15,0,0,1,23.87,286c-2.76-1-3-2.27-.82-4.14.41-.35.76-.75,1.13-1.13l116-116.51c3.95-4,4-4,8,.06q14.66,14.68,29.32,29.38c15.65,15.58,38.47,15.68,54.22.14q15.35-15.14,30.41-30.55c2.28-2.33,3.71-2.47,6.09-.08Q327,222.37,385.91,281.42c2.86,2.87,2.66,3.58-1.3,4.9a35.16,35.16,0,0,1-11.36,1.74Q288.83,288,204.41,288Z" />
                                                    <path d="M0,144Q0,90,0,35.89a35.25,35.25,0,0,1,2.57-13.2c.87-2.18,2-2.67,3.76-.81.73.78,1.51,1.5,2.26,2.26l115.7,116.19c3.68,3.7,3.68,3.7,0,7.41L8.29,264.22c-4.43,4.44-4.91,4.3-6.8-1.87A36.18,36.18,0,0,1,0,251.74Q.06,197.89,0,144Z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="contact-address-text contact-address-text3">
                                        <p>
                                            <a href="mailto:damamyamamy@gmail.com">
                                                damamyamamy@gmail.com
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-list-box">
                                    <div className="contact-address-small-icon ">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 489.66 489.47"
                                        >
                                            <g
                                                id="Livello_2"
                                                data-name="Livello 2"
                                            >
                                                <g
                                                    id="Livello_1-2"
                                                    data-name="Livello 1"
                                                >
                                                    <path d="M224.74,0h40.17a11.08,11.08,0,0,0,1.84.48,217.79,217.79,0,0,1,59.48,12.79q115,42.8,153.28,159.32c5.51,16.79,8.28,34.18,10.15,51.72v40.08c-.63,5.2-1.1,10.42-1.9,15.59-6.14,39.84-20.54,76.42-44.76,108.74-45.68,61-106.91,94.39-182.89,100.07a227.19,227.19,0,0,1-96.78-13.39q-114.66-42.6-153-158.76C4.67,299.69,1.85,282.12,0,264.39V224.31a24.68,24.68,0,0,0,.54-2.8A215.27,215.27,0,0,1,13.3,163.1q42.87-114.76,159.63-153C189.76,4.62,207.19,1.92,224.74,0Zm215,244.49c1-106.35-87.88-194.68-194.56-194.89s-195.42,88-195.5,194.61c-.09,106.35,88.07,194.68,194.75,194.89S440.58,351.14,439.76,244.49Z" />
                                                    <path d="M156.91,152.34c3.34-.16,6.32,2.59,9.36,5.16q35,29.67,69.89,59.4c2.22,1.91,4.35,2.9,7.31,2.47a10.29,10.29,0,0,1,5.18.44c5.53,2.33,9.68.48,14.33-2.84,32.29-23,64.78-45.77,97.22-68.58,7.78-5.48,13.89-4.84,18.6,1.85,4.23,6,3.3,12-3,16.56C367.33,173,358.67,179,350.07,185q-37.89,26.67-75.83,53.3a9.58,9.58,0,0,0-4.44,7.76c-1,10.16-6.17,17.75-15.86,21.37-4.12,1.54-5.1,3.71-5.09,7.73q.17,62,.06,124.08c0,1.91,0,3.82-.17,5.72-.19,2.56-2,2.88-4.12,2.86s-3.53-.54-3.7-2.79c-.14-1.9-.18-3.82-.18-5.72q0-61.8.07-123.61c0-4.32-.95-6.75-5.47-8.44-9.3-3.48-14.23-10.94-15.49-20.65a9.3,9.3,0,0,0-3.51-6.4q-34.83-29.47-69.56-59.06c-9.51-8.06-9.86-12.09-1.77-21.83C147.89,155.87,150.76,152.44,156.91,152.34Z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="contact-address-text contact-address-text4">
                                        <p>
                                            Siamo aperti dal lunedí al venerdí
                                        </p>
                                        <p>dalle 09:00 alle 16:00</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2>Seguici</h2>
                                <div className="contact-list-socials">
                                    <p>
                                        <a
                                            href="https://www.facebook.com/Da-Mamy-A-Mamy-105663897718034/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Facebook
                                        </a>
                                    </p>
                                    <p>
                                        <a
                                            href="https://www.instagram.com/damamyamamy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Instagram
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                        <div className="contact-icons"></div>
                        <div className="contact-icons-text">
                            <h3>Orario negozio</h3>
                            <p>Lunedí - Venerdí</p>
                            <p>09:00 - 16:00</p>
                        </div>
                    </div>
                    <div>
                        <div className="contact-icons"></div>
                        <div className="contact-icons-text">
                            <h3>Spedizioni</h3>
                            <p>Servizio di spedizione </p>
                            <p>disponibile in tutta Italia</p>
                        </div>
                    </div>
                    <div>
                        <div className="contact-icons"></div>
                        <div className="contact-icons-text">
                            <h3>Assistenza</h3>
                            <p>Sempre disponibili ad</p>
                            <p>assistere i nostri clienti</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
