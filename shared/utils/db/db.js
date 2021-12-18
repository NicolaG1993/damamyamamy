const { Client } = require("pg");
const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/damamyamamy"; // "postgresql://user:secretpassword@database.server.com:3211/mydb";
//usiamo il db local in dev, ma per deploy ne dobbiamo usare uno hostato (su heroku probabilmente)

const db = new Client({
    connectionString,
});
db.connect(); // db.end(); o db.disconnect(); // idk quando e se devo usarli

//** PRODUCTS **//
module.exports.getAllProducts = () => {
    const myQuery = `SELECT * FROM products WHERE count_in_stock >= 1`;
    return db.query(myQuery);
};

module.exports.getProduct = (str) => {
    const myQuery = `SELECT * FROM products WHERE slug = $1`;
    const key = [str];
    return db.query(myQuery, key);
};

module.exports.getAllCategories = () => {
    const myQuery = `SELECT ARRAY (
        SELECT DISTINCT UNNEST(categories) 
        FROM products      
        )`;
    return db.query(myQuery);
};

module.exports.getCatNewItems = () => {
    const myQuery = `SELECT * FROM products
    WHERE count_in_stock >= 1
    ORDER BY created_at ASC
    LIMIT 20`;
    return db.query(myQuery);
};

module.exports.getCategory = (category) => {
    const myQuery = `SELECT * FROM products
    WHERE $1 = ANY (categories)
    AND count_in_stock >= 1
    ORDER BY created_at ASC
    LIMIT 20`;
    const key = [category];
    return db.query(myQuery, key);
};

module.exports.getRelatedProducts = (arr) => {
    const myQuery = `SELECT * FROM products WHERE id = ANY($1) AND count_in_stock >= 1`;
    const key = [arr];
    return db.query(myQuery, key);
};

//** USERS **//
module.exports.getUser = (id) => {
    const myQuery = `SELECT * FROM users WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.createUser = (name, email, password, isAdmin) => {
    const myQuery = `INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *`;
    const keys = [name, email, password, isAdmin];
    return db.query(myQuery, keys);
};
module.exports.updateUser = (id, name, email, password) => {
    const myQuery = `UPDATE users 
    SET name = COALESCE($2, name), email = COALESCE($3, email), password = COALESCE($4, password)
    WHERE id = $1
    RETURNING *`;
    const keys = [id, name, email, password];
    return db.query(myQuery, keys);
};

//** ORDERS **//
module.exports.newOrder = ({
    user_id,
    order_items,
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
    const myQuery = `INSERT INTO orders (user_id, order_items, shipping_address, payment_method, payment_result, items_price, shipping_price, tax_price, total_price, is_paid, is_delivered, paid_at, delivered_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`;
    const keys = [
        user_id,
        order_items,
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

module.exports.getOrder = (orderId) => {
    const myQuery = `SELECT orders.*, users.name, users.email, users.is_admin, users.profile_pic_url
    FROM orders
    JOIN users 
    ON (order_id = $1 AND user_id = users.id)
    ORDER BY created_at ASC`;
    const key = [orderId];
    return db.query(myQuery, key);
}; // to check
// da user mi serve solo nome e email

module.exports.getOrderHistory = (userId) => {
    const myQuery = `SELECT *
    FROM orders
    WHERE user_id = $1
    ORDER BY created_at ASC`;
    const key = [userId];
    return db.query(myQuery, key);
};

module.exports.updateOrder = (id, bool, paymentResult) => {
    const myQuery = `UPDATE orders SET is_paid = $2, paid_at = CURRENT_TIMESTAMP, payment_result = $3 WHERE order_id = $1 RETURNING *`;
    const keys = [id, bool, paymentResult];
    return db.query(myQuery, keys);
};

//** ADMIN DASHBOARD **//
module.exports.totalOrders = () => {
    const myQuery = `SELECT 
    COUNT(*)
    FROM orders`;
    return db.query(myQuery);
};
module.exports.totalProducts = () => {
    const myQuery = `SELECT 
    COUNT(*)
    FROM products`;
    return db.query(myQuery);
};
module.exports.totalUsers = () => {
    const myQuery = `SELECT 
    COUNT(*)
    FROM users`;
    return db.query(myQuery);
};
module.exports.allPaidOrdersPreview = () => {
    const myQuery = `SELECT total_price, created_at
    FROM orders
    WHERE is_paid = true
    ORDER BY created_at ASC`;
    return db.query(myQuery);
}; /* seleziona solo total_price e created_at x admin dashboard */
module.exports.allOrders = () => {
    const myQuery = `SELECT *
    FROM orders
    ORDER BY created_at ASC`;
    return db.query(myQuery);
}; /* si dovra mettere un limite (range) per i risultati, oltre ad alcuni filtri semplici */
module.exports.allUsers = () => {
    const myQuery = `SELECT *
    FROM users
    ORDER BY id ASC`;
    return db.query(myQuery);
}; /* si dovra mettere un limite (range) per i risultati, oltre ad alcuni filtri semplici */
module.exports.allProducts = () => {
    const myQuery = `SELECT *
    FROM products
    ORDER BY id ASC`;
    return db.query(myQuery);
}; /* si dovra mettere un limite (range) per i risultati, oltre ad alcuni filtri semplici */
module.exports.allProductsAvailables = () => {
    const myQuery = `SELECT *
    FROM products
    WHERE count_in_stock >= 1
    ORDER BY id ASC`;
    return db.query(myQuery);
}; /* si dovra mettere un limite (range) per i risultati, oltre ad alcuni filtri semplici */
