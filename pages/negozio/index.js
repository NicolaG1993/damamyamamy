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
import PageNav from "@/components/Filters/PageNav";
import Head from "next/head";

export default function Negozio() {
    const [items, setItems] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const [allCategories, setAllCategories] = useState();
    let countPerPage = 15;
    // const [filtersState, setFiltersState] = useState();
    const dispatch = useDispatch();
    let storedFilters = useSelector(selectShopFiltersState, shallowEqual);

    // useEffect(() => {
    //     fetchData(storedFilters);
    //     // setOrder(sessionStorage.getItem(name));
    // }, []);
    useEffect(() => {
        fetchData({ ...storedFilters, countPerPage });
        // console.log("💚 storedFilters: ", storedFilters);
    }, [storedFilters]);

    const handleFilters = (name, value) => {
        console.log("handleFilters: ", name, value);
        // let newState = { ...filtersState, [name]: value };
        // setFiltersState(newState);

        let newState;
        if (name == "category" || name == "order") {
            newState = { ...storedFilters, page: 1, [name]: value };
        } else {
            newState = { ...storedFilters, [name]: value };
        }

        dispatch(saveShopFilters(newState));
    };

    const fetchData = async (obj) => {
        try {
            const { data } = await axios.post("/api/get/all-items", obj);
            console.log("💚 data: ", data);
            setItems(data.items);
            setAllCategories(data.all_categories);
            setTotalPages(
                Math.ceil(Number(data.full_count) / Number(countPerPage))
            );
        } catch (err) {
            setItems();
            setTotalPages(1);
            setAllCategories();
            // alert(getError(err));
            alert(
                "Sembra che abbiamo dei problemi con il nostro sito, riprova piú tardi oppure contattaci al 347 9792 644, ci scusiamo per il disagio."
            );
        }
    };

    return (
        <main className={styles.main} id={styles["Shop"]}>
            <Head>
                <title>In negozio • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="In negozio • Da Mamy a Mamy"
                />
            </Head>
            <section className="page">
                <h1>Negozio</h1>
                <div className={styles.filtersWrap}>
                    <ShopFilters
                        filters={{ ...storedFilters, totalPages }}
                        handleFilters={handleFilters}
                        allCategories={allCategories}
                    />
                </div>
                <ShopItems data={items} />
                <PageNav
                    totalPages={totalPages}
                    page={storedFilters.page}
                    handleFilters={handleFilters}
                />
            </section>
        </main>
    );
}
