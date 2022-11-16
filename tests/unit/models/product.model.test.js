const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const conn = require('../../../src/db/connection');
const productModel = require('../../../src/models/product.model');
const { products, productById } = require('./mocks/products.model.mocks');

describe('Product model Unit Tests', function () {
  describe('Unit tests product.model', function () {
    afterEach(sinon.restore);
    it('Should return all products', async function () {
      sinon.stub(conn, 'execute')
        .resolves([[products]]);
      const [result] = await productModel.getAllProducts();
      expect(result).to.be.deep.equal(products);
    });
    it('Should return the correct product', async function () {
      sinon.stub(conn, 'execute')
        .resolves([[productById]]);
      const id = 1;
      const result = await productModel.getProductsById(id);
      expect(result).to.be.deep.equal(productById);
    });
    it('Should create a new product', async function () {
      sinon.stub(conn, 'execute')
        .resolves([[{ name: 'produtoX' }]]);
      const body = { name: 'produtoX' }
      const result = await productModel.createNewProduct(body.name);
      expect(result).to.be.deep.equal(body);
    });
  });
});