import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import axios from "axios";
import { getError } from "@/utils/error";

const Slider = dynamic(() => import("@/components/Slider/Slider"), {
    ssr: false,
});
const ShortList = dynamic(
    () => import("@/components/Displayers/Shortlist/Shortlist"),
    {
        ssr: false,
    }
);
const PicAndTextSection = dynamic(
    () => import("@/components/Displayers/PicAndTextSection/PicAndTextSection"),
    {
        ssr: false,
    }
);

export default function Home() {
    const [lastItems, setLastItems] = useState();
    const [lowerPriceItem, setLowerPriceItem] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/hello");
            console.log("💚 data: ", data);
            setLastItems(data.lastItems);
            setLowerPriceItem(data.lowerPrice);
        } catch (err) {
            setLastItems();
            setLowerPriceItem();
            alert(
                "Sembra che abbiamo dei problemi con il nostro sito, riprova piú tardi oppure contattaci al 347 9792 644, ci scusiamo per il disagio."
            );
            // alert(getError(err));
        }
    };

    return (
        <>
            <Head>
                <title>
                    Da Mamy a Mamy • Mercatino dell&apos;usato per Bambini in
                    provincia di Verona
                </title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Da Mamy a Mamy • Mercatino dell'usato per Bambini in provincia di Verona"
                />
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
                <ShortList tableName={"Gli ultimi arrivi"} data={lastItems} />
                {lowerPriceItem && <PicAndTextSection item={lowerPriceItem} />}
                <section className={styles.intro}>
                    <h2>Vuoi vendere i tuoi articoli?</h2>
                    {/* <p>Scopri come fare</p> */}
                    <Link className="button" href={"/documenti/regolamento"}>
                        Scopri come fare
                    </Link>
                </section>
            </main>
        </>
    );
}
