import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import styles from "../components/Shop/style/Shop.module.css";

// REDUX
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    fetchData,
    fetchCategories,
    fetchHighestValue,
} from "../redux/ShopData/shopData.actions";
import { fetchCart } from "../redux/LoadCart/loadCart.actions";

const loadData = (state) => state.shopData.data; // a noi data non interessa qua

const ItemsList = dynamic(
    () => import("../components/Shop/ItemsList/ItemsList"),
    {
        ssr: false,
    }
);
const ItemsCount = dynamic(
    () => import("../components/Shop/ItemsList/ItemsCount"),
    {
        ssr: false,
    }
);
const Filter = dynamic(() => import("../components/Shop/Filter/Filter"), {
    ssr: false,
});
const PageNav = dynamic(() => import("../components/Shop/PageNav/PageNav"), {
    ssr: false,
});

// import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";

export default function Shop({ research }) {
    let data = useSelector(loadData, shallowEqual);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log("SHOP RENDERS");
        if (!data) {
            dispatch(fetchData());
            dispatch(fetchCategories());
        } // solo se non abbiamo gia data in redux!
    }, []);

    useEffect(() => data && dispatch(fetchHighestValue()), [data]);

    const ShopUI = () =>
        data && data.length ? (
            <>
                <Filter
                    research={research}
                    fallback={<div className="loader" />}
                />
                <ItemsCount />
                <PageNav />
                <ItemsList fallback={<div className="loader" />} />
                <PageNav />
                {/* <div>
                <h4>Categories:</h4>
                <CategoriesMenu />
            </div> */}
            </>
        ) : (
            <>
                <div className="loader" />
            </>
        );

    return (
        <div id={styles["Shop"]}>
            <div className={styles["shop-wrap"]}>
                <h1>In negozio</h1>
                <ShopUI />
            </div>
        </div>
    );
}

// vogliamo essere sicuri di avere data per shop prima di fare il render dei filters
// perché alcuni reducer hanno bisogno di data (vedi fetchHighestValue e priceRange)
