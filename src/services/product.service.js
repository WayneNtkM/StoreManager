const productModel = require('../models/product.model');

async function getProducts() {
  const result = await productModel.getAllProducts();
  return { type: null, message: result };
}

async function getProductsById(id) {
  const result = await productModel.getProductsById(id);
  if (!result) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: result };
}

async function createNewProduct(name) {
  const result = await productModel.createNewProduct(name);
  // if (!result) {
  //   return { type: 'INTERNAL_ERROR', message: 'Internal Error' };
  // }
  return { type: null, message: result };
}

module.exports = {
  getProducts,
  getProductsById,
  createNewProduct,
};