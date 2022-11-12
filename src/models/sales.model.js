const conn = require('../db/connection');

async function getLastSale() {
  const query = 'SELECT id FROM StoreManager.sales ORDER BY id DESC LIMIT 1';
  const [[result]] = await conn.execute(query);
  return result;
}

async function insertIntoSales() {
  const SALE_QUERY = 'INSERT INTO StoreManager.sales (date) VALUES (?)';
  const date = new Date();
  await conn.execute(SALE_QUERY, [date]);
}

async function insert(sale) {
  const SALE_PRODUCTS_QUERY = `INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;
  const { id } = await getLastSale();
  console.log(id);
  await insertIntoSales();
  await Promise.all(sale.map(({ productId, quantity }) => (
    conn.execute(SALE_PRODUCTS_QUERY, [id + 1, productId, quantity])
  )));
}

module.exports = {
  insert,
};