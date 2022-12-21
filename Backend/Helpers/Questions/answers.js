const Joi = require("joi")

const schema = Joi.object({
   
    "answer":Joi.string().min(5).required(),
    "question_id":Joi.string().required()

})

module.exports = {
    validate: (data)=>{
        return schema.validate(data)
    }
}