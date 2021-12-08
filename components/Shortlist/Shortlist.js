import { useState, useEffect } from "react";

import styles from "./style/Shortlist.module.css";
import useWindowDimensions from "../../shared/utils/useWindowDimensions";

import ItemCard from "./ItemCard/ItemCard";

export default function Shortlist({ products, listTitle }) {
    const { width } = useWindowDimensions();
    const [sliceStart, setSliceStart] = useState(0);
    const [step, setStep] = useState(4);

    const seeNext = () => {
        setSliceStart((startingPoint) =>
            startingPoint < products.length - step
                ? startingPoint + step
                : (startingPoint = 0)
        );
    };

    const seePrev = () => {
        let formula = products.length - (products.length % step);
        //il primo if serve per quando si va indietro dalla prima
        //crea automaticamente i breaking point su gli steps esatti
        setSliceStart((startingPoint) =>
            startingPoint < step
                ? formula === products.length
                    ? formula - step
                    : formula
                : startingPoint - step
        );
        //il secondo serve per essere sicuri di non iniziare dall'ultima
        //in quel caso sottrae step
    };

    useEffect(() => {
        document.querySelectorAll(".fade-selector").forEach((el) => {
            el.classList.add(styles["fade-in"]);
        });
    });

    useEffect(() => {
        if (width <= 720) {
            setStep(2);
        } else {
            setStep(4);
        }
    }, [width]);
    useEffect(() => {
        console.log("sliceStart: ", sliceStart);
        // console.log("products.length: ", products.length);
        if (products) {
            if (products.length === sliceStart) {
                setSliceStart((startingPoint) => startingPoint - step);
            }
        }
    }, [sliceStart]);

    return (
        <div className={styles["shortlist"]}>
            <div className={styles["shortlist-topbar"]}>
                <h3>{listTitle}</h3>
                {products &&
                    (products.length > 4 ? (
                        <div className={styles["shortlist-btns"]}>
                            <button
                                className={styles["small-arrow"]}
                                onClick={() => seePrev()}
                            >
                                <div
                                    className={styles["small-arrow-left"]}
                                ></div>
                            </button>
                            <button
                                className={styles["small-arrow"]}
                                onClick={() => seeNext()}
                            >
                                <div
                                    className={styles["small-arrow-right"]}
                                ></div>
                            </button>
                        </div>
                    ) : (
                        <></>
                    ))}
            </div>

            {products ? (
                products.length ? (
                    <div className={styles["products-small"]}>
                        {products
                            .slice(sliceStart, sliceStart + step)
                            .map((product) => (
                                <div
                                    className={`${"fade-selector"} ${
                                        styles["product-box"]
                                    }`}
                                    key={product.id}
                                >
                                    <ItemCard
                                        product={product}
                                        // notAvailables={notAvailables}
                                        // onAddToCart={onAddToCart}
                                        // removeFromCart={removeFromCart}
                                        // cardSize={"small"}
                                    />
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className={styles["center-text"]}>
                        <p>Nessun risultato</p>
                    </div>
                )
            ) : (
                <div className="loader"></div>
            )}
        </div>
    );
}

// usare map su un array
// l'array arriva da un axios req -> server -> database
// si usa l'id dello user (se cé!) per ricevere un array personalizzata
// (si possono usare cookies? stile facebook o pubblicitá per risultati ancora piú personallizati - informarsi)
// se no andare per ordine cronologico - o simile
