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
    console.log(data);
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

const loginUser= async(req,res)=>{
    try {
        const {email,password}= req.body;
        const user =await (await exec('getOneUser', {email})).recordset[0]
        if(user){
            // password checking
            
        const checkPassword= await bcrypt.compare(password, user.password)
          if(checkPassword){
            const {password, id ,...payload}=user
            const token = jwt.sign(payload,process.env.SECRET, {expiresIn:'12000s'})
            return res.status(200).json({message:'Logged in !!',token})
          }else{
           return res.status(400).json({message:"User Not Found"})
          }
        }else{
            return res.status(400).json({message:"User Not Found"})
        }
        
    } catch (error) {
         return res.status(400).json({message:error.message})
    }
}
module.exports = {
  signupUser,
  loginUser,
  updateUser,
};