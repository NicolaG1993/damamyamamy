import { useEffect } from "react";
// import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import "./style/PageNav.css";
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
        <div id="PageNav">
            <div className="pagenav-wrap">
                <nav className="pagination">
                    {pageNav.currentPage > 1 && (
                        <button
                            className="small-arrow pagination-previous"
                            onClick={() => {
                                previousPage();
                            }}
                        >
                            <div className="small-arrow-left">Prev</div>
                        </button>
                    )}

                    <ul className="pagination-list">
                        {[...Array(pageNav.filteredPages)].map(
                            (value, index) => (
                                <button
                                    key={index}
                                    className={`button pagination-link ${
                                        pageNav.currentPage === index + 1
                                            ? "is-current"
                                            : ""
                                    }`}
                                    onClick={() => goToPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                    </ul>

                    {pageNav.currentPage !== pageNav.totalPages && (
                        <button
                            className="small-arrow pagination-next"
                            onClick={() => {
                                nextPage();
                            }}
                        >
                            <div className="small-arrow-right">Next</div>
                        </button>
                    )}
                </nav>
            </div>
        </div>
    );
}
