-- sudo service postgresql start
-- psql -d damamyamamy -f utils/db/setup.sql

-- DROP TABLE IF EXISTS item;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS brand;
-- DROP TABLE IF EXISTS category;
-- DROP TABLE IF EXISTS tag;
-- DROP TABLE IF EXISTS item_order;
-- DROP TABLE IF EXISTS item_brand;
-- DROP TABLE IF EXISTS item_tag;
-- DROP TABLE IF EXISTS item_category;

CREATE TABLE item(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR NOT NULL CHECK (name != ''),
    pics TEXT[],
    price DECIMAL(12,2),
    count_in_stock INTEGER,
    slug VARCHAR(255),
    description VARCHAR(255),
    info VARCHAR(255),
    condition VARCHAR(255)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR NOT NULL CHECK (first_name != ''),
    last_name VARCHAR NOT NULL CHECK (last_name != ''),
    phone VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    psw VARCHAR(255) NOT NULL,
    pic VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE,
    newsletter BOOLEAN DEFAULT FALSE,
    shipping_address JSONB,
    terms_accepted BOOLEAN DEFAULT FALSE,
    personal_code VARCHAR(255)
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,  
    order_uuid VARCHAR NOT NULL UNIQUE,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    shipping_address JSONB NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    payment_result JSONB,
    order_items JSONB NOT NULL,
    items_price DECIMAL(12,2) NOT NULL,
    shipping_price DECIMAL(12,2) NOT NULL,
    tax_price DECIMAL(12,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    is_paid BOOLEAN DEFAULT FALSE,
    is_delivered BOOLEAN DEFAULT FALSE,
    paid_at TIMESTAMP,
    delivered_at TIMESTAMP
);

CREATE TABLE brand(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR NOT NULL CHECK (name != '')
);

CREATE TABLE tag(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR NOT NULL CHECK (name != '')
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR NOT NULL CHECK (name != '')
);

CREATE TABLE item_order(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    item_id INTEGER,
    order_id INTEGER
);
CREATE TABLE item_brand(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    item_id INTEGER,
    brand_id INTEGER
);
CREATE TABLE item_tag(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    item_id INTEGER,
    tag_id INTEGER
);
CREATE TABLE item_category(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    item_id INTEGER,
    category_id INTEGER
);

CREATE TABLE code(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- UPDATE users SET is_admin = true WHERE id = 1;