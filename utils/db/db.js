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
    (name, pics, price, count_in_stock, slug, description, info, condition) 
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

/* EDIT */
module.exports.upgradeUser = (id) => {
    const myQuery = `UPDATE users 
    SET is_admin = true
    WHERE id = $1
    RETURNING *`;
    const key = [id];
    return db.query(myQuery, key);
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

/* GET ALL */
module.exports.getAllItems = () => {
    const myQuery = `SELECT * FROM item WHERE count_in_stock >= 1`;
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