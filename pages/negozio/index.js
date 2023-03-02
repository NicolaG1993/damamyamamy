import { getError } from "@/utils/error";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/Shop.module.css";
import ShopItems from "@/components/Displayers/ShopItems/ShopItems";
import ShopFilters from "@/components/Filters/ShopFilters";
import {
    selectShopFiltersState,
    saveShopFilters,
} from "@/redux/slices/formsSlice";

export default function Negozio() {
    const [items, setItems] = useState();
    // const [filtersState, setFiltersState] = useState();
    const dispatch = useDispatch();
    let storedFilters = useSelector(selectShopFiltersState, shallowEqual);

    useEffect(() => {
        fetchData();
        // setOrder(sessionStorage.getItem(name));
    }, []);
    useEffect(() => {
        console.log("💚 storedFilters: ", storedFilters);
    }, [storedFilters]);

    const handleFilters = (name, value) => {
        console.log("handleFilters: ", name, value);
        // let newState = { ...filtersState, [name]: value };
        // setFiltersState(newState);
        let newState = { ...storedFilters, [name]: value };
        dispatch(saveShopFilters(newState));
    };

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/get/all-items");
            // console.log("💚 data: ", data);
            setItems(data);
        } catch (err) {
            setItems();
            // alert(getError(err));
            alert(
                "Sembra che abbiamo dei problemi con il nostro sito, riprova piú tardi oppure contattaci al 347 9792 644, ci scusiamo per il disagio."
            );
        }
    };

    const handleOrder = () => {};

    return (
        <main className={styles.main} id={styles["Shop"]}>
            <section className="page">
                <h1>Negozio</h1>
                <div className={styles.filtersWrap}>
                    <ShopFilters
                        filters={storedFilters}
                        handleFilters={handleFilters}
                    />
                </div>
                <ShopItems data={items} />
            </section>
        </main>
    );
}
