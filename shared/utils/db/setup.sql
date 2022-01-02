DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orders;

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != ''),
    slug VARCHAR NOT NULL CHECK (slug != ''),
    categories TEXT [],
    tags TEXT [],
    images JSONB,
    price INT,
    brand VARCHAR,
    count_in_stock INT,
    description VARCHAR(255),
    infos VARCHAR(255),
    condition VARCHAR NOT NULL CHECK (condition != ''),
    related_products INT [],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, slug, categories, tags, images, price, count_in_stock, description, infos, condition)
VALUES ('Braccioli', 'braccioli', ARRAY ['Gonfiabili', 'Mare', 'Estate'], ARRAY ['Gonfiabili', 'Mare', 'Estate', 'Braccioli'], '[{ "location": "https://dmam-items.s3.eu-south-1.amazonaws.com/pro-swim-swimsafe-manguitos-de-natacion-flipper-a254611.jpg", "key": "pro-swim-swimsafe-manguitos-de-natacion-flipper-a254611.jpg"}]', 5, 1, 'Good in summer', 'Infos vanno qua', 'new');

INSERT INTO products (name, slug, categories, tags, images, price, brand, count_in_stock, description, infos, condition, related_products)
VALUES ('Maglietta', 'maglietta', ARRAY ['Maglie', 'Abbigliamento', 'Bambina'], ARRAY ['Abbigliamento', 'Nike', 'Scarpe', 'Bambina'], '[{ "location": "https://dmam-items.s3.eu-south-1.amazonaws.com/shirt1.jpeg", "key": "shirt1.jpeg"}]', 70, 'Nike', 1, 'A popular shirt', 'Infos vanno qua', 'new', ARRAY [3]);

INSERT INTO products (name, slug, categories, tags, images, price, brand, count_in_stock, description, condition, related_products)
VALUES ('Scarpe', 'scarpe', ARRAY ['Scarpe', 'Abbigliamento', 'Bambino'], ARRAY ['Abbigliamento', 'Nike', 'Scarpe', 'Bambino'], '[{ "location": "https://dmam-items.s3.eu-south-1.amazonaws.com/shoes1.jpeg", "key": "shoes1.jpeg"}]', 40, 'Nike', 1, 'Some casual shoes', 'used', ARRAY [1, 2]);

INSERT INTO products (name, slug, categories, tags, images, price, brand, count_in_stock, description, infos, condition)
VALUES ('Game Boy', 'game-boy', ARRAY ['Giocattoli', 'Videogiochi', 'Elettronica'], ARRAY ['Giocattoli', 'Videogiochi', 'Game-Boy'], '[{ "location": "https://dmam-items.s3.eu-south-1.amazonaws.com/gameboy.jpeg", "key": "gameboy.jpeg"}]', 130, 'Nintendo', 2, 'Gameboy color come nuovo', 'Infos vanno qua', 'new');

INSERT INTO products (name, slug, categories, tags, images, price, brand, count_in_stock, description, infos, condition, related_products)
VALUES ('Lego', 'lego', ARRAY ['Giocattoli'], ARRAY ['Giocattoli', 'Lego', 'Costruzioni', '+3 anni'], '[{ "location": "https://dmam-items.s3.eu-south-1.amazonaws.com/lego.jpg", "key": "lego.jpeg"}]', 13, 'Lego', 0, 'Costruzioni Lego', 'Infos vanno qua', 'new', ARRAY [ 3 ]);


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != ''),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    profile_pic_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, is_admin)
VALUES ('Nicola Gaioni', 'a@a.a', '$2a$10$YmU3q9VIaVLClGdd/1RP7ODIENztcUdp6IYAPbDTOApnvjHb5o5bm', true);

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

-- nick Precipizio69 db-damamyamamy
-- psql postgresql://nick:Precipizio69@db-damamyamamy.clybwugninmk.eu-south-1.rds.amazonaws.com:5432/db-damamyamamy 🧨
-- psql postgresql://nick:Precipizio69@db-damamyamamy.clybwugninmk.eu-south-1.rds.amazonaws.com:5432/postgres