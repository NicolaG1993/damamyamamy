import loadable from "@loadable/component";
import { useState, useEffect } from "react";
import "./style/Shop.css";

// REDUX
// import { connect } from "react-redux";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    setupStore,
    filterByCategory,
} from "../../redux/FilterStore/filterStore.actions";
// import { fetchHighestValue } from "../../redux/LoadData/loadData.actions";
const filterStore = (state) => state.filterStore.filteredItems;

const ItemsList = loadable(() => import("./ItemsList/ItemsList"));
const Filter = loadable(() => import("./Filter/Filter"));
import PageNav from "./PageNav/PageNav";
import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";

export default function Shop({ research }) {
    let storeState = useSelector(filterStore, shallowEqual);
    // console.log("storeState changed:", storeState);

    const dispatch = useDispatch();
    useEffect(() => dispatch(setupStore()), []);
    // useEffect(
    //     () => storeState.data && dispatch(fetchHighestValue()),
    //     [storeState.data]
    // );

    useEffect(
        () => console.log("storeState changed:", storeState),
        [storeState]
    );

    const ShopUI = () =>
        storeState ? (
            <>
                <Filter
                    research={research}
                    fallback={<div className="loader" />}
                />
                {storeState.length === 1 && (
                    <h5>{storeState.length} risultato</h5>
                )}
                {storeState.length > 1 && (
                    <h5>{storeState.length} risultati</h5>
                )}
                <PageNav />
                <ItemsList fallback={<div className="loader" />} />
                <PageNav />
                {/* <div>
                <h4>Categories:</h4>
                <CategoriesMenu />
            </div> */}
            </>
        ) : (
            <div className="loader" />
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
