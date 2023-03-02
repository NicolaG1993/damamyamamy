import { getAllItems } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        let filters = req.body;
        let parsedFilters = { value: "", column: "id", order: "ASC" };

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
            }

            if (research) {
                parsedFilters.value = research;
            }

            if (page) {
                parsedFilters.start = page * countPerPage;
                parsedFilters.end = parsedFilters.start - countPerPage;
            } else if (!page) {
                parsedFilters.start = 1;
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
            parsedFilters.end
        );
        res.send(rows);
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}
