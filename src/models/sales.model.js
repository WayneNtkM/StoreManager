const conn = require('../db/connection');

async function insertIntoSales() {
  const SALE_QUERY = 'INSERT INTO StoreManager.sales (date) VALUES (?)';
  const date = new Date();
  const result = await conn.execute(SALE_QUERY, [date]);
  return result;
}

async function insert(sales) {
  const SALE_PRODUCTS_QUERY = `INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;
  const [{ insertId }] = await insertIntoSales();
  await Promise.all(sales.map(({ productId, quantity }) => (
    conn.execute(SALE_PRODUCTS_QUERY, [insertId, productId, quantity])
  )));
  return { insertId };
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

async function deleteSale(id) {
  const query = `
  DELETE a.*, b.* FROM StoreManager.sales a
  INNER JOIN StoreManager.sales_products b
  ON a.id = b.sale_id
  WHERE a.id = ?
  `;
  const [result] = await conn.execute(query, [id]);
  return result;
}

async function updateSales(id, sales) {
  const deleteQuery = `
  DELETE FROM StoreManager.sales_products
  WHERE sale_id = ?
  `;
  await conn.execute(deleteQuery, [id]);
  const updateQuery = `
  INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;
  await Promise.all(sales.map(({ productId, quantity }) => (
    conn.execute(updateQuery, [id, productId, quantity])
  )));
}

module.exports = {
  insert,
  getAllSales,
  getSalesById,
  deleteSale,
  updateSales,
};