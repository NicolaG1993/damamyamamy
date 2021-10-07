import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    fetchCategories,
    filterByCategory,
} from "../../../redux/ShopData/shopData.actions";
const getCategories = (state) => state.shopData.categories;
import styles from "./style/CategoriesMenu.module.css";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function CategoriesMenu() {
    const { width } = useWindowDimensions();
    const [sliceStart, setSliceStart] = useState(0);
    const [step, setStep] = useState(7);

    let categories = useSelector(getCategories, shallowEqual);

    const dispatch = useDispatch();

    const handleSelectCategory = async (arg, argID) => {
        // modifico solo filters.category con arg
        // setFilters((prevState) => ({
        // ...prevState,
        // category: arg,
        // categoryID: argID,
        // })); // forse non servirá setFilters
        // pure qui passiamo arg perché setState é async //dovremmo usare un useEffect in alternativa //il valore di state non ancora settato
        dispatch(filterByCategory({ value: arg, valueID: argID }));
        // filterByCategory({ value: arg, valueID: argID });
        console.log("activate handleSelectCategory");
    };

    const seeNext = () => {
        setSliceStart((startingPoint) =>
            startingPoint < categories.length - step
                ? startingPoint + step
                : (startingPoint = 0)
        );
    };

    const seePrev = () => {
        let formula = categories.length - (categories.length % step);
        //il primo if serve per quando si va indietro dalla prima
        //crea automaticamente i breaking point su gli steps esatti
        setSliceStart((startingPoint) =>
            startingPoint < step
                ? formula === categories.length
                    ? formula - step
                    : formula
                : startingPoint - step
        );
        //il secondo serve per essere sicuri di non iniziare dall'ultima
        //in quel caso sottrae step
    };

    useEffect(() => {
        if (width <= 720) {
            setStep(2);
        } else {
            setStep(7);
        }
    }, [width]);
    useEffect(() => {
        console.log("sliceStart: ", sliceStart);
        // console.log("categories.length: ", categories.length);
        if (categories) {
            if (categories.length === sliceStart) {
                setSliceStart((startingPoint) => startingPoint - step);
            }
        }
    }, [sliceStart]);

    return (
        <nav className={styles["categories-nav"]}>
            <button
                className={styles["categories-btn"]}
                onClick={() => seePrev()}
            >
                prev
            </button>

            {categories ? (
                <div className={styles["categories-wrap"]}>
                    <p onClick={() => handleSelectCategory("", "")}>All</p>
                    {categories
                        .slice(sliceStart, sliceStart + step)
                        .map((category) => (
                            <p
                                key={category.id}
                                onClick={() =>
                                    handleSelectCategory(
                                        category.name,
                                        category.id
                                    )
                                }
                            >
                                {category.name}
                            </p>
                        ))}
                </div>
            ) : (
                <div className={styles["center-text"]}>
                    <p>Nessun risultato</p>
                </div>
            )}

            <button
                className={styles["categories-btn"]}
                onClick={() => seeNext()}
            >
                next
            </button>
        </nav>
    );
}
