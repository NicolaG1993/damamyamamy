import loadable from "@loadable/component";
import { useState, useEffect } from "react";

// REDUX
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    fetchData,
    fetchCategories,
    fetchSpecificCategories,
} from "../../redux/ShopData/shopData.actions";
const loadData = (state) => state.shopData.data;
const loadCats = (state) => state.shopData.categories;
const loadCatNewItems = (state) => state.shopData.catNewItems;
const loadCat1 = (state) => state.shopData.cat1;
const loadCat2 = (state) => state.shopData.cat2;

// UTILS
import useScrollPosition from "../../utils/useScrollPosition";
import useWindowDimensions from "../../utils/useWindowDimensions";

// COMPONENTS
import "./style/Home.css";
const Slider = loadable(() => import("./Slider/Slider"));
const Shortlist = loadable(() => import("../Shortlist/Shortlist"));
import IconsList from "./IconsList/IconsList";
import Button from "../Button/Button";

export default function Home() {
    //redux
    let data = useSelector(loadData, shallowEqual);
    let categories = useSelector(loadCats, shallowEqual);
    let catNewItems = useSelector(loadCatNewItems, shallowEqual);
    let cat1 = useSelector(loadCat1, shallowEqual);
    let cat2 = useSelector(loadCat2, shallowEqual);
    const dispatch = useDispatch();

    //hooks
    useEffect(() => {
        if (!data || !categories) {
            dispatch(fetchData());
            dispatch(fetchCategories());
        }
    }, []);

    useEffect(() => {
        data && console.log("data.data changed:", data);
        data && dispatch(fetchSpecificCategories());
    }, [data]);

    //style
    const [iconslistHeight, setIconslistHeight] = useState(`800px`);
    const [shortlistPadding, setShortlistPadding] =
        useState(`100px 40px 90px 40px`);
    const { scrollTop } = useScrollPosition();
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (scrollTop > 1410) {
            if (width <= 720) {
                setIconslistHeight(`1000px`);
                setShortlistPadding(`100px 20px 120px 20px`);
            } else {
                setIconslistHeight(`400px`);
                setShortlistPadding(`100px 40px 90px 40px`);
            }
        } else {
            if (width <= 720) {
                setIconslistHeight(`800px`);
                setShortlistPadding(`100px 20px 120px 20px`);
            } else {
                setIconslistHeight(`800px`);
                setShortlistPadding(`100px 40px 300px 40px`);
            }
        }
    }, [scrollTop]);

    return (
        <div id="Home">
            <Slider fallback={<div className="loader" />} width={width} />
            <section
                className="home-wrap"
                style={{ padding: shortlistPadding }}
            >
                <h2>IN NEGOZIO</h2>
                <Button
                    page="/shop"
                    text="Vedi tutti gli articoli"
                    type="internal"
                />

                <>
                    <Shortlist
                        products={catNewItems}
                        listTitle={"Ultimi arrivi"}
                    />
                    <Shortlist products={cat1} listTitle={"Giochi"} />
                    <Shortlist
                        products={cat2}
                        listTitle={"Passeggini e trasporto"}
                    />
                </>
            </section>
            <IconsList iconslistHeight={iconslistHeight} />
        </div>
    );
}
