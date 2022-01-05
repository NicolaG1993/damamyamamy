const { Client } = require("pg");
const connectionString = process.env.DATABASE_URL;
// const connectionString =
//     process && process.env.NODE_ENV === "development"
//         ? "postgresql://postgres:postgres@localhost:5432/damamyamamy"
//         : process.env.DATABASE_URL;

// "postgresql://user:secretpassword@database.server.com:3211/mydb";
//usiamo il db local in dev, ma per deploy ne dobbiamo usare uno hostato (su heroku probabilmente)
//IMPORTANTE: aggiungere secret key su AWS x DATABASE_URL

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

module.exports.getAllTags = () => {
    const myQuery = `SELECT ARRAY (
        SELECT DISTINCT UNNEST(tags) 
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

module.exports.getLiveProducts = (arr) => {
    const myQuery = `SELECT * FROM products WHERE id = ANY($1)`;
    const key = [arr];
    return db.query(myQuery, key);
};

//** USERS **//
module.exports.getUser = (id) => {
    const myQuery = `SELECT * FROM users WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getUserByEmail = (email) => {
    const myQuery = `SELECT * FROM users WHERE email = $1`;
    const key = [email];
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
module.exports.getAllEmails = () => {
    const myQuery = `SELECT ARRAY (SELECT email FROM users)`;
    return db.query(myQuery);
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
module.exports.allProductsOutOfStock = () => {
    const myQuery = `SELECT *
    FROM products
    WHERE count_in_stock = 0
    ORDER BY id ASC`;
    return db.query(myQuery);
}; /* si dovra mettere un limite (range) per i risultati, oltre ad alcuni filtri semplici */
module.exports.newProduct = (
    name,
    slug,
    categories,
    tags,
    images,
    price,
    brand,
    count_in_stock,
    description,
    infos,
    condition,
    related_products
) => {
    const myQuery = `INSERT 
    INTO products (name, slug, categories, tags, images, price, brand, count_in_stock, description, infos, condition, related_products)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *`;
    const keys = [
        name,
        slug,
        categories,
        tags,
        images,
        price,
        brand,
        count_in_stock,
        description,
        infos,
        condition,
        related_products,
    ];
    return db.query(myQuery, keys);
};
module.exports.updateProduct = (
    id,
    name,
    slug,
    categories,
    tags,
    images,
    price,
    brand,
    count_in_stock,
    description,
    infos,
    condition,
    related_products
) => {
    const myQuery = `UPDATE products 
    SET name = $2, slug = $3, categories = $4, tags = $5, images = $6, price = $7, brand = $8, count_in_stock = $9, description = $10, infos = $11, condition = $12, related_products = $13
    WHERE id = $1
    RETURNING *`;
    const keys = [
        id,
        name,
        slug,
        categories,
        tags,
        images,
        price,
        brand,
        count_in_stock,
        description,
        infos,
        condition,
        related_products,
    ];
    return db.query(myQuery, keys);
}; /* DA FINIRE! */
module.exports.updateStock = (allIDs, allQuantities) => {
    const myQuery = `UPDATE products
    SET count_in_stock = count_in_stock - arr.quantity
    FROM (SELECT 
        UNNEST(CAST($1 as INT[])) AS id,
        UNNEST(CAST($2 as INT[])) AS quantity
        ) AS arr
    WHERE products.id = arr.id
    RETURNING *`;
    const keys = [allIDs, allQuantities];
    return db.query(myQuery, keys);
}; /* DA FINIRE! */
module.exports.deleteProduct = (id) => {
    const myQuery = `DELETE FROM products
    WHERE id = $1
    RETURNING *`;
    const key = [id];
    return db.query(myQuery, key);
};

/* module.exports.deleteProductImages = (id, newImages) => {
    const myQuery = `UPDATE products 
    SET images = $2
    WHERE id = $1
    RETURNING images`;
    const keys = [id, newImages];
    return db.query(myQuery, keys);
};  DA FINIRE! devo rimuovere tutte le immagini da array images dove prodotto=id */
