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
    const newProduct = {
      name: 'ProdutoX',
    };

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
    it('Should create a new product', async function () {
      const req = { body: {} };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createNewProduct')
        .resolves({ type: null, message: newProduct });
      await productsController.createNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
    it('Should return the correct product', async function () {
      const req = { params: { id: 8 }, body: {} };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductsById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      await productsController.getProductsById(req, res);

      expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
      expect(res.status).to.have.been.calledWith(404);
    });
  });
});