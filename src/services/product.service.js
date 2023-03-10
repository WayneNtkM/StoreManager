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

async function updateProduct(id, name) {
  const product = await productModel.getProductsById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  await productModel.updateProduct(id, name);
  const result = await productModel.getProductsById(id);
  return { type: null, message: result };
}

async function deleteProduct(id) {
  const product = await productModel.getProductsById(id);
  if (!product) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }
  await productModel.deleteProduct(id);
  return {
    type: null,
  };
}

async function getProductByName(name) {
  const product = await productModel.getProductByName(name);
  if (name.length === 0) {
    const products = await productModel.getAllProducts();
    return { type: null, message: products };
  }
  return { type: null, message: [product] };
}

module.exports = {
  getProducts,
  getProductsById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
};