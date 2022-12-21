const express = require("express");
const routes = express.Router();

const { loginUser, signupUser, updateUser } = require("../Controllers/authController");
const validateLogin = require("../Middleware/Validation/Login");
const validateSignup = require("../Middleware/Validation/Signup");

routes.post("/login",validateLogin, loginUser);
routes.post("/signup", validateSignup,signupUser)
routes.post("/update", validateSignup, updateUser)
module.exports = routes;