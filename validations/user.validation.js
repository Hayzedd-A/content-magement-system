const joi = require("joi");

const createUserSchema = joi.object({
  firstname: joi
    .string()
    .pattern(/^[A-Za-z]+$/)
    .required(),
  lastname: joi
    .string()
    .pattern(/^[A-Za-z]+$/)
    .required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  age: joi.number().min(15).required(),
  role: joi.string().valid("admin", "user").required(),
});

const updateUserSchema = joi.object({
  firstname: joi.string().pattern(/^[A-Za-z]+$/),
  lastname: joi.string().pattern(/^[A-Za-z]+$/),
  username: joi.string(),
  email: joi.string().email(),
  password: joi.string(),
  age: joi.number().min(18),
  role: joi.string().valid("admin", "user"),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
