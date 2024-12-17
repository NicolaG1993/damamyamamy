import styles from "./PageNav.module.css";

export default function PageNav({ totalPages, page, handleFilters }) {
    return (
        <div id={styles.PagesBarWrap}>
            {[...Array(totalPages)].map((el, i) => (
                <div
                    className={
                        Number(i + 1) === page ? styles.active : styles.normal
                    }
                    key={"page selector " + i}
                    onClick={() => handleFilters("page", Number(i + 1))}
                >
                    {i + 1}
                </div>
            ))}
        </div>
    );
}
