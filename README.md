# Bamazon!

## Getting Started

- Clone repository
- Run command in Terminal or Gitbash with 'npm install'
- Run command based on the mode you would like to use:
  - Customer - 'npm run customer'
  - Manager - 'npm run manager'
- Run 'ctrl + c' to exit each mode

## What Each Mode Does

1. bamazonCustomer.js

- Prints the products in the store.
- Prompts customer to select which product, by ID, that they would like to purchase.
- Then it asks for the quantity
  - If sufficient amount of stock, it will return the total of that purchase and updates the stock quantity to show 
    that purchase.  It will also update the product sales.
  - However,  if there is not enough stock, the user will be told that there is not enough of the product.

2. bamazonManager.js

- Starts up with a menu:
  - View Products for Sale - Lists products in store including all their details.
  - View Low Inventory - Lists all items with less than 5 items.
  - Add to Inventory - Allows the manager to select a product and add inventory.
  - Add New Product - Allows the manager to add a new product to the store.
  - End Session - Ends session and does not go back to the menu.
  
  ## Screenshots
  
  
  ## Technologies used
  
  - Node.js
  - [MySQL npm package](https://www.npmjs.com/package/mysql)
  - [Inquirer npm package](https://www.npmjs.com/package/inquirer)
  
  ## Built With
  
  - Microsoft Visual Studio
  - Sequel Pro
  - Terminal
  
  ## Author
  
  - Nick Keith - JS/MySQL/Node.js
 
 
