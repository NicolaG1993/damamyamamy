import Head from "next/head";

import { useState, useEffect } from "react";
import useScrollPosition from "../shared/utils/useScrollPosition";
import styles from "../components/Contact/style/Contact.module.css";

import { MemoizedContactForm } from "../components/Contact/ContactForm/ContactForm";
import ContactList from "../components/Contact/ContactList/ContactList";
import ContactMap from "../components/Contact/ContactMap/ContactMap";

export default function Contact() {
    const { scrollTop } = useScrollPosition();
    const [padding, setPadding] = useState(); //usando hooks cosí ho anche l'animazione al caricamento, quando il padding non é ancora definito

    // useEffect(() => {
    //     console.log("MOUNTED");
    // }, []);

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
        <div id={styles["Contact"]}>
            <Head>
                <title>Contatto - Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Contatto - Da Mamy a Mamy" />
            </Head>

            <div
                className={styles["contact-wrap"]}
                style={{ padding: padding }}
            >
                <MemoizedContactForm />
                <ContactList />
            </div>
            <ContactMap />
        </div>
    );
}
