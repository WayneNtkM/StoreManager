const productModel = require('../models/product.model');
const salesModel = require('../models/sales.model');

async function createNewSale(sales) {
  const products = await productModel.getAllProducts();
  const validId = sales.map(({ productId }) => products
    .some((e) => e.id === productId)).every((e) => e === true);
  if (validId) {
    const { insertId } = await salesModel.insert(sales);
    return { type: null, message: 'Successful insert', insertId };
  }
  return {
    type: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
  };
}

async function getAllSales() {
  const sales = await salesModel.getAllSales();
  return {
    type: null,
    message: sales,
  };
}

async function getSalesById(id) {
  const sales = await salesModel.getSalesById(id);
  if (sales.length === 0) {
    return {
      type: 'SALE_NOT_FOUND',
      message: 'Sale not found',
    };
  }
  return {
    type: null,
    message: sales,
  };
}

async function deleteSales(id) {
  const sales = await salesModel.getSalesById(id);
  if (sales.length === 0) {
    return {
      type: 'SALE_NOT_FOUND',
      message: 'Sale not found',
    };
  }
  const result = await salesModel.deleteSale(id);
  return {
    type: null,
    message: result,
  };
}

async function updateSales(id, sales) {
  const sale = await salesModel.getSalesById(id);
  const products = await productModel.getAllProducts();
  const validId = sales.map(({ productId }) => products
    .some((e) => e.id === productId)).every((e) => e === true);
  if (sale.length === 0) {
 return {
      type: 'SALE_NOT_FOUND', message: 'Sale not found' }; 
}
  if (validId) {
    await salesModel.updateSales(id, sales);
    return {
      type: null,
      message: {
        saleId: id, itemsUpdated: [sales[1], sales[0]] },
    };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
}

module.exports = {
  createNewSale,
  getAllSales,
  getSalesById,
  deleteSales,
  updateSales,
};