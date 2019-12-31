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
    // getItemRes
    // hashmap to contain all item_ids and quantities
    const getItemRes = await helper.getAllItems(database); 

    // inquirer prompt to get what item_id the user wants and the quantity
    const itemQuantityRes = await helper.itemAndQuantity(getItemRes);
    // console.log(itemQuantityRes);
    // queries the database with the user input
    await helper.buyItem(database, itemQuantityRes.quantity, itemQuantityRes.item_id);
    return bamazon();
  } catch (error) {
		console.log(error);
	}
};

bamazon();
