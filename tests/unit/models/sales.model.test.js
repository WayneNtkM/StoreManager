const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const conn = require('../../../src/db/connection');
const salesModel = require('../../../src/models/sales.model');
const { sales, salesById } = require('./mocks/sales.model.mocks');

describe('Sales model Unit Tests', function () {
  describe('Unit Tests sales.model', function () {
    afterEach(sinon.restore)
    it('Should insert a new sale', async function () {
      const newSale = [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 5
        }
      ];
      sinon.stub(conn, 'execute')
        .resolves([[{
        id: 3,
        itemsSold: newSale
        }]]);
      await salesModel.insert(newSale);
    });
    it('Should return all sales', async function () {
      sinon.stub(conn, 'execute')
        .resolves([sales]);
      const result = await salesModel.getAllSales();
      expect(result).to.be.deep.equal(sales);
    });
    it('Should return sales by id', async function () {
      sinon.stub(conn, 'execute')
        .resolves([salesById]);
      const result = await salesModel.getSalesById(1);
      expect(result).to.be.deep.equal(salesById);
    });
  });
});