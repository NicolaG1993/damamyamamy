// import axios from "/client/src/axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/Home.css";

import Slider from "../slider/Slider";
import images from "../slider/img/images";
import ItemsListShort from "../items-list-short/ItemsListShort";

export default function Home({
    notAvailables,
    onAddToCart,
    removeFromCart,
    windowWidth,
}) {
    let state = useSelector((state) => state);
    const [iconslistHeight, setIconslistHeight] = useState(`800px`);
    const [shortlistPadding, setShortlistPadding] =
        useState(`100px 40px 90px 40px`);
    const [scrollTop, setScrollTop] = useState();

    useEffect(() => {
        // component did mount
        window.scrollTo(0, 0);
        window.addEventListener("scroll", handleScroll);
        // returned function will be called on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollTop > 1380) {
            if (windowWidth <= 720) {
                setIconslistHeight(`1000px`);
                setShortlistPadding(`100px 20px 120px 20px`);
            } else {
                setIconslistHeight(`400px`);
                setShortlistPadding(`100px 40px 90px 40px`);
            }
        } else {
            if (windowWidth <= 720) {
                setIconslistHeight(`800px`);
                setShortlistPadding(`100px 20px 120px 20px`);
            } else {
                setIconslistHeight(`800px`);
                setShortlistPadding(`100px 40px 300px 40px`);
            }
        }
    }, [scrollTop]);

    // console.log("this.state in home: ", this.state);
    // console.log("this.props: ", this.props);

    const handleScroll = () => {
        setScrollTop(window.scrollY);
    };

    return (
        <div id="home">
            <Slider slides={images} autoPlay={10} />

            <div className={"shortlist"} style={{ padding: shortlistPadding }}>
                <h2>IN NEGOZIO</h2>
                <Link to={"/shop"} className={"fake-btn btn-dark2"}>
                    Vedi tutti gli articoli
                </Link>

                <ItemsListShort
                    products={state.catNew}
                    notAvailables={notAvailables}
                    onAddToCart={onAddToCart}
                    removeFromCart={removeFromCart}
                    listTitle={"Ultimi arrivi"}
                    windowWidth={windowWidth}
                />

                <ItemsListShort
                    products={state.cat1}
                    notAvailables={notAvailables}
                    onAddToCart={onAddToCart}
                    removeFromCart={removeFromCart}
                    listTitle={"Abbigliamento"}
                    windowWidth={windowWidth}
                />

                <ItemsListShort
                    products={state.cat2}
                    notAvailables={notAvailables}
                    onAddToCart={onAddToCart}
                    removeFromCart={removeFromCart}
                    listTitle={"Neonati"}
                    windowWidth={windowWidth}
                />
            </div>

            <div className="iconslist" style={{ height: iconslistHeight }}>
                <div className="iconslist-wrap">
                    <div className="iconslist-icon-box">
                        <div className="iconslist-icon"></div>
                        <h3>Affidabilità</h3>
                        <p>
                            Offriamo il migliore servizio, controllando ogni
                            prodotto
                        </p>
                    </div>
                    <div className="iconslist-icon-box">
                        <div className="iconslist-icon"></div>
                        <h3>Qualità</h3>
                        <p>
                            Da noi puoi aspettarti solo articoli in ottime
                            condizioni
                        </p>
                    </div>
                    <div className="iconslist-icon-box">
                        <div className="iconslist-icon"></div>
                        <h3>Sicurezza</h3>
                        <p>I prodotti per bambini sono sicuri al 100% </p>
                    </div>
                    <div className="iconslist-icon-box">
                        <div className="iconslist-icon"></div>
                        <h3>Rimborsi</h3>
                        <p>
                            In caso di prodotti rovinati é previsto il rimborso
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
