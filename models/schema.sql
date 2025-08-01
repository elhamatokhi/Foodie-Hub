-- schema.sql
CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'ready', 'delivered', 'cancelled');

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  street TEXT,
  city TEXT,
  country TEXT,
  opening_hours TEXT,
  description TEXT
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  street TEXT,
  city TEXT,
  country TEXT
);

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  category TEXT,
  dietary_info TEXT,
  available BOOLEAN,
  restaurant_id INT REFERENCES restaurants(id)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_date TIMESTAMP NOT NULL,
  total_amount DECIMAL(10, 2),
  status order_status NOT NULL DEFAULT 'pending',
  customer_id INT REFERENCES customers(id),
  restaurant_id INT REFERENCES restaurants(id)
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INT REFERENCES menu_items(id),
  quantity INT NOT NULL DEFAULT 1
);
