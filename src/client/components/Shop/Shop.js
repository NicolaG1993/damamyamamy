import loadable from "@loadable/component";
import { useState, useEffect } from "react";
import "./style/Shop.css";

// REDUX
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    fetchData,
    fetchCategories,
    fetchHighestValue,
} from "../../redux/ShopData/shopData.actions";
import { fetchCart } from "../../redux/LoadCart/loadCart.actions";

const loadData = (state) => state.shopData.data; // a noi data non interessa qua

const ItemsList = loadable(() => import("./ItemsList/ItemsList"));
const ItemsCount = loadable(() => import("./ItemsList/ItemsCount"));
const Filter = loadable(() => import("./Filter/Filter"));
const PageNav = loadable(() => import("./PageNav/PageNav"));
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
        <div id="Shop">
            <div className="shop-wrap">
                <h1>In negozio</h1>
                <ShopUI />
            </div>
        </div>
    );
}

// vogliamo essere sicuri di avere data per shop prima di fare il render dei filters
// perché alcuni reducer hanno bisogno di data (vedi fetchHighestValue e priceRange)
