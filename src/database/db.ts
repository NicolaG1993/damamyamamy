import { Pool, PoolClient } from "pg";

const config = {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PSW,
    database: process.env.DATABASE_NAME,
    pool_mode: "transaction", // Transaction pooler: IPv4 compatible
};

const db = new Pool(config);

const connect = async (): Promise<PoolClient> => {
    return await db.connect();
};

const begin = async (client: PoolClient): Promise<void> => {
    const myQuery = `BEGIN`;
    await client.query(myQuery);
};
const commit = async (client: PoolClient): Promise<void> => {
    const myQuery = `COMMIT`;
    await client.query(myQuery);
};
const rollback = async (client: PoolClient): Promise<void> => {
    const myQuery = `ROLLBACK`;
    await client.query(myQuery);
};
const release = (client: PoolClient): void => {
    client.release();
}; // "client" é una instance di "db.connect()", passato come argomento dopo essere stato "connected"

export { db, connect, begin, commit, rollback, release };
