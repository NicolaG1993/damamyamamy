DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orders;

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != ''),
    slug VARCHAR NOT NULL CHECK (slug != ''),
    category VARCHAR NOT NULL CHECK (category != ''),
    image VARCHAR(255),
    price INT,
    brand VARCHAR NOT NULL CHECK (brand != ''),
    rating INT,
    numReviews INT,
    countInStock INT,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, slug, category, image, price, brand, rating, numReviews, countInStock, description)
VALUES ('Free Shirt', 'free-shirt', 'Shirts', '/images/shirt1.jpg', 70, 'Nike', 4.5, 10, 20, 'A popular shirt');

INSERT INTO products (name, slug, category, image, price, brand, rating, numReviews, countInStock, description)
VALUES ('Fit Shirt', 'fit-shirt', 'Shirts', '/images/shirt2.jpg', 40, 'Adidas', 4, 10, 20, 'A fit shirt');

INSERT INTO products (name, slug, category, image, price, brand, rating, numReviews, countInStock, description)
VALUES ('Polo', 'polo', 'Ralph Lauren', '/images/shirt3.jpg', 90, 'Nike', 4.8, 10, 20, 'A polo');


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