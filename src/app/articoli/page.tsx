import Shop from "@/components/Shop/Shop";
// import styles from "./page.module.css";

export default function Articoli() {
    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Articoli</h1>
                        <Shop />
                    </div>
                </section>
            </main>
            {/* <h1>Articoli</h1>
            <p>• Filtri e ricerca</p>
            <p>• Lista articoli - paginazione</p>
            <p>• UI o pagina per articolo</p> */}
        </div>
    );
}
