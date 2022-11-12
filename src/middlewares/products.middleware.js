const Joi = require('joi');

const validateName = Joi.object({
  name: Joi.string().min(5).required(),
}).required().messages({
  'any.required': '{#label} is required',
  'string.min': '{#label} length must be at least 5 characters long',
});

function validName(req, res, next) {
  const { name } = req.body;
  const { error } = validateName.validate({ name });
  if (error && error.message.includes('is required')) {
    return res.status(400).json({ message: error.message });
  }
  if (error && error.message.includes('length')) {
    return res.status(422).json({ message: error.message });
  }
  return next();
}

module.exports = {
  validName,
};