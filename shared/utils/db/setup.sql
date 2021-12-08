DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orders;

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != ''),
    slug VARCHAR NOT NULL CHECK (slug != ''),
    categories TEXT [],
    images TEXT [],
    price INT,
    brand VARCHAR NOT NULL CHECK (brand != ''),
    countInStock INT,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, slug, categories, images, price, brand, countInStock, description)
VALUES ('Maglietta', 'maglietta', ARRAY ['Maglie', 'Abbigliamento', 'Bambina'], ARRAY [ '/images/shirt1.jpg' ], 70, 'Nike', 1, 'A popular shirt');

INSERT INTO products (name, slug, categories, images, price, brand, countInStock, description)
VALUES ('Scarpe', 'scarpe', ARRAY ['Scarpe', 'Abbigliamento', 'Bambino'], ARRAY [ '/images/shoes1.jpg' ], 40, 'Nike', 1, 'Some casual shoes');

INSERT INTO products (name, slug, categories, images, price, brand, countInStock, description)
VALUES ('Game Boy', 'game-boy', ARRAY ['Giocattoli', 'Videogiochi', 'Elettronica'], ARRAY [ '/images/gameboy.jpg' ], 130, 'Nintendo', 2, 'Gameboy color come nuovo');


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
    orderId SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    orderItems JSONB NOT NULL,
    shippingAddress JSON NOT NULL,
    paymentMethod VARCHAR NOT NULL,
    paymentResult JSON,
    itemsPrice DECIMAL(12,2) NOT NULL,
    shippingPrice DECIMAL(12,2) NOT NULL,
    taxPrice DECIMAL(12,2) NOT NULL,
    totalPrice DECIMAL(12,2) NOT NULL,
    isPaid BOOLEAN DEFAULT false,
    isDelivered BOOLEAN DEFAULT false,
    paidAt TIMESTAMP,
    deliveredAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- sudo service postgresql start
-- createdb damamyamamy
-- psql -d damamyamamy -f shared/utils/db/setup.sql