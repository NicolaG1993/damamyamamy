import { useState, useEffect } from "react";

import "./style/Shortlist.css";
import useWindowDimensions from "../../utils/useWindowDimensions";

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
        document.querySelectorAll(".product-box").forEach((el) => {
            el.classList.add("fade-in");
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
        <div className="shortlist">
            <div className="shortlist-topbar">
                <h3>{listTitle}</h3>
                {products &&
                    (products.length ? (
                        <div className="shortlist-btns">
                            <button
                                className={"small-arrow"}
                                onClick={() => seePrev()}
                            >
                                <div className="small-arrow-left"></div>
                            </button>
                            <button
                                className={"small-arrow"}
                                onClick={() => seeNext()}
                            >
                                <div className="small-arrow-right"></div>
                            </button>
                        </div>
                    ) : (
                        <></>
                    ))}
            </div>

            {products ? (
                products.length ? (
                    <div className={"products-small"}>
                        {products
                            .slice(sliceStart, sliceStart + step)
                            .map((product) => (
                                <div
                                    className={
                                        "product-box product-box-shortlist"
                                    }
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
                    <div className="center-text">
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
