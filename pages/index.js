import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ShortList from "@/components/Displayers/Shortlist/Shortlist";
import PicAndTextSection from "@/components/Displayers/PicAndTextSection/PicAndTextSection";
import Link from "next/link";

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
                <section className={styles.intro}>
                    <h1>Da Mamy a Mamy</h1>
                    <p>
                        A Cavaion Veronese nasce il negozio di abbigliamento e
                        giocattoli di seconda mano per bambini da 0 a 10 anni
                    </p>
                    <Link className="button" href={"/negozio"}>
                        Vedi gli articoli in negozio
                    </Link>
                </section>
                <ShortList
                    tableName={"Gli ultimi arrivi"}
                    data={[
                        { id: 1, title: "aaa", price: 50 },
                        { id: 2, title: "aaa", price: 50 },
                    ]}
                />
                <PicAndTextSection item={{ title: "Something", price: 9.99 }} />

                <section className={styles.intro}>
                    <h1>Vuoi vendere i tuoi articoli?</h1>
                    {/* <p>Scopri come fare</p> */}
                    <Link className="button" href={"/vendi"}>
                        Scopri come fare
                    </Link>
                </section>
            </main>
        </>
    );
}
