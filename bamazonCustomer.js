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
    const getItemRes = await helper.getAllItems(database); 
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

    console.log(`You want to buy item id ${productRes.product}`);
    console.log(`You want to buy quantity: ${quantityRes.quantity}`);

	} catch (error) {
		console.log(error);
	}
};

bamazon();
