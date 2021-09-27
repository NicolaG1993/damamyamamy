import loadable from "@loadable/component";
import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";

import useScrollPosition from "../../utils/useScrollPosition";
import useWindowDimensions from "../../utils/useWindowDimensions";
import "./style/Home.css";
const fetchData = (state) => state.loadData;

const Slider = loadable(() => import("./Slider/Slider"));
// const Shortlist = loadable(() => import("../Shortlist/Shortlist"));

import Shortlist from "../Shortlist/Shortlist";
import IconsList from "./IconsList/IconsList";
import Button from "../Button/Button";

export default function Home() {
    let data = useSelector(fetchData, shallowEqual);

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

    // const dispatch = useDispatch();
    // const toggle = () => {
    //     dispatch(toggleLayout({ id: "overlay", fn: "toggle" }));
    // };

    // const style = {
    //     color: "red",
    //     textAlign: "center",
    // };

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
                <Shortlist
                    products={data.catNewItems}
                    listTitle={"Ultimi arrivi"}
                />
                <Shortlist products={data.cat1} listTitle={"Giochi"} />
                <Shortlist
                    products={data.cat2}
                    listTitle={"Passeggini e trasporto"}
                />
            </section>
            <IconsList iconslistHeight={iconslistHeight} />
            {/* Home component is here!
            <div className="hello"></div>
            <Button
                page="http://www.instagram.com"
                text="Visit our Instagram page"
                type="external"
            />
            <br />
            <br />
            <Button page="/about" text="About us" type="internal" />
            <br />
            <br />
            <Button fn={toggle} text="Toggle Overlay" type="function" /> */}
        </div>
    );
}
