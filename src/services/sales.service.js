const productModel = require('../models/product.model');
const salesModel = require('../models/sales.model');

async function createNewSale(sales) {
  const products = await productModel.getAllProducts();
  const validId = sales.map(({ productId }) => products
    .some((e) => e.id === productId)).every((e) => e === true);
  if (validId) {
    await salesModel.insert(sales);
    return { type: null, message: 'Successful insert' };
  }
  return {
    type: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
  };
}

module.exports = {
  createNewSale,
};