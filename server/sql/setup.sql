CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL CHECK (first != ''),
    last VARCHAR NOT NULL CHECK (last != ''),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_pic_url VARCHAR(255),
    bio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- createdb damamyamamy
-- psql -d damamyamamy -f server/sql/setup.sql

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR NOT NULL CHECK (title != ''),
    price VARCHAR NOT NULL CHECK (price != ''),
    pic_url VARCHAR(255) NOT NULL CHECK (pic_url != ''),
    conditions VARCHAR(255) NOT NULL CHECK (conditions != ''),
    info VARCHAR(255),
    description VARCHAR(255),
    category VARCHAR NOT NULL CHECK (category != ''),
    tags VARCHAR(255),
    quantity VARCHAR(255),
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);


-- vedere per numeri (price, quantity)
-- vedere per pic (se é piu di una)
-- guardare oggetto di commerce.js

-- fare table anche per cart?