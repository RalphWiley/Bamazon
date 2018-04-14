var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
  });

  function start() {
      inquirer prompt([{
          type: 'list',
          name: 'doThing',
          message: 'What would you like to do?',
          choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'End Session']
        }]).then(function(ans) {
            switch(ans.doThing) {
                case 'View Products for Sale': viewProducts();
                break;
                case 'View Low Inventory': lowInventory();
                break;
                case 'Add to Inventory': addToInventory();
                break;
                case 'Add New Product': addNewProduct();
                break;
                case 'End Session': console.log('Have a day!');
            }
        });
  
}

function viewProducts() {
    connection.query('SELECT * FROM products', function(err, res) {
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log('ID: ' + res[i].item_id + ' | ' + 'Product: ' + res[i].product_name + ' | ' + 'Department: ' + res[i].department_name + ' | ' + 'Price: ' + res[i].price + ' | ' + 'Quantity: ' + res[i].stock_quantity);
        }
        start();
    });
}

function lowInventory() {
    connection.query('SELECT * FROM products', function(err, res) {
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            if(res[i].stock_quantity <= 5) {
                console.log('ID: ' + res[i].item_id + ' | ' + 'Product: ' + res[i].product_name + ' | ' + 'Department: ' + res[i].department_name + ' | ' + 'Price: ' + res[i].price + ' | ' + 'Quantity: ' + res[i].stock_quantity);
            }
        }
        start();
    });
}

function addToInventory() {
    connection.query('SELECT * FROM products', function(err, res) {
        if(err) throw err;
        var itemArray = [];
        for (var i = 0; i < res.length; i++) {
            itemArray.push(res[i].product_name);
        }

        inquirer.prompt([{
            type: 'list',
            name: 'product',
            choices: itemArray,
            message: 'Which item would you like to add to inventory?'
        }, {
            type: 'input',
            name: 'quantity',
            message: 'How much would you like to add?',
            validate: function(value) {
                if(isNaN(value) === false){return true;}
                else{return false;}
            }
        }]).then(function(ans) {
            var currentQuantity;
            for (var i = 0; i < res.length; i++) {
                if(res[i].product_name === ans.product) {
                    currentQuantity = res[i].stock_quantity;
                }
            }
            connection.query('UPDATE products SET ? WHERE ?', [
                {stock_quantity: currentQuantity + parseInt(ans.quantity)},
                {product_name: ans.product}
            ], function(err,res) {
                if(err) throw err;
                console.log('Quantity Updated!');
                start();
            });
        });
    });
}

function addNewProduct() {
    var departmentNames = [];

    connection.query('SELECT * FROM Departments', function(err, res) {
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            departmentNames.push(res[i].department_name);
        }
    });

    inquirer.prompt({{
        type: 'input',
        name: 'product',
        message: 'Product: ',
        validate: function(value) {
            if(value){return true;}
            else{return false;}
        }
    }, {
        type: 'list',
        name: 'department',
        message: 'Department: ',
        choices: departmentNames
    }, {
        type: 'input',
        name: 'price',
        message: 'Price: ',
        validate: function(value) {
            if(isNaN(value) === false){return true;}
            else{return false;}
        }
    }, {
        type: 'input',
        name: 'quantity',
        message: 'Quantity: ',
        validate: function(value) {
            if(isNaN(value) === false){return true;}
            else{return false;}
        }
     }}).then(function(ans) {
         connection.query('INSERT INTO products SET ?', {
             product_name: ans.product,
             department_name: ans.department,
             price: ans.price,
             stock_quantity: ans.quantity
         }, function(err, res) {
             if(err) throw err;
             console.log('New Item Added!');
         })
         start();
     });
}

start();
