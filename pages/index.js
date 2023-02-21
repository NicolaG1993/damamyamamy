import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// import useScrollPosition from "../shared/utils/useScrollPosition";
// import useWindowDimensions from "../shared/utils/useWindowDimensions";
// import { formatJSDate } from "../shared/utils/convertTimestamp";

const Slider = dynamic(() => import("@/components/Slider/Slider"), {
    ssr: false,
});
// import Shortlist from "../components/Shortlist/Shortlist";
// import IconsList from "../components/Home/IconsList/IconsList";
// import Button from "../components/Button/Button";

export default function Home() {
    return (
        <>
            <Head>
                <title>
                    Da Mamy a Mamy - Mercatino dell&apos;usato per Bambini in
                    provincia di Verona
                </title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Da Mamy a Mamy - Mercatino dell'usato per Bambini in provincia di Verona"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main} id={styles["Home"]}>
                <Slider />
                {/* Shortlist */}
                <section>
                    <h3>Gli ultimi arrivi</h3>
                </section>
                <section>
                    <h4>Section</h4>
                </section>
            </main>
        </>
    );
}
