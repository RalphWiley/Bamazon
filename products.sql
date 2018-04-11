CREATE DATABASE bamazon; */

USE bamazon;

CREATE TABLE products (
	`item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`product-name` VARCHAR(50) NOT NULL,
	`department_name` VARCHAR(50) NOT NULL,
	`price` DECIMAL(7, 2) NOT NULL DEFAULT 99999.99,
	`stock_quantity` INT UNSIGNED NOT NULL DEFAULT 0,
	PRIMARY KEY(item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values (1001, 'MacBook Pro', 'Computer and Electronics', 1500.99, 30);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values (1002, 'Samsung TV', 'Computer and Electronics', 400.00, 15);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values (1003, 'Apple Iphone', 'Computer and Electornics', 600.50, 150);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values (1004, 'I Am Legend', 'Books and Graphic Novels', 14.32, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values (1005, 'Into the Wild', 'Books and Graphic Novels', 10.15, 25);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values (1006, 'Blankets', 'Books and Graphic Novels', 40.00, 10);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values (1007, 'Bone', 'Books and Graphic Novels', 60.00, 5);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values (1008, 'Toaster Oven', 'Home Appliances', 35.99, 25);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values (1009, 'Juicer', 'Home Appliances', 25.15, 10);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values (1010, 'Coffe Grinder', 'Home Appliances', 50.00, 100);


SELECT * FROM products;
ALTER TABLE products CHANGE COLUMN `product-name` `product_name` VARCHAR(50) NOT NULL;