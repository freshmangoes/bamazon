CREATE DATABASE IF NOT EXISTS bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL auto_increment,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);



DROP table products cascade;

SELECT * FROM products;