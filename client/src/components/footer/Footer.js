/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Footer({ windowWidth }) {
    const [parallaxHeight, setParallaxHeight] = useState();
    const [scrollTop, setScrollTop] = useState();
    const currentYear = new Date().getFullYear();
    // console.log("scrollTop: ", scrollTop);
    // console.log("windowWidth: ", windowWidth);

    useEffect(() => {
        // component did mount
        window.addEventListener("scroll", handleScroll);

        // returned function will be called on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScrollTop(window.scrollY);
        //if window.width > ?px
        //oppure vedere se trovo width passando event
    };

    useEffect(() => {
        if (
            window.scrollY + window.innerHeight + 200 >=
            document.documentElement.offsetHeight
        ) {
            setParallaxHeight(`0`);
        } else {
            if (windowWidth <= 720) {
                setParallaxHeight(`0`);
            } else setParallaxHeight(`190px`);
        }

        // un altro caso per if: se l'altezza della pagina é quasi uguale all'altezza dello schermo
    }, [scrollTop]);

    return (
        <div className={"footer-comp"}>
            <div className={"footer-wrap"}>
                <div className={"footer"}>
                    <div
                        className="website-footer"
                        css={css`
                            margin-top: ${parallaxHeight};
                            transition: 1.1s ease;
                        `}
                    >
                        <h4>Links</h4>
                        <p>
                            <Link to={"/about"}>Chi siamo</Link>
                        </p>
                        <p>
                            <Link to={"/shop"}>Prodotti</Link>
                        </p>
                        <p>
                            <Link to={"/example-doc"}>Domande frequenti</Link>
                        </p>
                        <p>
                            <Link to={"/example-doc"}>Vendi</Link>
                        </p>
                        <p>
                            <Link to={"/contact"}>Contattaci / Assistenza</Link>
                        </p>
                    </div>

                    <div
                        className="legal-footer"
                        css={css`
                            margin-top: ${parallaxHeight};
                            transition: 1.1s ease;
                        `}
                    >
                        <h4>Informazioni</h4>
                        <p>
                            <Link to={"/example-doc"}>Note legali</Link>
                        </p>
                        <p>
                            <Link to={"/example-doc"}>Cookies policy</Link>
                        </p>
                        <p>
                            <Link to={"/example-doc"}>
                                Termini e condizioni
                            </Link>
                        </p>
                        {/* <p>Metodi di pagamento / Spedizione</p> */}
                    </div>

                    <div
                        className="contact-footer"
                        css={css`
                            margin-top: ${parallaxHeight};
                            transition: 1.1s ease;
                        `}
                    >
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

                    <div
                        className="social-footer"
                        css={css`
                            margin-top: ${parallaxHeight};
                            transition: 1.1s ease;
                        `}
                    >
                        <a href="http://www.instagram.com/">
                            <svg
                                id="Livello_1"
                                data-name="Livello 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    d="M1217,429V650c-.93,7.91-1.65,15.85-2.84,23.72-4.56,30.24-16.07,57.3-37.64,79.44-26.46,27.15-59.74,38.93-96.71,42-8.93.75-17.87,1.23-26.81,1.83H871a34.64,34.64,0,0,0-5.39-.77A202.77,202.77,0,0,1,822,792.1c-55.51-11.4-92.28-43.62-108.21-98.54-7.08-24.4-7.31-49.59-7.9-74.69-.37-15.48-.08-31-.17-46.45,0-2.48-.45-4.95-.69-7.42V517a30.48,30.48,0,0,0,.73-8.41c.22-31.6-.77-63.24,3.08-94.71,2.67-21.87,8.64-42.78,20.31-61.62,26.43-42.64,66.67-61.2,115.06-65.57,8.94-.81,18-.06,26.82-1.69h181a13.28,13.28,0,0,0,5.89.8,238.82,238.82,0,0,1,43.68,4.05c57.62,10.48,98.58,50.34,110.81,107.6C1214.61,407.88,1215.54,418.47,1217,429Zm-46.19,112.5h.16c0-13.5.09-27,0-40.49-.23-28.3.51-56.63-3.2-84.8-5.57-42.38-31.6-70.5-73.23-79.21-20.84-4.37-42.08-4.54-63.14-4.59-53.15-.12-106.31-1.23-159.45.7-12.83.46-25.6,1.08-38.27,3.11-40,6.39-66.68,31.54-75.57,71.14-4.26,19-4.69,38.38-4.7,57.62,0,57.31-1.34,114.63.74,171.94.42,11.5,1,23,3.15,34.25,5.77,30.73,21.14,54.38,50.45,67.48,14.49,6.48,30,8.85,45.62,10.09,23.6,1.87,47.28,1.08,70.92,1.8,42.14,1.29,84.3-.3,126.45-.94,14.24-.21,28.59-.9,42.7-3.82,36.36-7.55,60.64-28.25,71.12-64.35,5.36-18.46,5.62-37.53,6.09-56.44C1171.32,597.18,1170.81,569.34,1170.81,541.5Z"
                                    transform="translate(-705 -285)"
                                />
                                <path
                                    d="M962.15,673.2c-72.76,0-132.42-59.3-132.33-131.84C829.92,468.5,887.8,409,962,409c73.41,0,132,58.41,132,132C1094.05,614.76,1035,672.67,962.15,673.2Zm-.69-47.41c47,0,85.29-37.93,85.34-84.51s-38.25-85.09-84.86-85.08c-46.22,0-84.73,38.25-84.73,84.12C877.21,587.56,914.9,625.8,961.46,625.79Z"
                                    transform="translate(-705 -285)"
                                />
                                <path
                                    d="M1098.08,435.18c-17.56,0-30.3-13.23-30.26-31.36a31.16,31.16,0,0,1,30.75-30.93c16.78,0,31.64,14.35,31.44,31.13C1129.77,423.37,1113.86,436.5,1098.08,435.18Z"
                                    transform="translate(-705 -285)"
                                />
                            </svg>
                        </a>
                        <a href="http://www.facebook.com/">
                            <svg
                                id="Livello_1"
                                data-name="Livello 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 481.25 481.33"
                            >
                                <path
                                    d="M497.13,256.93q0,105.74,0,211.49c0,17.64-11,28.71-28.63,28.71H355c-7.11,0-7.13,0-7.13-7.3q0-86,0-172c0-6.93,0-7,7-7,16.67,0,33.34-.09,50,.05,4.11,0,5.69-1.19,6.2-5.59,2.26-19.48,4.94-38.91,7.61-58.34,1.05-7.66,1-7.85-6.69-7.85-19.17,0-38.34-.14-57.5.09-4.89.05-6.79-1.25-6.69-6.45.3-15.33,0-30.66.12-46,.1-18.54,10.88-29,29.51-30.05,13-.72,26-.54,39-.59,4,0,5.62-1.32,5.58-5.5-.16-17.83-.1-35.66,0-53.49,0-3.13-.7-4.75-4.36-5.1-18.93-1.82-37.88-2-56.87-1.94-45.65.23-80.19,30.78-85.54,76.11-2.45,20.74-.66,41.61-1.05,62.41-.22,11.72.68,10.47-10.55,10.49-15.5,0-31,.16-46.5-.07-4.64-.07-6,1.52-6,6,.19,19.83.25,39.67,0,59.5-.07,5.27,1.86,6.43,6.7,6.36,16.67-.24,33.34,0,50-.18,4.73-.06,6.4,1.42,6.39,6.26q-.19,87,0,174c0,4.4-1.24,6.18-6,6.17q-113-.16-226-.12c-14.33,0-25.26-11.71-26.17-27.51-.1-1.66-.05-3.33-.05-5q0-208,0-416a43.43,43.43,0,0,1,1.76-13.81C21.37,23.5,31,16.59,43.89,15.94c1.33-.07,2.66,0,4,0H465.38a51.52,51.52,0,0,1,9.43.85c13.37,2.51,22.31,13.06,22.31,26.69Q497.15,150.18,497.13,256.93Z"
                                    transform="translate(-15.88 -15.89)"
                                />
                            </svg>
                        </a>
                        <a href="http://www.facebook.com/">
                            <svg
                                id="Livello_1"
                                data-name="Livello 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 636.69 639.44"
                            >
                                <path
                                    d="M968.37,855.41c-56.2-.4-104.69-11.86-150.26-35.23a17.82,17.82,0,0,0-13.84-1.51q-76.12,20.24-152.38,40c-2.37.61-5.33,2.8-7.36.47-1.64-1.88.18-4.65.81-7q20.34-74.37,40.76-148.72c1.31-4.72,1.25-8.77-1.25-13.26a307.27,307.27,0,0,1-37.78-123c-5.83-63.93,6.62-124.46,37.42-180.79,32.19-58.9,78.7-103.36,138.86-133.22a306.52,306.52,0,0,1,105.38-30.53c74.83-7.75,144.32,8,207.09,49.33,71.45,47.05,117.32,112.68,136.69,196.32,5.76,24.9,8.76,50.24,7.9,75.78-2.5,74.48-26.73,141-75.09,198.08-49.58,58.55-112.35,94.56-187.8,108.45-4.57.84-9.18,1.47-13.79,2C990.32,854.2,976.89,855.73,968.37,855.41Zm.06-54.92c8,.39,21.73-1,35.23-3.28,69.58-11.69,126.38-45.38,168.8-101.73,44-58.39,60.67-124.6,50-196.8-9.72-65.55-40.57-120.19-91.83-162.35-65.13-53.58-139.78-71.66-222.24-54.86C849.9,293.39,801.3,323.12,762.9,368.78c-47.75,56.79-67.81,122.67-60.84,196.32A249.79,249.79,0,0,0,742.58,680c3.67,5.59,4.1,10.49,2.31,16.73-7.32,25.56-14.2,51.24-21.2,76.89-2.69,9.85-2.26,10.25,7.26,7.75,27-7.09,54-14,81-21.4,5.71-1.57,10-.71,14.92,2.24C868.57,787.37,913.88,800.08,968.43,800.49Z"
                                    transform="translate(-643.86 -220.7)"
                                />
                                <path
                                    d="M1046.07,690.18c-24.08,1.36-44.84-8.28-65.84-16.41-61.68-23.91-106.2-68.46-144.1-120.86-13.74-19-25.81-38.82-31.37-61.86-8.76-36.29.13-67.43,27.89-92.88,6-5.45,13.14-7,20.76-7.61,6.24-.46,12.39.56,18.54,1.36,5.46.71,8.53,4.59,10.56,9.18,4.49,10.12,8.74,20.36,13,30.57,4.21,10,8.16,20.14,12.61,30,3.63,8.06,3.24,15.39-2.21,22.44s-10.77,14.66-16.59,21.62c-4.74,5.67-5.56,10.91-1.62,17.48,25.6,42.75,61.2,73.69,107.62,92.08,6.12,2.43,11,1.43,15.42-3.66,7.86-9,15.55-18.19,22.68-27.82,6.68-9,10.11-10.11,20.37-5.87,21.54,8.9,42.12,19.8,63,30.07,4.89,2.41,7.82,6.36,7.58,11.55-.64,13.78-1.94,27.75-10.38,39.25-11.93,16.23-29,25-48.11,30C1059.21,690.59,1052.31,690.38,1046.07,690.18Z"
                                    transform="translate(-643.86 -220.7)"
                                />
                            </svg>
                        </a>
                        <a href="http://www.facebook.com/">
                            <svg
                                id="Livello_1"
                                data-name="Livello 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 361.01 409.11"
                            >
                                <path
                                    d="M957,745.4c-7.48-1-15-1.92-22.43-3.09-19.13-3-37.46-8.95-55.7-15.25a3.48,3.48,0,0,1-2.53-3.63c0-1.06,0-2.12,0-3.19q0-84.22-.11-168.45c0-4.54,1.39-6.94,5.51-8.81,11.91-5.41,23.15-12,32.9-20.85,11.41-10.39,17.6-23.91,22.43-38.09,6.45-19,10.79-38.36,11.15-58.5a40.77,40.77,0,0,1,.89-7.12c.95-4.72,5.18-9,9.91-9.12,8.08-.22,16.18-.79,24.21,1.22a49.75,49.75,0,0,1,37.8,44.7c.71,10.76-.34,21.47-1.65,32.15-1.42,11.61-3.23,23.15-6.78,34.35-2.27,7.17-2.25,7.17,5.23,7.17,27.81,0,55.62-.06,83.43,0a42,42,0,0,1,27,9.25,35,35,0,0,1,6.6,47.6c-1.67,2.33-2,4-.23,6.64,13.31,19.6,6.44,44.3-15.13,54.18-3.59,1.64-4.07,3.08-3.15,6.81,4.21,17-4.52,33.88-21.23,41.34-3.06,1.37-3.77,2.57-2.87,5.89,5.21,19.25-7.15,38.73-27.59,43.9-1,.26-2,.57-3.05.86Z"
                                    transform="translate(-780.41 -336.29)"
                                />
                                <path
                                    d="M789.33,745.4c-6.48-2.71-8.93-7.78-8.92-14.57q.06-93.55,0-187.12c0-9.83,5-14.79,14.73-14.81q21.74,0,43.49,0c9.8,0,14.67,4.93,14.67,14.72q0,93.38.09,186.73c0,6.82-2,11.91-8.2,15Z"
                                    transform="translate(-780.41 -336.29)"
                                />
                                <path
                                    d="M1033.5,336.5a11.8,11.8,0,0,1,10.88,16.59c-3.83,8.88-8.31,17.52-13,26-3.19,5.79-10.18,7.37-16,4.41a12,12,0,0,1-5.71-15.62c4-8.68,8.35-17.21,12.84-25.64C1024.74,338,1028.66,336.17,1033.5,336.5Z"
                                    transform="translate(-780.41 -336.29)"
                                />
                                <path
                                    d="M924.94,349.1c.12-6.37,3.5-10.84,8.51-12.29,5.2-1.49,11.13.26,13.66,4.93,4.75,8.75,9.28,17.66,13.36,26.75,2.52,5.61-.4,12.26-5.7,15s-12.55,1.39-15.86-4a201.89,201.89,0,0,1-13.55-27.08A9.17,9.17,0,0,1,924.94,349.1Z"
                                    transform="translate(-780.41 -336.29)"
                                />
                                <path
                                    d="M1069.21,408.34c3.86,0,7.71,0,11.57,0a12.37,12.37,0,0,1,12.62,11.41,11.93,11.93,0,0,1-10.13,12.77,102.32,102.32,0,0,1-29,0c-6-.86-10-6.57-9.56-12.8a11.74,11.74,0,0,1,11.32-11.28c4.38-.2,8.77,0,13.16,0Z"
                                    transform="translate(-780.41 -336.29)"
                                />
                                <path
                                    d="M900.77,408.34c4.11,0,8.23-.07,12.35,0,6.49.14,11.47,4.55,12,10.51.65,6.89-3.2,12.77-9.86,13.7a102.26,102.26,0,0,1-28.55,0,11.82,11.82,0,0,1-10-12.81c.66-6.82,5.56-11.31,12.49-11.39C893.06,408.31,896.91,408.34,900.77,408.34Z"
                                    transform="translate(-780.41 -336.29)"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className={"copyrights darker-tone"}>
                    <h5>Da Mamy a Mamy, © {currentYear}</h5>
                </div>
            </div>
        </div>
    );
}
