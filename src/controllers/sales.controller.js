const salesService = require('../services/sales.service');

async function createNewSale(req, res) {
  const { body } = req;
  const { type, message, insertId } = await salesService.createNewSale(body);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(201).json({
    id: insertId,
    itemsSold: body,
  });
}

async function getAllSales(_req, res) {
  const { message } = await salesService.getAllSales();
  return res.status(200).json(message);
}

async function getSalesById(req, res) {
  const { id } = req.params;
  const { type, message } = await salesService.getSalesById(id);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
}

module.exports = {
  createNewSale,
  getAllSales,
  getSalesById,
};