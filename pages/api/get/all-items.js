import { getAllItems } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        let filters = req.body;
        let parsedFilters = { value: "", column: "id", order: "ASC", max: 15 };

        if (filters) {
            let { order, research, page, countPerPage } = filters;

            if (order) {
                if (order === "id_desc") {
                    parsedFilters.order = "DESC";
                }
                if (order === "price_desc") {
                    parsedFilters.column = "price";
                    parsedFilters.order = "DESC";
                }
                if (order === "price_asc") {
                    parsedFilters.column = "price";
                }
                if (order === "name_asc") {
                    parsedFilters.column = "name";
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
        );

        // console.log("💚 rows: ", rows);
        // extract here from rows all categories for UI

        res.send({ items: rows[0].items, full_count: rows[0].full_count });
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}
