const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const conn = require('../../../src/db/connection');
const salesModel = require('../../../src/models/sales.model');

describe('Sales model Unit Tests', function () {
  describe('Unit Tests sales.model', function () {
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
  });
});