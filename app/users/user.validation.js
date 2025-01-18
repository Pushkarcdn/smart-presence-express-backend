const Joi = require("joi");

const addUserValidation = Joi.object({
  id: Joi.string().allow("").optional(),
  firstName: Joi.string().min(3).max(32).required(),
  lastName: Joi.string().min(3).max(32).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().max(128).required(),
  password: Joi.string().allow("").optional(),
  moduleId: Joi.string().allow("").optional(),
  groupId: Joi.string().allow("").optional(),
  role: Joi.string().required(),
}).meta({ name: "UserConfig" });

const updateUserValidation = Joi.object({
  firstName: Joi.string().min(3).max(32).optional(),
  lastName: Joi.string().min(3).max(32).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().max(128).optional(),
  password: Joi.string().optional(),
}).meta({ name: "UserConfig" });

module.exports = {
  addUserValidation,
  updateUserValidation,
};
