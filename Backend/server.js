//auth /ques
const express = require("express");
const cors = require('cors')
const userRoutes = require("./Routes/AuthRouter");
const questionRoutes = require('./Routes/QuestionRouter')

const app = express();
require('dotenv').config()

app.use(express.json());    
app.use(cors())
app.get("/", (req, res) => {
  res.status(200).send("running");
});
app.use('/user', userRoutes)
app.use('/questions', questionRoutes)

app.listen(process.env.PORT || 3030,()=>{
    console.log(`Server is Running on Port : ${process.env.PORT}`);
})


