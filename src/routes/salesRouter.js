const express = require('express');

const salesController = require('../controllers/sales.controller');
const salesMiddleware = require('../middlewares/sales.middlewares');

const salesRouter = express.Router();

salesRouter.put('/:id', salesMiddleware.validateProductId,
  salesMiddleware.validateQuantity, salesController.updateSales);
salesRouter.delete('/:id', salesController.deleteSales);
salesRouter.get('/:id', salesController.getSalesById);
salesRouter.post('/', salesMiddleware.validateProductId,
  salesMiddleware.validateQuantity, salesController.createNewSale);
salesRouter.get('/', salesController.getAllSales);

module.exports = salesRouter;