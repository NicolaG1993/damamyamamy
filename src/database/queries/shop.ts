import { RawShopItem, RawShopItemPreview, ShopPageFilters } from "@/types/shop";
import { PoolClient, QueryResult } from "pg";

export const getShopItems = async (
    client: PoolClient,
    filters: ShopPageFilters
): Promise<QueryResult<RawShopItemPreview[]>> => {
    const {
        page,
        countPerPage,
        brand,
        maxPrice,
        minPrice,
        category,
        search,
        order,
    } = filters;
    console.log("👉 filters: ", filters);

    const offset = (page - 1) * countPerPage;

    const keys: any[] = [];
    let condition = "WHERE i.sold_at IS NULL"; // Only show unsold items

    if (brand) {
        keys.push(brand);
        condition += ` AND b.name = $${keys.length}`;
    }

    if (minPrice) {
        keys.push(minPrice);
        condition += ` AND i.price >= $${keys.length}`;
    }

    if (maxPrice) {
        keys.push(maxPrice);
        condition += ` AND i.price <= $${keys.length}`;
    }

    if (category) {
        keys.push(category);
        condition += ` AND c.name = $${keys.length}`;
    }

    if (search) {
        keys.push(`%${search}%`);
        condition += ` AND (i.name ILIKE $${keys.length} OR i.description ILIKE $${keys.length})`;
    }

    keys.push(countPerPage, offset);

    const myQuery = `
    SELECT 
        i.name AS item_name,
        i.price,
        i.slug,
        (
            SELECT ip.picture_url
            FROM item_pictures ip
            WHERE ip.item_id = i.id
            ORDER BY ip.id ASC
            LIMIT 1
        ) AS first_picture_url,
        jsonb_build_object('name', b.name) AS brand
    FROM 
        items i
    LEFT JOIN 
        item_brand ib ON i.id = ib.item_id
    LEFT JOIN 
        brands b ON ib.brand_id = b.id
    LEFT JOIN 
        item_category ic ON i.id = ic.item_id
    LEFT JOIN 
        categories c ON ic.category_id = c.id
    ${condition}
    GROUP BY 
        i.id, b.id
    ORDER BY 
        i.price ${order}
    LIMIT $${keys.length - 1} OFFSET $${keys.length};
    `;

    return client.query(myQuery, keys);
};

export const getTotalShopItemsCount = async (
    client: PoolClient,
    filters: ShopPageFilters
): Promise<QueryResult<{ count: number }>> => {
    const { brand, maxPrice, minPrice, category, search } = filters;
    const keys: any[] = [];
    let condition = "WHERE i.sold_at IS NULL";

    if (brand) {
        keys.push(brand);
        condition += ` AND b.name = $${keys.length}`;
    }

    if (minPrice !== undefined) {
        keys.push(minPrice);
        condition += ` AND i.price >= $${keys.length}`;
    }

    if (maxPrice !== undefined) {
        keys.push(maxPrice);
        condition += ` AND i.price <= $${keys.length}`;
    }

    if (category) {
        keys.push(category);
        condition += ` AND c.name = $${keys.length}`;
    }

    if (search) {
        keys.push(`%${search}%`);
        condition += ` AND (i.name ILIKE $${keys.length} OR i.description ILIKE $${keys.length})`;
    }

    const myQuery = `
    SELECT COUNT(*) AS count
    FROM items i
    LEFT JOIN item_brand ib ON i.id = ib.item_id
    LEFT JOIN brands b ON ib.brand_id = b.id
    LEFT JOIN item_category ic ON i.id = ic.item_id
    LEFT JOIN categories c ON ic.category_id = c.id
    ${condition};
    `;

    return client.query(myQuery, keys);
};

export const getShopBrands = async (
    client: PoolClient
): Promise<QueryResult<RawShopItem>> => {
    const myQuery = `SELECT DISTINCT name FROM brands ORDER BY name ASC;`;
    return client.query(myQuery);
};

export const getShopCategories = async (
    client: PoolClient
): Promise<QueryResult<RawShopItem>> => {
    const myQuery = `SELECT DISTINCT name FROM categories ORDER BY name ASC;`;
    return client.query(myQuery);
};

export const getShopItem = async (
    client: PoolClient,
    slug: string
): Promise<QueryResult<RawShopItem>> => {
    const myQuery = ``;
    const keys = [slug];
    return client.query(myQuery, keys);
};
