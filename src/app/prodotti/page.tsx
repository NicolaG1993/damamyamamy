import Shop from "@/components/Shop/Shop";
// import styles from "./page.module.css";

export default function Prodotti() {
    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Prodotti</h1>
                        <Shop />
                    </div>
                </section>
            </main>
            {/* <h1>Prodotti</h1>
            <p>• Filtri e ricerca</p>
            <p>• Lista prodotti - paginazione</p>
            <p>• UI o pagina per prodotto</p> */}
        </div>
    );
}
