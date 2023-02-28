import { Pool } from "pg";

const config = {
    // connectionString: process.env.DATABASE_URL,
    host: process.env.DEV_DATABASE_HOST,
    port: process.env.DEV_DATABASE_PORT,
    user: process.env.DEV_DATABASE_USER,
    password: process.env.DEV_DATABASE_PSW,
    database: process.env.DEV_DATABASE_NAME,
};

let db;
if (!db) {
    db = new Pool(config);
}

module.exports.db;

/* NEW */
module.exports.newItem = (
    name,
    pics,
    price,
    count_in_stock,
    slug,
    description,
    info,
    condition
) => {
    const myQuery = `INSERT INTO item 
    (name, pics, price, count_in_stock, condition, description, info, slug) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING *`;
    const keys = [
        name,
        pics,
        price,
        count_in_stock,
        slug,
        description,
        info,
        condition,
    ];
    return db.query(myQuery, keys);
};
module.exports.newUser = (first_name, last_name, email, psw) => {
    const myQuery = `INSERT INTO users 
    (first_name, last_name, email, psw) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *`;
    const keys = [first_name, last_name, email, psw];
    return db.query(myQuery, keys);
};
module.exports.newOrder = ({
    user_id,
    shipping_address,
    payment_method,
    payment_result,
    items_price,
    shipping_price,
    tax_price,
    total_price,
    is_paid,
    is_delivered,
    paid_at,
    delivered_at,
}) => {
    const myQuery = `INSERT INTO orders
    (user_id, shipping_address, payment_method, payment_result, items_price, shipping_price, tax_price, total_price, is_paid, is_delivered, paid_at, delivered_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *`;
    const keys = [
        user_id,
        shipping_address,
        payment_method,
        payment_result,
        items_price,
        shipping_price,
        tax_price,
        total_price,
        is_paid,
        is_delivered,
        paid_at,
        delivered_at,
    ];
    return db.query(myQuery, keys);
};
module.exports.newTag = (name) => {
    const myQuery = `INSERT INTO tag 
    (name) 
    VALUES ($1) 
    RETURNING *`;
    const keys = [name];
    return db.query(myQuery, keys);
};
module.exports.newCategory = (name) => {
    const myQuery = `INSERT INTO category 
    (name) 
    VALUES ($1) 
    RETURNING *`;
    const keys = [name];
    return db.query(myQuery, keys);
};
module.exports.newBrand = (name) => {
    const myQuery = `INSERT INTO brand 
    (name) 
    VALUES ($1) 
    RETURNING *`;
    const keys = [name];
    return db.query(myQuery, keys);
};
module.exports.newRelations = (id, arr, table, idColumn, arrColumn) => {
    const myQuery = `INSERT INTO ${table} (${idColumn}, ${arrColumn}) VALUES ($1, UNNEST(cast($2 as integer[]))) RETURNING *`;
    const keys = [id, arr];
    return db.query(myQuery, keys);
};

/* EDIT */
module.exports.upgradeUser = (id) => {
    const myQuery = `UPDATE users 
    SET is_admin = true
    WHERE id = $1
    RETURNING *`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.editItem = (
    id,
    name,
    pics,
    price,
    count_in_stock,
    slug,
    description,
    info,
    condition
) => {
    const myQuery = `UPDATE item 
    SET name = COALESCE($2, name), pics = $3, price = $4, count_in_stock = $5, slug = $6, description = $7, info = $8, condition = $9
    WHERE id = $1
    RETURNING *`;
    const keys = [
        id,
        name,
        pics,
        price,
        count_in_stock,
        slug,
        description,
        info,
        condition,
    ];
    return db.query(myQuery, keys);
};

/* GET */
module.exports.getElementByID = (table, id) => {
    const myQuery = `SELECT * FROM ${table} WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getUserByEmail = (email) => {
    const myQuery = `SELECT * FROM users WHERE email = $1`;
    const key = [email];
    return db.query(myQuery, key);
};
module.exports.getHomeItems = () => {
    const myQuery = `SELECT * FROM item ORDER BY id DESC LIMIT 20`;
    return db.query(myQuery);
};
module.exports.getItem = (id) => {
    const myQuery = `SELECT 
        item.*,
        categories_JSON.categories,
        tags_JSON.tags,
        brands_JSON.brands
    FROM
        item

        LEFT JOIN
            (SELECT
                item_category.item_id,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', category.id,
                        'name', category.name 
                    )
                ) AS categories
            FROM
                item_category
                JOIN category ON category.id = item_category.category_id
            GROUP BY
                item_category.item_id
            ) AS categories_JSON
            ON item.id = categories_JSON.item_id

        LEFT JOIN
            (SELECT
                item_tag.item_id,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', tag.id,
                        'name', tag.name 
                    )
                ) AS tags
            FROM
                item_tag
                JOIN tag ON tag.id = item_tag.tag_id
            GROUP BY
                item_tag.item_id
            ) AS tags_JSON
            ON item.id = tags_JSON.item_id
        

        LEFT JOIN
            (SELECT
                item_brand.item_id,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', brand.id,
                        'name', brand.name 
                    )
                ) AS brands
            FROM
                item_brand
                JOIN brand ON brand.id = item_brand.brand_id
            GROUP BY
                item_brand.item_id
            ) AS brands_JSON
            ON item.id = brands_JSON.item_id
        
        WHERE item.id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};

/* GET ALL */
module.exports.getAllItems = () => {
    const myQuery = `SELECT 
        item.*,
        categories_JSON.categories,
        tags_JSON.tags,
        brands_JSON.brands
    FROM
        item

        LEFT JOIN
            (SELECT
                item_category.item_id,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', category.id,
                        'name', category.name 
                    )
                ) AS categories
            FROM
                item_category
                JOIN category ON category.id = item_category.category_id
            GROUP BY
                item_category.item_id
            ) AS categories_JSON
            ON item.id = categories_JSON.item_id

        LEFT JOIN
            (SELECT
                item_tag.item_id,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', tag.id,
                        'name', tag.name 
                    )
                ) AS tags
            FROM
                item_tag
                JOIN tag ON tag.id = item_tag.tag_id
            GROUP BY
                item_tag.item_id
            ) AS tags_JSON
            ON item.id = tags_JSON.item_id
        

        LEFT JOIN
            (SELECT
                item_brand.item_id,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', brand.id,
                        'name', brand.name 
                    )
                ) AS brands
            FROM
                item_brand
                JOIN brand ON brand.id = item_brand.brand_id
            GROUP BY
                item_brand.item_id
            ) AS brands_JSON
            ON item.id = brands_JSON.item_id
        
        WHERE count_in_stock >= 1`;
    return db.query(myQuery);
};
module.exports.getAllItemsForAdmin = () => {
    const myQuery = `SELECT * FROM item ORDER BY id`;
    return db.query(myQuery);
};
module.exports.getAllUsers = () => {
    const myQuery = `SELECT * FROM users ORDER BY id`;
    return db.query(myQuery);
};
module.exports.getAllOrders = () => {
    const myQuery = `SELECT * FROM orders ORDER BY created_at DESC`;
    return db.query(myQuery);
};
module.exports.getAllCategories = () => {
    const myQuery = `SELECT * FROM category ORDER BY name`;
    return db.query(myQuery);
};
module.exports.getAllTags = () => {
    const myQuery = `SELECT * FROM tag ORDER BY name`;
    return db.query(myQuery);
};
module.exports.getAllBrands = () => {
    const myQuery = `SELECT * FROM brand ORDER BY name`;
    return db.query(myQuery);
};

/* DELETE */
module.exports.deleteRelations = (id, arr, table, idColumn, arrColumn) => {
    const myQuery = `DELETE FROM ${table}
    WHERE ${idColumn} = $1
    AND (${arrColumn} = ANY($2) OR ${arrColumn} IS NULL)
    RETURNING *`;
    const keys = [id, arr];
    return db.query(myQuery, keys);
};
