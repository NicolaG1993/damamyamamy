import { ItemFormDataPartial, RawItem, RawItemTableProps } from "@/types/item";
import { PoolClient, QueryResult } from "pg";

export const newItem = async (
    client: PoolClient,
    name: string,
    price: number,
    stock: number,
    slug: string,
    description: string,
    condition: string
): Promise<QueryResult<{ id: number; slug: string }>> => {
    const myQuery = `
            INSERT INTO items 
            (name, price, count_in_stock, slug, description, condition) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id, slug;
        `;
    const keys = [name, price, stock, slug, description, condition];
    return client.query(myQuery, keys);
};

export const getItemBySlug = async (
    client: PoolClient,
    slug: string
): Promise<QueryResult<RawItem>> => {
    const myQuery = `
            SELECT 
                i.id AS item_id,
                i.name AS item_name,
                i.price,
                i.count_in_stock,
                i.slug,
                i.description,
                i.condition,
                b.id AS brand_id,
                b.name AS brand_name,
                ARRAY_AGG(DISTINCT ip.picture_url) AS pictures,
                ARRAY_AGG(DISTINCT cat.name) AS categories
            FROM 
                items i
            LEFT JOIN 
                item_pictures ip ON i.id = ip.item_id
            LEFT JOIN 
                item_brand ib ON i.id = ib.item_id
            LEFT JOIN 
                brands b ON ib.brand_id = b.id
            LEFT JOIN 
                item_category ic ON i.id = ic.item_id
            LEFT JOIN 
                categories cat ON ic.category_id = cat.id
            WHERE 
                i.slug = $1
            GROUP BY 
                i.id, b.id
        `;
    const keys = [slug];
    return client.query(myQuery, keys);
};

export const getItemById = async (
    client: PoolClient,
    itemId: number
): Promise<QueryResult<RawItem>> => {
    const myQuery = `
            SELECT 
                i.id AS item_id,
                i.name AS item_name,
                i.price,
                i.count_in_stock,
                i.slug,
                i.description,
                i.condition,
                c.id AS client_id,
                c.first_name || ' ' || c.last_name AS client_name,
                b.id AS brand_id,
                b.name AS brand_name,
                ARRAY_AGG(DISTINCT ip.picture_url) AS pictures,
                ARRAY_AGG(DISTINCT cat.name) AS categories
            FROM 
                items i
            LEFT JOIN 
                item_client icl ON i.id = icl.item_id
            LEFT JOIN 
                clients c ON icl.client_id = c.id
            LEFT JOIN 
                item_pictures ip ON i.id = ip.item_id
            LEFT JOIN 
                item_brand ib ON i.id = ib.item_id
            LEFT JOIN 
                brands b ON ib.brand_id = b.id
            LEFT JOIN 
                item_category ic ON i.id = ic.item_id
            LEFT JOIN 
                categories cat ON ic.category_id = cat.id
            WHERE 
                i.id = $1
            GROUP BY 
                i.id, c.id, b.id
        `;
    const keys = [itemId];
    return client.query(myQuery, keys);
};

export const getItems = async (
    client: PoolClient
): Promise<QueryResult<RawItemTableProps>> => {
    const myQuery = `
    SELECT 
        i.id AS item_id,
        i.name AS item_name,
        i.price,
        i.count_in_stock,
        i.slug,
        i.description,
        i.condition,
        i.created_at,
        c.id AS client_id,
        c.first_name || ', ' || c.last_name AS client_name,
        (
            SELECT ip.picture_url
            FROM item_pictures ip
            WHERE ip.item_id = i.id
            ORDER BY ip.id ASC
            LIMIT 1
        ) AS first_picture_url,
        b.id AS brand_id,
        b.name AS brand_name,
        COUNT(ic.category_id) AS total_categories
    FROM 
        items i
    LEFT JOIN 
        item_client icl ON i.id = icl.item_id
    LEFT JOIN 
        clients c ON icl.client_id = c.id
    LEFT JOIN 
        item_brand ib ON i.id = ib.item_id
    LEFT JOIN 
        brands b ON ib.brand_id = b.id
    LEFT JOIN 
        item_category ic ON i.id = ic.item_id
    GROUP BY 
        i.id, c.id, b.id
    ORDER BY 
        i.created_at DESC
    `;
    return client.query(myQuery);
};

export const updateItemById = async (
    client: PoolClient,
    itemId: number,
    data: ItemFormDataPartial
): Promise<QueryResult> => {
    const myQuery = `
        UPDATE items
        SET 
            name = $1,
            price = $2,
            count_in_stock = $3,
            slug = $4,
            description = $5,
            condition = $6
        WHERE id = $7;
    `;
    const keys = [
        data.name,
        data.price,
        data.stock,
        data.slug,
        data.description,
        data.condition,
        itemId,
    ];
    return client.query(myQuery, keys);
};

export const linkItemToBrand = async (
    client: PoolClient,
    itemId: number,
    brandId: number
): Promise<QueryResult> => {
    const myQuery = `
            INSERT INTO item_brand (item_id, brand_id) 
            VALUES ($1, $2)
        `;
    const keys = [itemId, brandId];
    return client.query(myQuery, keys);
};

export const unlinkItemFromBrand = async (
    client: PoolClient,
    itemId: number
): Promise<void> => {
    const myQuery = `DELETE FROM item_brand WHERE item_id = $1`;
    const keys = [itemId];
    await client.query(myQuery, keys);
};

export const linkItemToClient = async (
    client: PoolClient,
    itemId: number,
    clientId: number
): Promise<QueryResult> => {
    const myQuery = `
            INSERT INTO item_client (item_id, client_id) 
            VALUES ($1, $2)
        `;
    const keys = [itemId, clientId];
    return client.query(myQuery, keys);
};

export const unlinkItemFromClient = async (
    client: PoolClient,
    itemId: number
): Promise<void> => {
    const myQuery = `DELETE FROM item_client WHERE item_id = $1`;
    const keys = [itemId];
    await client.query(myQuery, keys);
};

export const linkItemToCategories = async (
    client: PoolClient,
    itemId: number,
    categoryIds: number[]
): Promise<QueryResult> => {
    const myQuery = `
            INSERT INTO item_category (item_id, category_id) 
            VALUES ($1, unnest($2::int[]))
        `;
    const keys = [itemId, categoryIds];
    return client.query(myQuery, keys);
};

export const unlinkItemFromCategories = async (
    client: PoolClient,
    itemId: number
): Promise<void> => {
    const myQuery = `DELETE FROM item_category WHERE item_id = $1`;
    const keys = [itemId];
    await client.query(myQuery, keys);
};

export const linkItemToPictures = async (
    client: PoolClient,
    itemId: number,
    pictureUrls: string[]
): Promise<QueryResult> => {
    const myQuery = `
            INSERT INTO item_pictures (item_id, picture_url) 
            VALUES ($1, unnest($2::text[]))
        `;
    const keys = [itemId, pictureUrls];
    return client.query(myQuery, keys);
};

export const unlinkItemPicture = async (
    client: PoolClient,
    itemId: number,
    pictureUrl: string
): Promise<void> => {
    const myQuery = `
        DELETE FROM item_pictures
        WHERE item_id = $1 AND picture_url = $2
    `;
    const keys = [itemId, pictureUrl];
    await client.query(myQuery, keys);
};

export const getItemPictures = async (
    client: PoolClient,
    itemId: number
): Promise<QueryResult<{ picture_url: string }>> => {
    const myQuery = `SELECT picture_url FROM item_pictures WHERE item_id = $1`;
    const keys = [itemId];
    return client.query(myQuery, keys);
};

export const getItemSlug = async (
    client: PoolClient,
    slug: string
): Promise<QueryResult<{ exists: boolean }>> => {
    const myQuery = `SELECT EXISTS (SELECT 1 FROM items WHERE slug = $1) AS exists`;
    const keys = [slug];
    return client.query(myQuery, keys);
};
