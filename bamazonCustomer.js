const inquirer = require(`inquirer`);
const mysql2 = require(`mysql2/promise`);
const helper = require(`./bcHelpers`);

const bamazon = async () => {
  const database =  await mysql2.createConnection({
      host: `localhost`,
      port: 8889,
      user: `root`,
      password: `root`,
      database: `bamazon`
  });

  try {
    await helper.getAllItems(database); 
    const productRes = await inquirer.prompt({
			name: `product`,
			type: `number`,
			message: `What product ID would you like to buy?`
		});

		const quantityRes = await inquirer.prompt({
			name: `quantity`,
			type: `number`,
			message: `Quantity you would like to buy?`
		});
	} catch (error) {
		console.log(error);
	}
};

bamazon();
