const productService = require('../services/product.service');

async function getProducts(_req, res) {
  const products = await productService.getProducts();
  return res.status(200).json(products.message);
}

async function getProductsById(req, res) {
  const { id } = req.params;
  const { type, message } = await productService.getProductsById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
}

async function createNewProduct(req, res) {
  const { name } = req.body;
  const { message } = await productService.createNewProduct(name);
  // if (type) return res.status(500).json({ message: 'Internal Error' });
  return res.status(201).json(message);
}

module.exports = {
  getProducts,
  getProductsById,
  createNewProduct,
};