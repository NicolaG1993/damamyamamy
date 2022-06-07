import { useState, useEffect } from "react";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./style/ItemsList.module.css";
// import CartButton from "../../CartButton/CartButton";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setPageNav } from "../../../redux/PageNav/pageNav.actions";

const loadFilteredItems = (state) => state.shopData.filteredItems;
const loadPageNav = (state) => state.pageNav;

export default function ItemsList() {
    //COMPONENT
    let pagination = useSelector(loadPageNav, shallowEqual);
    let filteredItems = useSelector(loadFilteredItems, shallowEqual);

    const [results, setResults] = useState(filteredItems); //prendiamo lo state settato da Filter component
    const [onPage, setOnPage] = useState([]);

    // console.log("🧠🧠🧠PAGINATION!!!!!", pagination.displayedItems);

    useEffect(() => {
        document.querySelectorAll(".fade-selector").forEach((el) => {
            el.classList.add(styles["fade-in"]);
        });
    });

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
    console.log("🍄🍄🍄 onPage -> ", onPage);
    return (
        <div className={styles["items-list"]}>
            {onPage ? (
                onPage.length < 1 ? (
                    <h4>No results</h4>
                ) : (
                    onPage.map((item) => <ItemCard item={item} key={item.id} />)
                )
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
}
