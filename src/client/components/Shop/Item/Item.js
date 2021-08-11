import { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import "./style/Item.css";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getItem } from "../../../redux/LoadData/loadData.actions";
import Button from "../../Button/Button";

const loadItem = (state) => state.loadData.selectedItem;

export default function Item() {
    let match = useRouteMatch();
    let key = match.params.id; // item id
    const dispatch = useDispatch();

    let selectedItem = useSelector(loadItem, shallowEqual);

    const [item, setItem] = useState(null);

    // console.log("🐔 state in Item.js: ", state);
    // console.log("🐔 item in Item.js: ", item);

    useEffect(() => {
        dispatch(getItem({ key: key }));

        // (async () => {
        //     const itemInfos = await commerce.products.retrieve(key);
        //     setItem(itemInfos);
        // })(); //is this autoinvoking? 🐔
    }, [key]);

    useEffect(() => {
        setItem(selectedItem);
    }, [selectedItem]);
    // useEffect(() => {
    //     console.log("🐔 item in Item.js: ", item);
    // }, [item]);

    const ItemWrap = () => (
        <div id="Item">
            <div className="item-wrap">
                <div className="item-pic"></div>
                <div className="item-infos">
                    <h1>{item.name}</h1>
                    <div className="item-infos-price">
                        <h2>{item.price.raw}€</h2>
                        <p>IVA inclusa</p>
                    </div>
                    <div className={"product-divider-small"}> </div>
                    <div className={"item-infos-infos-box"}>
                        <div className="item-infos-conditions">
                            <span>Condizioni:</span>
                            <div className="item-infos-conditions-wrap">
                                <h5>come nuovo</h5>
                                <div className="circle"></div>
                            </div>
                        </div>

                        <div className="item-infos-infos">
                            <span>Categoria:</span>
                            <p>
                                {item.categories[0] && item.categories[0].name}
                            </p>
                        </div>

                        <div className="item-infos-infos">
                            <span>Tags:</span>
                            <div className="item-infos-infos-inner-wrap">
                                {item.categories[0] && (
                                    <Link
                                        to={{
                                            pathname: "/shop",
                                            tag: item.categories[0].name,
                                        }}
                                        className="item-tag"
                                    >
                                        {item.categories[0].name}
                                    </Link>
                                )}

                                <Link
                                    to={{
                                        pathname: "/shop",
                                        tag: "3/5 anni",
                                    }}
                                    className="item-tag"
                                >
                                    3/5 anni
                                </Link>
                            </div>
                        </div>

                        <div className="item-infos-infos">
                            <span>Disponibilitá:</span>
                            <p>Pezzo unico</p>
                        </div>
                    </div>
                    <Button
                        page="/"
                        text="Aggiungi al carrello"
                        type="internal"
                    />
                </div>
            </div>
        </div>
    );

    const ShortlistWrap = () => (
        <section className="item-shortlist-wrap">
            <h2>Shortlist</h2>
            <p>Fullwidth, ma con stessa ombra di Footer?</p>
        </section>
    );
    const ItemDescriptionWrap = () => (
        <section className="item-description-wrap">
            <h2>Descrizione</h2>
            <p>Fullwidth con stessa ombra di Footer!</p>
        </section>
    );

    if (item) {
        return (
            <Switch>
                <Route path={match.path}>
                    <ItemWrap />
                    <ShortlistWrap />
                    <ItemDescriptionWrap />
                </Route>
            </Switch>
        );
    }

    if (!item) {
        return (
            <div className="item-wrap">
                <div className="loader"></div>
            </div>
        );
    }
}
