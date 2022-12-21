const { validateSignUp } = require("../../Helpers/Validation/Signup");

const validate = (req, res, next) => {
  const { username, email, password } = req.body;
  const { error, value } = validateSignUp({ username, email, password });
  if (error) {
    let errors = error.details.map((err) => err.message);
    return res.status(400).json({ errors });
  } else {
    next();
  }
};

module.exports = validate