export default function PageNav({ nextPage, previousPage, goToPage }) {
    return (
        <section className="section">
            <div className="container">
                <nav
                    className="pagination"
                    role="navigation"
                    aria-label="pagination"
                >
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
                                className={`button pagination-link ${
                                    state.currentPage === index + 1
                                        ? "is-current"
                                        : ""
                                }`}
                                aria-label="Page 1"
                                onClick={() => goToPage(index + 1)}
                                aria-current="page"
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
