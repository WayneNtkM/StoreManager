const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { newSales, incorrectSales, sales, salesById } = require('./mocks/sales.service.mocks');

describe('Sales service Unit Tests', function () {
  describe('Unit tests sales.service', function () {
    afterEach(sinon.restore);
    it('Should create a new sale', async function () {
      sinon.stub(salesModel, 'insert')
        .resolves([[{ id: 3, itemsSold: newSales }]]);
      
      const { type, message } = await salesService.createNewSale(newSales);
      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal('Successful insert');
    });
    it('Should return an error type', async function () {
      sinon.stub(salesModel, 'insert')
        .resolves(null);

      const { type, message } = await salesService.createNewSale(incorrectSales);
      expect(type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(message).to.be.deep.equal('Product not found');
    });
    it('Should return all sales', async function () {
      sinon.stub(salesModel, 'getAllSales')
        .resolves(sales);

      const { type, message } = await salesService.getAllSales();
      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal(sales);
    });
    it('Should return sales by id', async function () {
      sinon.stub(salesModel, 'getSalesById')
        .resolves(salesById);

      const { type, message } = await salesService.getSalesById(1);
      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal(salesById);
    });
    it('Should return sales by id', async function () {
      sinon.stub(salesModel, 'getSalesById')
        .resolves([]);

      const { type, message } = await salesService.getSalesById(99);
      expect(type).to.be.equal('SALE_NOT_FOUND');
      expect(message).to.be.deep.equal('Sale not found');
    });
  });
});