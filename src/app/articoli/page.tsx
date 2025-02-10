import Shop from "@/components/Shop/Shop";
import ShopItemsSkeleton from "@/components/Shop/ShopItemsSkeleton";
import { Suspense } from "react";
// import styles from "./page.module.css";

export default function Articoli() {
    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Articoli</h1>
                        <Suspense fallback={<ShopItemsSkeleton />}>
                            <Shop />
                        </Suspense>
                    </div>
                </section>
            </main>
        </div>
    );
}
