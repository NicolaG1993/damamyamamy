import { getAllItems, getAllCategories } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        let filters = req.body;
        let parsedFilters = { value: "", column: "id", order: "DESC", max: 15 };

        if (filters) {
            let { order, research, page, countPerPage, category } = filters;

            if (order) {
                if (order === "id_asc") {
                    parsedFilters.order = "ASC";
                }
                if (order === "id_desc") {
                    parsedFilters.order = "DESC";
                }
                if (order === "price_desc") {
                    parsedFilters.column = "price";
                    parsedFilters.order = "DESC";
                }
                if (order === "price_asc") {
                    parsedFilters.column = "price";
                    parsedFilters.order = "ASC";
                }
                if (order === "name_asc") {
                    parsedFilters.column = "name";
                    parsedFilters.order = "ASC";
                }
            }

            if (research) {
                parsedFilters.value = research;
            }

            if (countPerPage) {
                parsedFilters.max = countPerPage;
            }

            if (page) {
                parsedFilters.start = (page - 1) * countPerPage;
                parsedFilters.end = parsedFilters.start + countPerPage;
            } else if (!page) {
                parsedFilters.start = 0;
                parsedFilters.end = countPerPage;
            }

            if (category) {
                parsedFilters.category = category;
            }
        }

        console.log("💚 filters: ", filters);
        console.log("💚 parsedFilters: ", parsedFilters);
        let { rows } = await getAllItems(
            parsedFilters.value,
            parsedFilters.column,
            parsedFilters.order,
            parsedFilters.start,
            parsedFilters.end,
            parsedFilters.max
            // parsedFilters.category
        );
        let all_categories = await getAllCategories();

        // console.log("💚 rows: ", rows[0].items);
        // extract here from rows all categories for UI
        // cosi in UI abbiamo direttamente solo categorie dei risultati di DB

        // se abbiamo passato un filtro category, torniamo solo quella category
        // altrimenti mappiamo tutti gli item della DB res
        // per ogni item filtriamo solo quelli che non sono gia presenti in all_categories (evitiamo doppi)
        // e li aggiungiamo a all_categories (passiamo tutto oggetto category)
        let all_items = [];
        if (rows[0] && rows[0].items) {
            if (filters.category) {
                // all_categories.push(filters.category);
                all_items = rows[0].items.filter((item) =>
                    item.categories
                        ? item.categories
                              .map((c) => c.id)
                              .includes(Number(filters.category))
                        : false
                );
            } else {
                all_items = rows[0].items;
            }
        }

        res.send({
            items: all_items.slice(parsedFilters.start, parsedFilters.end),
            full_count: all_items.length,
            // full_count: rows[0].full_count,
            all_categories: all_categories.rows,
            // all_categories: all_categories.sort((a, b) =>
            //     a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            // ),
        });
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}
