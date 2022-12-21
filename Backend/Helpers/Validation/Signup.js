const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password:Joi.string().min(8).max(20).required()

});

module.exports = ({
    validateSignUp:(data)=>{
        return schema.validate(data)
    }
})