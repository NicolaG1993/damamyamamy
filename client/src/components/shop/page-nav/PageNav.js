// import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function PageNav({ nextPage, previousPage, goToPage }) {
    let state = useSelector((state) => state);

    return (
        <section className="section">
            <div className="container">
                <nav className="pagination">
                    {state.currentPage > 1 && (
                        <button
                            className="small-arrow pagination-previous"
                            onClick={() => {
                                previousPage();
                            }}
                        >
                            <div className="small-arrow-left"></div>
                        </button>
                    )}

                    <ul className="pagination-list">
                        {[...Array(state.filteredPages)].map((value, index) => (
                            <button
                                key={index}
                                className={`button pagination-link ${
                                    state.currentPage === index + 1
                                        ? "is-current"
                                        : ""
                                }`}
                                onClick={() => goToPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </ul>
                    {state.currentPage !== state.totalPages && (
                        <button
                            className="small-arrow pagination-next"
                            onClick={() => {
                                nextPage();
                            }}
                        >
                            <div className="small-arrow-right"></div>
                        </button>
                    )}
                </nav>
            </div>
        </section>
    );
}

/*

• Once you play around with the project a little, you might notice a glaring bug – pagination doesn’t work properly with filters applied. In the interest of keeping this article brief and engaging, that’s been left out.
• Despite using query parameters throughout the project, they aren’t relied on too extensively. In a production app, they should be referenced every time a page is loaded before serving up the documents.
• ‘window.history.pushState’ is called within the main state container. This is an antipattern. Anything that changes the view directly should not be called outside actual components. This would normally be done with ‘redux-thunk’ but, again, this guide would be too long otherwise.
• Nothing restricts users from browsing all the way past the currently available pages – both in the positive and negative directions.


*/
