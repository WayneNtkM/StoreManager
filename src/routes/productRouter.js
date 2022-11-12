const express = require('express');
const productsController = require('../controllers/product.controller');
const productMiddlewares = require('../middlewares/products.middleware');

const productRouter = express.Router();

productRouter.get('/:id', productsController.getProductsById);
productRouter.post('/', productMiddlewares.validName, productsController.createNewProduct);
productRouter.get('/', productsController.getProducts);

module.exports = productRouter;