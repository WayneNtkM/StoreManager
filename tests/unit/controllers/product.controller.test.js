const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai)

const productsService = require('../../../src/services/product.service');
const { products, productById } = require('./mocks/products.controller.mock');
const productsController = require('../../../src/controllers/product.controller');

describe('Products controller Unit Tests', function() {
  describe('Unit Test product.controller', function () {
    afterEach(sinon.restore);
    it('Should return all products', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProducts')
        .resolves({ type: null, message: products });
      
      await productsController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
    it('Should return the correct product', async function () {
      const req = { params: { id: 1 }, body: {} };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductsById')
        .resolves({ type: null, message: productById });
      await productsController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productById);
    });
  });
});