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
const filterStore = (state) => state.filterStore;

const ItemsList = loadable(() => import("./ItemsList/ItemsList"));
const Filter = loadable(() => import("./Filter/Filter"));
import PageNav from "./PageNav/PageNav";
import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";

export default function Shop() {
    let storeState = useSelector(filterStore, shallowEqual);
    console.log("storeState changed:", storeState);

    const dispatch = useDispatch();
    useEffect(() => dispatch(setupStore()), []);
    // useEffect(
    //     () => storeState.data && dispatch(fetchHighestValue()),
    //     [storeState.data]
    // );

    return (
        <div id="Shop">
            <div className="shop-wrap">
                <h1>In negozio</h1>

                <Filter fallback={<div className="loader" />} />
                {storeState.filteredItems &&
                    storeState.filteredItems.length === 1 && (
                        <h5>{storeState.filteredItems.length} risultato</h5>
                    )}
                {storeState.filteredItems &&
                    storeState.filteredItems.length > 1 && (
                        <h5>{storeState.filteredItems.length} risultati</h5>
                    )}

                <PageNav />
                <ItemsList fallback={<div className="loader" />} />
                <PageNav />
                {/* <div>
                <h4>Categories:</h4>
                <CategoriesMenu />
            </div> */}
            </div>
        </div>
    );
}
