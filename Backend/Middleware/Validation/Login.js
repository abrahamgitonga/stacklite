const { validateLogin } = require("../../Helpers/Validation/Login");

const validate = (req, res, next) => {
  const { email, password } = req.body;
  const { error, value } = validateLogin({email,password});
 
  if (error) {
    let errors = error.details.map(err=>err.message)
    return res.status(400).json({ errors });
  } else {
    return next();
  }
};

module.exports = validate