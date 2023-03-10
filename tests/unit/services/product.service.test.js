const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');
const { products, productById } = require('./mocks/products.service.mocks');

describe('Products service Unit Test', function () {
  describe('Unit Tests products.service', function () {
    afterEach(sinon.restore);
    it('Should return all products', async function () {
      sinon.stub(productModel, 'getAllProducts')
        .resolves(products);
      
      const { type, message } = await productService.getProducts();

      expect(type).to.be.equal(null);
      expect(message).to.deep.equal(products);
    });
    it('Should return an error type', async function () {
      const req = { params: { id: 9 } };
      sinon.stub(productModel, 'getAllProducts')
        .resolves(null);

      const { type, message } = await productService.getProductsById(req.params.id);

      expect(type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(message).to.be.equal('Product not found');
    });
    it('Should return the correct product', async function () {
      sinon.stub(productModel, 'getProductsById')
        .resolves(productById);

      const { type, message } = await productService.getProductsById(1);

      expect(type).to.be.equal(null);
      expect(message).to.deep.equal(productById);
    });
    it('Should create a new product', async function () {
      const req = { body: { name: 'produtoX' } };
      sinon.stub(productModel, 'createNewProduct')
        .resolves({ name: 'produtoX' });

      const { type, message } = await productService.createNewProduct(req.body.name);

      expect(type).to.be.equal(null);
      expect(message).to.deep.equal({ name: 'produtoX' });
    });
    it('Should return an error', async function () {
      sinon.stub(productModel, 'updateProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      const name = 'Machado do Kratos';
      const id = 10;
      const { type, message } = await productService.updateProduct(id, name);

      expect(type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(message).to.be.equal('Product not found');
    });
    it('Should update the product', async function () {
      const updatedProduct = {
        id: 1,
        name: 'Machado do Kratos'
      };
      sinon.stub(productModel, 'updateProduct')
        .resolves(updatedProduct);
      sinon.stub(productModel, 'getProductsById')
        .onCall(0).resolves({ id: 1, name: 'Martelo de Thor' })
        .onCall(1).resolves(updatedProduct);
      const { id, name } = updatedProduct;
      const { type, message } = await productService.updateProduct(id, name);
      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal(updatedProduct);
    });
    it('Should delete the product', async function () {
      sinon.stub(productModel, 'deleteProduct')
        .resolves(null);
      const id = 1;
      const { type } = await productService.deleteProduct(id);

      expect(type).to.be.equal(null);
    });
    it('Should retun an error', async function () {
      sinon.stub(productModel, 'deleteProduct')
        .resolves(null);
      const id = 10;
      const { type, message } = await productService.deleteProduct(id);

      expect(type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(message).to.be.equal('Product not found');
    });
  });
});