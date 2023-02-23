import { Pool } from "pg";

const config = {
    // connectionString: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PSW,
    database: process.env.DATABASE_NAME,
};

let db;
if (!db) {
    db = new Pool(config);
}

module.exports.db;
