const express = require('express');

const salesController = require('../controllers/sales.controller');
const salesMiddleware = require('../middlewares/sales.middlewares');

const salesRouter = express.Router();

salesRouter.post('/', salesMiddleware.validateProductId,
  salesMiddleware.validateQuantity, salesController.createNewSale);

module.exports = salesRouter;