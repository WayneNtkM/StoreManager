const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { newSales, incorrectSales } = require('./mocks/sales.service.mocks');

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
  });
});