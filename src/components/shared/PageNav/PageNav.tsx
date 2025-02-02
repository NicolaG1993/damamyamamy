import styles from "./PageNav.module.css";

interface PageNavProps {
    totalPages: number;
    page: number;
    handleFilters: (name: string, value: any) => void;
}

export default function PageNav({
    totalPages,
    page,
    handleFilters,
}: PageNavProps) {
    const goToPage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            handleFilters("page", newPage);
        }
    };

    return (
        <div id={styles.PagesBarWrap}>
            {[...Array(totalPages)].map((el, i) => (
                <div
                    className={
                        Number(i + 1) === page ? styles.active : styles.normal
                    }
                    key={"page selector " + i}
                    onClick={() => goToPage(Number(i + 1))}
                >
                    {i + 1}
                </div>
            ))}
        </div>
    );
}
