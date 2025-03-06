import Link from "next/link";
import styles from "./page.module.css";
// import ShortList from "@/components/ShortList/ShortList";
import Image from "next/image";

export default function Home() {
    return (
        <div className={"page"}>
            <main>
                <section id={styles.SliderSection}>
                    <div>
                        <Image
                            src={
                                "https://nkesmvnfiblqqmspcnsd.supabase.co/storage/v1/object/public/assets//pic2a.jpg"
                            }
                            alt={"Home slider picture"}
                            fill
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    </div>
                </section>

                <section id={styles.IntroSection}>
                    <div>
                        <h1>Da Mamy a Mamy</h1>
                        <p>
                            A Cavaion Veronese nasce il negozio di
                            abbigliamento, giocattoli e attrezzatura di seconda
                            mano per bambini e ragazzi da 0 a 14 anni
                        </p>
                        <div className={"ctas"}>
                            <Link className="primary" href={"/articoli"}>
                                Vedi tutti gli articoli
                            </Link>
                        </div>
                    </div>
                </section>

                {/* <section id={styles.ShortlistSection}>
                    <ShortList
                        listTitle={"Gli ultimi arrivi"}
                        // data={lastItems}
                        // data={[
                        //     { id: 1, name: "Articolo test 1", price: 5 },
                        //     { id: 2, name: "Articolo test 2", price: 5 },
                        //     { id: 3, name: "Articolo test 3", price: 5 },
                        // ]} // x testing, rimuovere
                    />
                </section> */}

                <section id={styles.CTASection}>
                    <div>
                        <h2>Vuoi vendere i tuoi articoli?</h2>
                        <div className={"ctas"}>
                            <Link
                                className="primary"
                                href={"/info/regolamento"}
                            >
                                Scopri come fare
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
