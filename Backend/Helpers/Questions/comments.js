const Joi = require("joi")

const schema = Joi.object({
   
    "comment":Joi.string().min(5).required(),
    "answer_id":Joi.string().required()

})

module.exports = {
    validate: (data)=>{
        return schema.validate(data)
    }
}