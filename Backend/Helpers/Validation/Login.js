const Joi = require("joi");

const schema = Joi.object({
  password: Joi.string().required().min(8).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

module.exports = {
  validateLogin: (data) => {
    return schema.validate(data);
  },
};