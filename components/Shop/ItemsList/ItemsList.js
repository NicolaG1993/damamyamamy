import Link from "next/link";
import { useState, useEffect } from "react";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./style/ItemsList.module.css";
import CartButton from "../../CartButton/CartButton";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setPageNav } from "../../../redux/PageNav/pageNav.actions";

const loadFilteredItems = (state) => state.shopData.filteredItems;
const loadPageNav = (state) => state.pageNav;

export default function ItemsList() {
    let pagination = useSelector(loadPageNav, shallowEqual);
    let filteredItems = useSelector(loadFilteredItems, shallowEqual);

    const [results, setResults] = useState(filteredItems); //prendiamo lo state settato da Filter component
    const [onPage, setOnPage] = useState([]);

    // console.log("🧠🧠🧠PAGINATION!!!!!", pagination.displayedItems);

    useEffect(() =>
        document.querySelectorAll(".shop-item-wrap").forEach((el) => {
            el.classList.add("fade-in");
        })
    );

    const dispatch = useDispatch();
    const setPageState = (arg) =>
        filteredItems && dispatch(setPageNav({ ItemsList: arg }));

    useEffect(() => setPageState(filteredItems), []); // settiamo PageNav

    useEffect(() => {
        // console.log("🧠ItemsList updates results with: ", filteredItems);
        setResults(filteredItems);
        setPageState(filteredItems || results);
    }, [filteredItems]); // settiamo state e PageNav quando cambiano filteredItems

    useEffect(
        () => setOnPage(pagination.displayedItems),
        [pagination.displayedItems]
    );
    //quando i displayedItems cambiano da pageNav reducer state
    // vengono passati attraverso il pagenav reducer
    // li viene gestita la paginazione e ci torna dei nuovi results, che vogliamo usare per render
    // non filteredItems

    // console.log("🍄🍄🍄 filteredItems -> ", filteredItems);
    // console.log("🍄🍄🍄 results -> ", results);
    // console.log("🍄🍄🍄 onPage -> ", onPage);
    return (
        <div className={styles["items-list"]}>
            {onPage ? (
                onPage.length < 1 ? (
                    <h4>No results</h4>
                ) : (
                    onPage.map((item) => (
                        <div className={styles["shop-item-wrap"]} key={item.id}>
                            <Link href={`/item/${item.id}`}>
                                <a>
                                    <ItemCard item={item} />
                                </a>
                            </Link>
                            <CartButton wrapSize="small" product_id={item.id} />
                        </div>
                    ))
                )
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
}
