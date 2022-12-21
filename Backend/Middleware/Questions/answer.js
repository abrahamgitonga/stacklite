const { validate} = require("../../Helpers/Questions/answers");


const validateAns = (req, res, next) => {
  const  data = req.body;
  console.log(req.body);
  const { error, value } = validate(data);
  if (error) {
    let errors = error.details.map((err) => err.message);
    return res.status(400).json({ errors });
  } else {
    return next();
  }
};
module.exports = validateAns;