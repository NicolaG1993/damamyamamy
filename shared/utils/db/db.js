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
module.exports.getUser = (email) => {
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
