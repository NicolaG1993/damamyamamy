import { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import "./style/Item.css";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getItem } from "../../../redux/LoadData/loadData.actions";

const loadItem = (state) => state.loadData.selectedItem;

export default function Item() {
    let match = useRouteMatch();
    let key = match.params.id; // item id
    const dispatch = useDispatch();

    let selectedItem = useSelector(loadItem, shallowEqual);

    const [item, setItem] = useState(null);

    // console.log("🐔 state in Item.js: ", state);
    console.log("🐔 item in Item.js: ", item);

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

    if (item) {
        return (
            <Switch>
                <Route path={match.path}>
                    <div id="Item">
                        <div className="item-wrap">
                            <div className="item-infos">
                                <p>Name: {item.name}</p>
                                <p>
                                    Animal: {item.animal} animalID#
                                    {item.animalID}
                                </p>
                                <p>Breed: {item.breed}</p>
                                <p>Breed ID: #{item.breedID}</p>
                                <p>Age: {item.age} y.o.</p>
                                <p>Color: {item.color}</p>
                                {item.skinTexture && (
                                    <p>Skin texture: {item.skinTexture}</p>
                                )}
                            </div>
                            <div className="item-pic"></div>
                        </div>
                    </div>
                </Route>
            </Switch>
        );
    }

    if (!item) {
        return (
            <div className="item-wrap">
                <div className="loader loader-alternative1"></div>
            </div>
        );
    }
}
