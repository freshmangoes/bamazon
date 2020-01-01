const inquirer = require(`inquirer`);

const mockData = [
	[`iPhone 11 Pro`, `electronics`, 1100, 30],
	[`Ariat Groundbreaker`, `footwear`, 110, 10],
	[`Applesauce`, `food`, 2, 200],
	[`Vase`, `housewears`, 10, 1000],
	[`TV`, `electronics`, 400, 50],
	[`Laptop`, `electronics`, 800, 100],
	[`Bundle of Oranges`, `food`, 9, 1100]
];

// initializes the table if it doesn't exist
const initialTableQuery = async db => {
	const query = `CREATE TABLE IF NOT EXISTS products(
    item_id INT NOT NULL auto_increment,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id))`;

	try {
		await db.query(query);
	} catch (err) {
		console.log(err);
	}
};

// populates the table with data
const populatTable = async db => {
	const query = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?`;
	try {
		await db.query(query, [mockData]);
	} catch (err) {
		console.log(err);
	}
};

const getAllItems = async db => {
	// create a hashmap to store item ids and quantities
	let hashMap = {};
	try {
		// result from the database query
		const res = await db.query(`SELECT * FROM products`);
		// console.log(JSON.stringify(res[0], null, 2));

		// table data
		const rows = res[0];
		console.log(`---------------------------------------`);
		// iterate through table data and print relevant data
		for (let i = 0; i < rows.length; i++) {
			console.log(`ID: ${rows[i].item_id}`);
			console.log(`Product: ${rows[i].product_name}`);
			console.log(`Price: $${rows[i].price}`);
			console.log(`Quantity Available: ${rows[i].stock_quantity}`);
			console.log(`---------------------------------------`);
			// push the id as the key and the quantity as the value
			hashMap[rows[i].item_id] = rows[i].stock_quantity;
		}
		// return the hashmap
		return hashMap;
	} catch (err) {
		console.log(err);
	}
};

// function to see if a hashmap or object contains a key
// in this case is being used to see if our hashmap of item_ids contains
// the item_id a user is attempting to choose
const hashMapContains = (obj, key) => {
	return obj ? hasOwnProperty.call(obj, key) : false;
};

// function to take in user input
// returns an object containing the item and quantity a customer wants
const itemAndQuantity = async getItemRes => {
	const customerRes = await inquirer.prompt([
		{
			name: `item_id`,
			type: `number`,
			message: `What product ID would you like to buy?`
		},
		{
			name: `quantity`,
			type: `number`,
			message: `Quantity you would like to buy?`
		}
	]);

	console.log(`You want to buy item id: ${customerRes.item_id}`);
	console.log(`You want to buy quantity: ${customerRes.quantity}`);

	// validating input
	if (!hashMapContains(getItemRes, customerRes.item_id)) {
		console.log(`Product ID does not exist`);
		return itemAndQuantity(getItemRes);
	} else if (
		customerRes.quantity > getItemRes[customerRes.item_id] ||
		!(customerRes.quantity > 0)
	) {
		console.log(
			`Warehouse has insufficient quantity or you input an amount, 0 or less.`
		);
		return itemAndQuantity(getItemRes);
	}

	return customerRes;
};

const buyItem = async (db, q, id) => {
	const query = `UPDATE products
                SET stock_quantity = stock_quantity - ?
                WHERE item_id = ?`;
	const data = [q, id];
	try {
		await db.query(query, data);
	} catch (err) {
		console.log(err);
	}
};

const showCost = async (db, q, id) => {
	const query = `SELECT price FROM products WHERE item_id = ?`;
	const data = id;
	try {
    const res = await db.query(query, data);
    let price = res[0][0].price;
    price *= q;
    console.log(`Your total for this transaction is $${price}.`);

    // inquirer prompt to buy another item
    const repeat = await inquirer.prompt({
      name: `confirmation`,
      message: `Would you like to select another item?`,
      type: `confirm`
    });
    if(!repeat.confirmation) {
      process.exit();
    }
  } catch (err) {
		console.log(err);
  }

};

module.exports = {
	getAllItems,
	hashMapContains,
	itemAndQuantity,
  buyItem,
  showCost,
};
