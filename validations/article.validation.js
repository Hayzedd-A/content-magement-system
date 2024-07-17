const joi = require("joi");

const articleSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  //   author: joi.string().required(),
  category: joi.string().required(),
  status: joi.string().valid("draft", "published", "archived"),
  tag: joi.string(),
});

module.exports = {
  articleSchema,
};
