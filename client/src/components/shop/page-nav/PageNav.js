// import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function PageNav({ nextPage, previousPage, goToPage }) {
    let state = useSelector((state) => state);

    return (
        <section className="section">
            <div className="container">
                <nav className="pagination">
                    <button
                        className="button pagination-previous"
                        onClick={() => {
                            previousPage();
                        }}
                    >
                        Previous
                    </button>
                    <button
                        className="button pagination-next"
                        onClick={() => {
                            nextPage();
                        }}
                    >
                        Next page
                    </button>
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
                </nav>
            </div>
        </section>
    );
}
