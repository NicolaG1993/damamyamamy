CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR NOT NULL CHECK (first_name != ''),
    last_name VARCHAR NOT NULL CHECK (last_name != ''),
    email VARCHAR(255) NOT NULL UNIQUE,
    psw VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR NOT NULL CHECK (first_name != ''),
    last_name VARCHAR NOT NULL CHECK (last_name != ''),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(15) CHECK (phone ~ '^\+?[0-9]{7,15}$'),
    personal_code VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sold_at TIMESTAMP DEFAULT NULL,
    name VARCHAR NOT NULL CHECK (name != ''),
    price DECIMAL(12, 2),
    count_in_stock INTEGER,
    slug VARCHAR(255),
    description VARCHAR(255),
    condition VARCHAR(255)
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR NOT NULL CHECK (name != '')
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR NOT NULL CHECK (name != '')
);

CREATE TABLE item_pictures (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    picture_url TEXT NOT NULL CHECK (picture_url != '')
);

CREATE TABLE item_brand (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    brand_id INTEGER REFERENCES brands(id) ON DELETE CASCADE
);

CREATE TABLE item_category (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE item_client (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE UNIQUE, -- Each item can have only one owner
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE
);
