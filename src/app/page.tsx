import Link from "next/link";
import styles from "./page.module.css";
import ShortList from "@/components/ShortList/ShortList";

export default function Home() {
    // TODO: Vedere quale parte si puó mettere in layout + global css (es. .page)
    return (
        <div className={"page"}>
            <main>
                <section id={styles.SliderSection}>
                    <div></div>
                </section>

                <section id={styles.IntroSection}>
                    <div>
                        <h1>Da Mamy a Mamy</h1>
                        <p>
                            A Cavaion Veronese nasce il negozio di abbigliamento
                            e giocattoli di seconda mano per bambini da 0 a 10
                            anni
                        </p>
                        <div className={"ctas"}>
                            <Link className="primary" href={"/prodotti"}>
                                Vedi tutti gli articoli
                            </Link>
                        </div>
                    </div>
                </section>

                <section id={styles.ShortlistSection}>
                    <ShortList
                        tableName={"Gli ultimi arrivi"}
                        // data={lastItems}
                        data={[
                            { id: 1, name: "Articolo test 1", price: 5 },
                            { id: 2, name: "Articolo test 2", price: 5 },
                            { id: 3, name: "Articolo test 3", price: 5 },
                        ]} // x testing, rimuovere
                    />
                </section>

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
