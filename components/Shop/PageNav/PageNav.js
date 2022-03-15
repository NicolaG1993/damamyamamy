import { useEffect } from "react";
// import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styles from "./style/PageNav.module.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { getItem } from "../../../redux/LoadData/loadData.actions";
import {
    loadNewPage,
    loadExactPage,
} from "../../../redux/PageNav/pageNav.actions";
const loadPageNav = (state) => state.pageNav;

export default function PageNav() {
    const dispatch = useDispatch();
    // let state = useSelector((state) => state);
    let pageNav = useSelector(loadPageNav, shallowEqual);

    const nextPage = () => dispatch(loadNewPage({ page: 1 }));
    const previousPage = () => dispatch(loadNewPage({ page: -1 }));
    const goToPage = (page) => dispatch(loadExactPage({ page }));

    // useEffect(() => dispatch(setPageNav()), []);

    return (
        <div id={styles["PageNav"]}>
            <div className={styles["pagenav-wrap"]}>
                <nav className={styles["pagination"]}>
                    <div className={styles["pagination-list"]}>
                        {" "}
                        {pageNav.currentPage > 1 && (
                            <button
                                className={`${styles["pagenav-arrow"]} ${styles["pagination-previous"]}`}
                                onClick={() => {
                                    previousPage();
                                }}
                            >
                                <div className={styles["pagenav-prev"]}></div>
                            </button>
                        )}
                        {[...Array(pageNav.filteredPages)].map(
                            (value, index) => (
                                <button
                                    key={index}
                                    className={`${styles["pagenav-button"]} ${
                                        styles["pagination-link"]
                                    } ${
                                        pageNav.currentPage === index + 1
                                            ? styles["is-current"]
                                            : ""
                                    }`}
                                    onClick={() => goToPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                        {pageNav.currentPage !== pageNav.totalPages && (
                            <button
                                className={`${styles["pagenav-arrow"]} ${styles["pagination-next"]}`}
                                onClick={() => {
                                    nextPage();
                                }}
                            >
                                <div className={styles["pagenav-next"]}></div>
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}
