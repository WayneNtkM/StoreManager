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

async function insert(sales) {
  const SALE_PRODUCTS_QUERY = `INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;
  const { id } = await getLastSale();
  await insertIntoSales();
  await Promise.all(sales.map(({ productId, quantity }) => (
    conn.execute(SALE_PRODUCTS_QUERY, [id + 1, productId, quantity])
  )));
}

async function getAllSales() {
  const query = `
  SELECT date, product_id AS productId, sale_id AS saleId, quantity
  FROM StoreManager.sales a
  INNER JOIN StoreManager.sales_products b
  ON a.id = b.sale_id
  `;
  const [result] = await conn.execute(query);
  return result;
}

async function getSalesById(id) {
  const query = `
  SELECT date, product_id AS productId, quantity
  FROM StoreManager.sales a
  INNER JOIN StoreManager.sales_products b
  ON a.id = b.sale_id
  WHERE a.id = ?
  `;
  const [result] = await conn.execute(query, [id]);
  return result;
}

module.exports = {
  insert,
  getAllSales,
  getSalesById,
};