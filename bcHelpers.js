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

// const initialTableQuery = (db) => {
// 	const tableQuery = `CREATE TABLE IF NOT EXISTS products(
//     item_id INT NOT NULL auto_increment,
//     product_name VARCHAR(100) NOT NULL,
//     department_name VARCHAR(100) NOT NULL,
//     price INT NOT NULL,
//     stock_quantity INT NOT NULL,
//     PRIMARY KEY (item_id))`;

// 	db.query(tableQuery, err => {
// 		if (err) throw err;
// 	});
// };


// const populatTable = (db) => {
//   const tableQuery = `INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity) VALUES ?`;
//   db.query(tableQuery, [mockData], (err, res) => {
//     if(err) throw err;
//     console.log(`res:: ${JSON.stringify(res, null, 2)}`);
//   });
// };

const getAllItems = async (db) => {
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
    for(let i = 0; i < rows.length; i++) {
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

module.exports = {
  // initialTableQuery,
  // populatTable,
  getAllItems,
};
