const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const { exec } = require("../Helpers/databaseHelper");
const dotenv= require("dotenv").config();

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // const exists = await exec("getOneUser", { email });
    // console.log(exists);

    const id = v4();
    const hashedpassword = await bcrypt.hash(password, 8);
    const data = { id, username, email, password: hashedpassword };
    //console.log(data);
    await exec('add_UpdateUser', data);
     res.status(201).json({ message: "success"});
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.message});
  }
};

const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedpassword = await bcrypt.hash(password, 8);
  try {
    await exec("add_UpdateUser", { username, email, password: hashedpassword });
    return res
      .status(200)
      .json({ message: "User Updated Succesfully", error: "" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await exec("getOneUser", { email });

  const correct = await bcrypt.compare(password, user[0].password);
  if (correct) {
    let { id, email, username } = user[0];
 
    
   
    let payload = { id, email,  username };
    let token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: "14000s",
    });
    res.status(200).json({ token });
  } else {
    res.status(400).json({ error: "incorrect password" });
  }
};
module.exports = {
  signupUser,
  loginUser,
  updateUser,
};