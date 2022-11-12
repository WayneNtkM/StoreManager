const Joi = require('joi');

const validProductId = Joi.object({
  productId: Joi.number().integer().required(),
}).required().messages({
  'any.required': '"productId" is required',
});

const servicesProductId = Joi.array().items(validProductId);

const validQuantity = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
}).required().messages({
  'any.required': '"quantity" is required',
  'any.min': '"quantity" must be greater than or equal to 1',
});

const servicesQuantity = Joi.array().items(validQuantity);

function validateProductId(req, res, next) {
  const { body } = req;
  const { error } = servicesProductId
    .validate([...body.map(({ quantity, ...rest }) => rest)]);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  return next();
}

function validateQuantity(req, res, next) {
  const { body } = req;
  const { error } = servicesQuantity
    .validate([...body.map(({ productId, ...rest }) => rest)]);
  if (error && error.details[0].type === 'number.min') {
    return res.status(422).json({
      message: error.details[0]
        .message.replace(/0/g, '').split('[].').join(''),
    });
  }
  if (error && error.details[0].type === 'any.required') {
    return res.status(400).json({ message: error.details[0].message });
  }
  return next();
}

module.exports = {
  validateProductId,
  validateQuantity,
};