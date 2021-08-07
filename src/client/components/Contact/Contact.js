import loadable from "@loadable/component";
import { useState, useEffect } from "react";
import useScrollPosition from "../../utils/useScrollPosition";
import "./style/Contact.css";

import { MemoizedContactForm } from "./ContactForm/ContactForm";
const ContactList = loadable(() => import("./ContactList/ContactList"));
const ContactMap = loadable(() => import("./ContactMap/ContactMap"));

export default function Contact() {
    const { scrollTop } = useScrollPosition();
    const [padding, setPadding] = useState(); //usando hooks cosí ho anche l'animazione al caricamento, quando il padding non é ancora definito

    useEffect(() => {
        console.log("MOUNTED");
    }, []);

    useEffect(() => {
        if (scrollTop > 70) {
            if (scrollTop > 250) {
                setPadding(`20px`);
            } else {
                setPadding(`10px 20px 50px 20px`);
            }
        } else {
            setPadding(`125px 20px 160px 20px`);
            // per screen > 1110px = 160px 20px 160px 20px
        }
    }, [scrollTop]);

    return (
        <div id="Contact">
            <div className="contact-wrap" style={{ padding: padding }}>
                <MemoizedContactForm />
                <ContactList fallback={<div className="loader" />} />
            </div>
            <ContactMap fallback={<div className="loader" />} />
        </div>
    );
}
