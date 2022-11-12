const salesService = require('../services/sales.service');

async function createNewSale(req, res) {
  const { body } = req;
  const { type, message } = await salesService.createNewSale(body);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(201).json({
    id: 3,
    itemsSold: body,
  });
}

module.exports = {
  createNewSale,
};