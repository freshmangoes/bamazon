const inquirer = require(`inquirer`);
const mysql = require(`mysql`);
const helper = require(`./bcHelpers`);

const con = mysql.createConnection({
	host: `localhost`,
	port: 8889,
	user: `root`,
	password: `root`,
	database: `bamazon`
});

const connection = con.connect((err, res) => {
	if (err) throw err;
	console.log(`res:: ${JSON.stringify(res, null, 2)}`);
	console.log(`Connected :)`);
  helper.initialTableQuery(con);
  // helper.populatTable(con);
  helper.getAllItems(con);
});
