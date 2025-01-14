const Joi = require("joi");

const addAdminValidation = Joi.object({
  firstName: Joi.string().min(3).max(32).required(),
  lastName: Joi.string().min(3).max(32).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,16}$/)
    .required(),
  address: Joi.string().max(128).required(),
  profileImage: Joi.any().optional(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d@$!%*?&_]{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
}).meta({ name: "AdminConfig" });

const updateAdminValidation = Joi.object({
  firstName: Joi.string().min(3).max(32).optional(),
  lastName: Joi.string().min(3).max(32).optional(),
  email: Joi.string().email().max(128).optional(),
  profileImage: Joi.any().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,16}$/)
    .optional(),
  address: Joi.string().max(128).optional(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_])[A-Za-z\\d@$!%*?&_]{8,}$"
      )
    )
    .optional()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
}).meta({ name: "AdminConfig" });

module.exports = { addAdminValidation, updateAdminValidation };
