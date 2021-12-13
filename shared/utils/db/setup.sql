DROP TABLE IF EXISTS products;
-- DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orders;

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != ''),
    slug VARCHAR NOT NULL CHECK (slug != ''),
    categories TEXT [],
    tags TEXT [],
    images TEXT [],
    price INT,
    brand VARCHAR NOT NULL CHECK (brand != ''),
    count_in_stock INT,
    description VARCHAR(255),
    infos VARCHAR(255),
    condition VARCHAR NOT NULL CHECK (condition != ''),
    related_products INT [],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, slug, categories, tags, images, price, brand, count_in_stock, description, infos, condition, related_products)
VALUES ('Maglietta', 'maglietta', ARRAY ['Maglie', 'Abbigliamento', 'Bambina'], ARRAY ['Abbigliamento', 'Nike', 'Scarpe', 'Bambina'], ARRAY [ '/images/shirt1.jpg', '/images/shoes1.jpg' ], 70, 'Nike', 1, 'A popular shirt', 'Infos vanno qua', 'new', ARRAY [2]);

INSERT INTO products (name, slug, categories, tags, images, price, brand, count_in_stock, description, condition, related_products)
VALUES ('Scarpe', 'scarpe', ARRAY ['Scarpe', 'Abbigliamento', 'Bambino'], ARRAY ['Abbigliamento', 'Nike', 'Scarpe', 'Bambino'], ARRAY [ '/images/shoes1.jpg' ], 40, 'Nike', 1, 'Some casual shoes', 'used', ARRAY [1, 3]);

INSERT INTO products (name, slug, categories, tags, images, price, brand, count_in_stock, description, infos, condition)
VALUES ('Game Boy', 'game-boy', ARRAY ['Giocattoli', 'Videogiochi', 'Elettronica'], ARRAY ['Giocattoli', 'Videogiochi', 'Game-Boy'], ARRAY [ '/images/gameboy.jpg' ], 130, 'Nintendo', 2, 'Gameboy color come nuovo', 'Infos vanno qua', 'new');

INSERT INTO products (name, slug, categories, tags, images, price, brand, count_in_stock, description, infos, condition, related_products)
VALUES ('Lego', 'lego', ARRAY ['Giocattoli'], ARRAY ['Giocattoli', 'Lego', 'Costruzioni', '+3 anni'], ARRAY [ '/images/lego.jpg' ], 13, 'Lego', 0, 'Costruzioni Lego', 'Infos vanno qua', 'new', ARRAY [ 3 ]);


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != ''),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    profile_pic_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    order_items JSONB NOT NULL,
    shipping_address JSON NOT NULL,
    payment_method VARCHAR NOT NULL,
    payment_result JSON,
    items_price DECIMAL(12,2) NOT NULL,
    shipping_price DECIMAL(12,2) NOT NULL,
    tax_price DECIMAL(12,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    is_paid BOOLEAN DEFAULT false,
    is_delivered BOOLEAN DEFAULT false,
    paid_at TIMESTAMP,
    delivered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- sudo service postgresql start
-- createdb damamyamamy
-- psql -d damamyamamy -f shared/utils/db/setup.sql