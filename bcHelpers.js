const mockData = [
  [`iPhone 11 Pro`, `electronics`, 1100, 30],
  [`Ariat Groundbreaker`, `footwear`, 110, 10],
  [`Applesauce`, `food`, 2, 200],
  [`Vase`, `housewears`, 10, 1000],
  [`TV`, `electronics`, 400, 50],
  [`Laptop`, `electronics`, 800, 100],
  [`Bundle of Oranges`, `food`, 9, 1100]
];

const initialTableQuery = (con) => {
	const tableQuery = `CREATE TABLE IF NOT EXISTS products(
    item_id INT NOT NULL auto_increment,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id))`;

	con.query(tableQuery, err => {
		if (err) throw err;
	});
};


const populatTable = (con) => {
  const tableQuery = `INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity) VALUES ?`;
  con.query(tableQuery, [mockData], (err, res) => {
    if(err) throw err;
    console.log(`res:: ${JSON.stringify(res, null, 2)}`);
  });
};

const getAllItems = (con) => {
  const query = `SELECT * FROM products`;
  con.query(query, (err, res) => {
    if(err) throw err;
    // console.log(`res:: ${JSON.stringify(res, null, 2)}`);
    console.log(`---------------------------------------------------`);
    for(let i = 0; i < res.length; i++) {
      console.log(`Item ID: ${res[i].item_id}`);
      console.log(`Product Name: ${res[i].product_name}`);
      // console.log(`Department: ${res[i].department_name}`);
      console.log(`Price: $${res[i].price}`);
      console.log(`Quantity Available: ${res[i].stock_quantity}`);
      console.log(`---------------------------------------------------`);
    }
  });
};



module.exports = {
  initialTableQuery,
  populatTable,
  getAllItems,
};
