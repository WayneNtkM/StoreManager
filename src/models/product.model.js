const conn = require('../db/connection');

async function getAllProducts() {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await conn.execute(query);
  return result;
}

async function getProductsById(id) {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[result]] = await conn.execute(query, [id]);
  return result;
}

async function getProductByName(name) {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [[result]] = await conn.execute(query, [name]);
  return result;
}

async function createNewProduct(name) {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  await conn.execute(query, [name]);
  const result = await getProductByName(name);
  return result;
}

async function updateProduct(id, name) {
  const query = `
  UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?
  `;
  await conn.execute(query, [name, id]);
}

module.exports = {
  getAllProducts,
  getProductsById,
  createNewProduct,
  getProductByName,
  updateProduct,
};