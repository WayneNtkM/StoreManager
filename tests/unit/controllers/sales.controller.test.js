const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { newSales, incorrectSales } = require('./mocks/sales.controller.mocks');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

describe('Sales controller Unit Tests', function () {
  describe('Unit tests sales.controller', function () {
    afterEach(sinon.restore);
    it('Should create a new sale', async function () {
      const req = { body: newSales };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createNewSale')
        .resolves({ type: null, message: { id: 3, itemsSold: newSales } });

      await salesController.createNewSale(req, res);

      expect(res.json).to.have.been.calledWith({ id: 3, itemsSold: newSales });
      expect(res.status).to.have.been.calledWith(201);
    });
    it('Should return a status 404', async function () {
      const req = { body: incorrectSales };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createNewSale')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      await salesController.createNewSale(req, res);

      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
      expect(res.status).to.have.been.calledWith(404);
    });
  });
});