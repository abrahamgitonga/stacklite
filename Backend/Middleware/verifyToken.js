//verifytoken
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()

const verifyToken = async (req, res, next) => {
  try {
    const tokenAuth = req.headers["authorization"];
    if (!tokenAuth) {
      res.status(401).json({ message: "You don't have access. Log in first" });
    } else {
      const token = tokenAuth.split(" ")[1];
      const decodedData = await jwt.verify(token, process.env.SECRET);
      
      req.info = decodedData;
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {verifyToken}