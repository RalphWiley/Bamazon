//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
  });

  function start() {

  connection.query('SELECT * FROM products', function(err, result) {
    if(err) throw err; 
      
    console.log('Welcome to Bamazon!');
    console.log('------------------------------------------------');

    for (var i = 0; i < result.length; i++) {
        console.log('ID: ' + result[i].item_id + ' | ' + 'Product: ' + result[i].product_name + ' | ' + 'Department: ' + result[i].department_name + ' | ' + 'Price: ' + result[i].price + ' | ' + 'Quantity: ' + result[i].stock_quantity);
        console.log('---------------------------------------------------');
    }

    console.log(' ');
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the product you would like to purchase?',
            validate: function(value) {
               if(isNaN(value) == false && parseInt(value) <= result.length && parseInt(value) > 0) {
                   return true;
               } else {
                   return false;
               }
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to purchase?',
            validate: function(value) {
                if(isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
        ]).then(function(answer) {
            var itemBought = (answer.id) - 1;
            var numberPurchased = parseInt(answer.quantity);
            var grandTotal = parseFloat(((result[itemBought].price) * numberPurchased).toFixed(2));
        
            if(result[itemBought].stock_quantity >= numberPurchased) {
                connection.query('UPDATE products SET ? WHERE ?', [
                {stock_quantity: (result[itemBought].stock_quantity - numberPurchased)},
                {item_id: answer.id}
                ], function(err, res) {
                    if(err) throw err;
                    console.log("Thank you for your purchase! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped within 3 buisness days.");
                });

                connection.query('SELECT * FROM departments', function(err, deptRes) {
                    if(err) throw err;
                    var index;
                    for (var i = 0; i < deptRes.length; i++) {
                        if(deptRes[i].department_name === result[itemBought].department_name) {
                            index = 1;
                        }
                    }

                    //updates totalSales in departments table
                    connection.query('UPDATE departments SET ? WHERE ?' [
                        {TotalSales: deptRes[index].TotalSales + grandTotal},
                        {DepartmentName: res[itemBought].DepartmentName}
                    ], function(err, deptRes) {
                        if(err) throw err;
                    });
                });
            } else {
                console.log('Sorry, there is not enough in stock!');
            }
            reprompt();
        })
    })
}

//prompts if user would like to purchase another item
function reprompt() {
    inquirer.prompt([
    {
        type: 'confirm',
        name: 'reply',
        message: 'Would you like to purchase another item?'
    }]).then(function(ans) {
        if(ans.reply){
            start();
        } else {
            console.log('Thanks for browsing!');
        }
    });
}

start();